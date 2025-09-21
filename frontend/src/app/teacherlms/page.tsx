"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type StudentMarks = {
  studentId: string;
  name: string;
  marks: {
    CIA1: number;
    CIA2: number;
    CIA3: number;
    ESE: number;
  };
};

type ClassAllotment = {
  classId: string;
  subject: string;
  students: StudentMarks[];
};

type MentorshipStudent = {
  studentId: string;
  name: string;
  progress: {
    academic: string;
    attendance: string;
    remarks: string;
  };
};

type FacultyProfile = {
  name: string;
  email: string;
  allotedClasses: ClassAllotment[];
  mentorship: MentorshipStudent[];
};

export default function TeacherLMSPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<FacultyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/faculty/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch faculty profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching faculty profile:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">No profile found</div>;
  }

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const updateMarks = async (classId: string, studentId: string, marks: StudentMarks["marks"]) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/faculty/update-marks`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ classId, studentId, marks }),
      });
      alert("Marks updated!");
    } catch (err) {
      console.error("Error updating marks:", err);
    }
  };

  const updateMentorship = async (studentId: string, progress: MentorshipStudent["progress"]) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/faculty/update-mentorship`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ studentId, progress }),
      });
      alert("Mentorship updated!");
    } catch (err) {
      console.error("Error updating mentorship:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {profile.name}</h1>
          <p className="text-sm text-gray-400">{profile.email}</p>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            <NavigationMenuItem>
              <NavigationMenuLink className="cursor-pointer hover:text-red-500" onClick={handleSignOut}>
                Sign Out
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="allotments">
        <TabsList>
          <TabsTrigger value="allotments">Alloted Classes</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
        </TabsList>

        {/* Alloted Classes Tab */}
        <TabsContent value="allotments">
          {profile.allotedClasses.length > 0 ? (
            profile.allotedClasses.map((cls, idx) => (
              <Card key={idx} className="mb-6">
                <CardHeader>
                  <CardTitle>{cls.classId} - {cls.subject}</CardTitle>
                  <CardDescription>Students and their grades</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>CIA 1</TableHead>
                        <TableHead>CIA 2</TableHead>
                        <TableHead>CIA 3</TableHead>
                        <TableHead>ESE</TableHead>
                        <TableHead>Update</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cls.students.map((stu, i) => (
                        <TableRow key={i}>
                          <TableCell>{stu.name}</TableCell>
                          {["CIA1","CIA2","CIA3","ESE"].map((field) => (
                            <TableCell key={field}>
                              <Input
                                type="number"
                                defaultValue={stu.marks[field as keyof StudentMarks["marks"]]}
                                onBlur={(e) =>
                                  updateMarks(cls.classId, stu.studentId, {
                                    ...stu.marks,
                                    [field]: Number(e.target.value),
                                  })
                                }
                                className="w-16 bg-gray-800 text-white"
                              />
                            </TableCell>
                          ))}
                          <TableCell>
                            <Button
                              size="sm"
                              onClick={() => updateMarks(cls.classId, stu.studentId, stu.marks)}
                            >
                              Save
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No class allotments found.</p>
          )}
        </TabsContent>

        {/* Mentorship Tab */}
        <TabsContent value="mentorship">
          {profile.mentorship.length > 0 ? (
            profile.mentorship.map((m, idx) => (
              <Card key={idx} className="mb-6">
                <CardHeader>
                  <CardTitle>{m.name}</CardTitle>
                  <CardDescription>Mentorship Progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <p><strong>Academic:</strong> {m.progress.academic}</p>
                  <p><strong>Attendance:</strong> {m.progress.attendance}</p>
                  <div className="mt-2">
                    <Input
                      placeholder="Update remarks"
                      defaultValue={m.progress.remarks}
                      onBlur={(e) =>
                        updateMentorship(m.studentId, {
                          ...m.progress,
                          remarks: e.target.value,
                        })
                      }
                      className="bg-gray-800 text-white"
                    />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No mentorship records found.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

type Attendance = {
  Course: string;
  TotalClassesPresent: number;
  TotalClassesConducted: number;
  Attendance: string;
};
type Grade = {
  Course: string;
  CIA_1: number;
  MSE: number;
  CIA_3: number;
};
type Profile = {
  name: string;
  registerNumber: string;
  attendanceChartData: { Semester: string; Attendance: number }[];
  currentSemesterAttendance: Attendance[];
  gradesChartData: { Semester: string; CGPA: number }[];
  currentSemesterGrades: Grade[];
};

export default function StudentPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile only if logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return; // skip if not logged in
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading data...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        No profile data found
      </div>
    );
  }

  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("./");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {profile.name}</h1>
          <p className="text-sm text-gray-400">
            Register Number: {profile.registerNumber}
          </p>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6">
            <NavigationMenuItem>
              <NavigationMenuLink
                className="cursor-pointer hover:text-red-500"
                onClick={handleSignOut}
              >
                Sign Out
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="attendance">
        <TabsList>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
        </TabsList>

        {/* Attendance Tab */}
        <TabsContent value="attendance">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Semester-wise attendance percentage</CardDescription>
            </CardHeader>
            <CardContent>
              {profile.attendanceChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={profile.attendanceChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Semester" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="Attendance" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p>No attendance records found.</p>
              )}
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Current Semester Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.currentSemesterAttendance.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Conducted</TableHead>
                      <TableHead>Attendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profile.currentSemesterAttendance.map(
                      (c: Attendance, i: number) => (
                        <TableRow key={i}>
                          <TableCell>{c.Course}</TableCell>
                          <TableCell>{c.TotalClassesPresent}</TableCell>
                          <TableCell>{c.TotalClassesConducted}</TableCell>
                          <TableCell>{c.Attendance}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              ) : (
                <p>No attendance data found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Grades Tab */}
        <TabsContent value="grades">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Grades Overview</CardTitle>
              <CardDescription>Semester-wise CGPA</CardDescription>
            </CardHeader>
            <CardContent>
              {profile.gradesChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={profile.gradesChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Semester" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="CGPA" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p>No grades records found.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Semester Grades</CardTitle>
            </CardHeader>
            <CardContent>
              {profile.currentSemesterGrades.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>CIA 1</TableHead>
                      <TableHead>MSE</TableHead>
                      <TableHead>CIA 3</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profile.currentSemesterGrades.map(
                      (g: Grade, i: number) => (
                        <TableRow key={i}>
                          <TableCell>{g.Course}</TableCell>
                          <TableCell>{g.CIA_1}</TableCell>
                          <TableCell>{g.MSE}</TableCell>
                          <TableCell>{g.CIA_3}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              ) : (
                <p>No grades data found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
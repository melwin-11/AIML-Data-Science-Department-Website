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

export default function StudentPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading student data...
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

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {profile.name}</h1>
      <p className="mb-4">Register Number: {profile.registerNumber}</p>

      {/* Attendance Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
          <CardDescription>
            Semester-wise attendance percentage
          </CardDescription>
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

      {/* Grades Chart */}
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

      {/* Current Semester Attendance Table */}
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
                {profile.currentSemesterAttendance.map((c: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{c.Course}</TableCell>
                    <TableCell>{c.TotalClassesPresent}</TableCell>
                    <TableCell>{c.TotalClassesConducted}</TableCell>
                    <TableCell>{c.Attendance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No attendance data found.</p>
          )}
        </CardContent>
      </Card>

      {/* Current Semester Grades Table */}
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
                {profile.currentSemesterGrades.map((g: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{g.Course}</TableCell>
                    <TableCell>{g.CIA_1}</TableCell>
                    <TableCell>{g.MSE}</TableCell>
                    <TableCell>{g.CIA_3}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No grades data found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

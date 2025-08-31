"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const AttendanceChartData = [
  { Semester: "Sem-1", Attendance: 98.46 },
  { Semester: "Sem-2", Attendance: 96.15 },
  { Semester: "Sem-3", Attendance: 94.72 },
  { Semester: "Sem-4", Attendance: 94.51 },
  { Semester: "Sem-5", Attendance: 91.72 }
];

export const GardesChartData = [
  { Semester: "Sem-1", CGPA: 3.8 },
  { Semester: "Sem-2", CGPA: 3.7 },
  { Semester: "Sem-3", CGPA: 3.75 },
  { Semester: "Sem-4", CGPA: 3.76 }
];

export const CurrentSemesterAttendance = [
  { Course: "Machine Learning", TotalClassesPresent: 44, TotalClassesConducted:46, Attendance: "95.65%" },
  { Course: "Internet & Web Programming", TotalClassesPresent: 44, TotalClassesConducted: 47, Attendance: "93.61%" },
  { Course: "Cloud Computing", TotalClassesPresent: 55, TotalClassesConducted: 57, Attendance: "96.49%" },
  { Course: "Cryptography & Newtork Security", TotalClassesPresent: 24, TotalClassesConducted: 27, Attendance: "88%" },
  { Course: "Design and Analysis of Algorithms", TotalClassesPresent: 28, TotalClassesConducted: 32, Attendance: "87.5%" },
  { Course: "Software Engineering & Project Management", TotalClassesPresent: 18, TotalClassesConducted: 20, Attendance: "90%" }
];

export const CurrentSemesterGrades = [
  { Course: "Machine Learning", CIA_1: 19, MSE:43, CIA_3: "Pending" },
  { Course: "Internet & Web Programming", CIA_1:18, MSE:40, CIA_3: "Pending" },
  { Course: "Cloud Computing", CIA_1: 18, MSE:45, CIA_3: "Pending" },
  { Course: "Cryptography & Newtork Security", CIA_1: 18, MSE:43, CIA_3: "Pending" },
  { Course: "Design and Analysis of Algorithms", CIA_1: 18, MSE:45, CIA_3: "Pending" },
  { Course: "Software Engineering & Project Management", CIA_1: 19, MSE:35, CIA_3: "Pending" }
];

export default function StudentPage() {
  return (
    <div className="p-4">
      <Tabs defaultValue="students">
        <TabsList>
          <TabsTrigger value="students">Attendance</TabsTrigger>
          <TabsTrigger value="performance">Grade</TabsTrigger>
        </TabsList>

        {/* Attendance Tab */}
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Attendance</CardTitle>
              <CardDescription className="text-center">Track your attendance over the course of the semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Line Chart */}
                <div className="flex-1 min-w-[300px]">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={AttendanceChartData}
                      margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Semester" type="category" />
                      <YAxis domain={[90, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="Attendance"
                        stroke="#0A1A2F"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Right: Attendance Table */}
                <div className="flex-1 overflow-x-auto min-w-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Total Classes Present</TableHead>
                        <TableHead>Total Classes Conducted</TableHead>
                        <TableHead>Attendance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {CurrentSemesterAttendance.map((course, index) => (
                        <TableRow key={index}>
                          <TableCell>{course.Course}</TableCell>
                          <TableCell>{course.TotalClassesPresent}</TableCell>
                          <TableCell>{course.TotalClassesConducted}</TableCell>
                          <TableCell>{course.Attendance}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Grade Tab */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Grades</CardTitle>
              <CardDescription className="text-center">Track your grades over the course of the semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left: CGPA Line Chart */}
                <div className="flex-1 min-w-[300px]">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={GardesChartData}
                      margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Semester" type="category" />
                      <YAxis domain={[3, 4]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="CGPA"
                        stroke="#0A1A2F"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Right: Grades Table */}
                <div className="flex-1 overflow-x-auto min-w-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>CIA-1</TableHead>
                        <TableHead>MSE</TableHead>
                        <TableHead>CIA-3</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {CurrentSemesterGrades.map((course, index) => (
                        <TableRow key={index}>
                          <TableCell>{course.Course}</TableCell>
                          <TableCell>{course.CIA_1}</TableCell>
                          <TableCell>{course.MSE}</TableCell>
                          <TableCell>{course.CIA_3}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

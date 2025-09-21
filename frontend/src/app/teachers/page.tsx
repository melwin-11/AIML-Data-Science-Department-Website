"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Faculty {
  name: string;
  specialization: string;
  department: string;
  Cubicle?: string;
  Email?: string;
  img?: string;
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [facultyData, setFacultyData] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch faculty data from API
  useEffect(() => {
    async function fetchFaculty() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/faculty-details`);
        const data = await res.json();
        setFacultyData(data);
      } catch {
        setFacultyData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFaculty();
  }, []);

  // Filtering logic
  const filteredFaculty = searchQuery
    ? facultyData.filter((faculty) =>
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : facultyData;

  return (
    <div className="landing-page">
     {/* Header */}
      <header className="p-4 shadow-md flex items-center bg-[#0A1A2F] text-white">
        

        {/* shadcn Navigation Menu */}
        <NavigationMenu className="ml-8">
          <NavigationMenuList>
            {/* ✅ Home with 4 clickable dropdown boxes */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="px-4 py-2 text-white bg-transparent shadow-none border-none hover:bg-transparent hover:text-gray-300 focus:outline-none"
              >
                <Link href="/">Home</Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[600px] lg:grid-cols-2">
                  <ListItem href="#about" title="About Us">
                    The Department of Artificial Intelligence (AI), Machine Learning
                    (ML) and Data Science (DS) is dedicated to advancing
                    cutting-edge technologies that are shaping the future.
                  </ListItem>
                  <ListItem href="#curriculum" title="Curriculum">
                    M1: Empowering individuals to ethically harness data and AI
                    through accessible and value-driven curriculum.
                    <br />
                    M2: Foster a dynamic research environment that advances
                    innovative and impactful solutions for the betterment of global
                    well-being.
                    <br />
                    M3: Innovate scientific knowledge and Entrepreneurship through
                    academia and Industry collaborations.
                  </ListItem>
                  <ListItem href="#achievements" title="Achievements">
                    Dr. Michael Moses T, faculty member at CHRIST (Deemed to be
                    University), Bangalore Kengeri Campus, has been awarded the
                    Chief Minister’s Commendation in recognition of his exemplary
                    service and unwavering dedication to his work.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Other menu items stay the same */}
            <NavigationMenuItem>
              <Link href="/lab" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2 text-white">Lab</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/teachers" className="px-4 py-2 text-white">
                  Faculty
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/login"
                className="px-4 py-2 text-white"
              >
                Students Login
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/facultylogin"
                className="px-4 py-2 text-white"
              >
                Faculty login
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/projects"
                className="px-4 py-2 text-white"
              >
                Projects
              </NavigationMenuLink>
            </NavigationMenuItem>


            <NavigationMenuItem>
              <NavigationMenuLink
                href="/calender"
                className="px-4 py-2 text-white"
              >
                Calender
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Logo instead of text */}
        <div className="relative w-40 h-16 ml-auto">
          <Image
            src="/CULOGO25_White.png"
            alt="Christ University Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold mb-6">AIML & DS Faculty</h1>
        <div className="w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>AIML & DS Faculty Members</CardTitle>
              <CardDescription>
                Find your respective faculty member
              </CardDescription>
              <Input
                type="text"
                placeholder="Search faculty..."
                className="mt-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Specialization</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFaculty.map((faculty, index) => (
                      <TableRow key={index}>
                        <TableCell>{faculty.name}</TableCell>
                        <TableCell>{faculty.specialization}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button>View Profile</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-2xl">
                              <div className="flex flex-col md:flex-row gap-6">
                                {/* Details on the left */}
                                <div className="flex-1 space-y-2">
                                  <DialogHeader>
                                    <DialogTitle>{faculty.name}</DialogTitle>
                                    <DialogDescription>
                                      Department: {faculty.department}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div>
                                    <p>
                                      <strong>Cubicle Number:</strong>{" "}
                                      {faculty.Cubicle}
                                    </p>
                                    <p>
                                      <strong>Email:</strong>{" "}
                                      {faculty.Email}
                                    </p>
                                    <p>
                                      <strong>Specialization:</strong>{" "}
                                      {faculty.specialization}
                                    </p>
                              
                                  </div>
                                </div>
                                <div className="flex-shrink-0 flex items-center justify-center">
                                  {faculty.img && (
                                    <Image
                                      src={faculty.img}
                                      alt={faculty.name}
                                      width={180}
                                      height={220}
                                      className="rounded-lg object-cover"
                                    />
                                  )}
                                </div>
                              </div>
                              <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                  <Button variant="secondary">Close</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

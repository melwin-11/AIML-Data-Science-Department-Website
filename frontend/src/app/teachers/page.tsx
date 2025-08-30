"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import facultyData from "@/data/faculty.json";  // ✅ Import JSON

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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
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
  return (
    <div className="landing-page">
      {/* Header (unchanged) */}
      <header className="p-4 shadow-md flex items-center bg-[#0A1A2F] text-white">
        <div className="relative w-40 h-16 mr-10">
          <Image
            src="/CULOGO25_White.png"
            alt="Christ University Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <NavigationMenu className="ml-8">
          <NavigationMenuList>
            <NavigationMenuItem>
        <NavigationMenuTrigger
          className="px-4 py-2 text-white bg-transparent shadow-none border-none hover:bg-transparent hover:text-gray-300 focus:outline-none"
        >
          Home
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[600px] lg:grid-cols-2">
            <ListItem href="/about" title="About Us">
              Our department was founded in 2025.
            </ListItem>
            <ListItem href="/curriculum" title="Curriculum">
              The curriculum set for the department.
            </ListItem>
            <ListItem href="/achievements" title="Achievements">
              Explore the department’s achievements and milestones.
            </ListItem>
            <ListItem href="/documents" title="Documents">
              Access important department documents and resources.
            </ListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      {/* Other menu items stay the same */}
      <NavigationMenuItem>
        <Link href="/lab" legacyBehavior passHref>
          <NavigationMenuLink className="px-4 py-2 text-white">
            Lab
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          href="../Me/Faculty/MainFrame/index.html"
          className="px-4 py-2 text-white"
        >
          Faculty
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          href="../Me/Student/MainFrame/index.html"
          className="px-4 py-2 text-white"
        >
          Students
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          href="../Tom/Student's Dashboard/index.html"
          className="px-4 py-2 text-white"
        >
          Attendance
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          href="../Sania/Projects/index.html"
          className="px-4 py-2 text-white"
        >
          Projects
        </NavigationMenuLink>
      </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold mb-6">AI&DS Faculty</h1>

        <div className="w-full max-w-4xl">
          <Table>
            <TableCaption>Faculty Members</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facultyData.map((faculty, index) => (
                <TableRow key={index}>
                  <TableCell>{faculty.name}</TableCell>
                  <TableCell>{faculty.department}</TableCell>
                  <TableCell>{faculty.specialization}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}

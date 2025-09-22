"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// Add ListItem component
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

interface NavigationProps {
  className?: string;
}

export function Navigation({ className = "" }: NavigationProps) {
  return (
    <header className={`sticky top-0 z-50 p-4 shadow-md flex items-center bg-[#0A1A2F] text-white ${className}`}>
      {/* shadcn Navigation Menu */}
      <NavigationMenu className="ml-8">
        <NavigationMenuList>
          {/* Home with dropdown */}
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
                <ListItem href="#service-learning" title="Service Learning">
                  Our students actively engage in community service and social 
                  impact projects, applying their technical skills to solve 
                  real-world problems.
                </ListItem>
                <ListItem href="#achievements" title="Achievements">
                  Dr. Michael Moses T, faculty member at CHRIST (Deemed to be
                  University), Bangalore Kengeri Campus, has been awarded the
                  Chief Minister's Commendation in recognition of his exemplary
                  service and unwavering dedication to his work.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Other menu items */}
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

      {/* Logo */}
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
  );
}

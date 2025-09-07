"use client";
import React, { useEffect, useState } from "react";
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
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

type CalendarEvent = {
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  description: string;
};

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

export default function CalenderPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/aids-events');
        const data = await res.json();
        setEvents(
          data.map((e: CalendarEvent) => ({
            title: e.title,
            start: e.start,
            end: e.end,
            allDay: e.allDay ?? true,
            description: e.description ?? "",
          }))
        );
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="landing-page">
      {/* Header */}
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
                <Link href="/">Home</Link>
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
            <NavigationMenuItem>
              <Link href="/lab" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2 text-white">
                  Lab
                </NavigationMenuLink>
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
                Students
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
      </header>
      <main className="flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold mb-6">Department Events Calender</h1>
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              height="auto"
              events={events}
            />
          )}
        </div>
      </main>
    </div>
  );
}

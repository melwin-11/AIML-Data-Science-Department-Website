"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

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

type Project = {
  _id?: string;
  title: string;
  image: string;
  description: string;
  progress: number;
  contributors: { src: string; fallback: string }[];
};

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from API
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`);
        const data = await res.json();
        setProjects(data);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Filter projects by title: only show matches if searching, else show all
  const filteredProjects = searchQuery
    ? projects.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : projects;

  return (
    <div className="landing-page">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold mb-6">Department Innovation Hub</h1>
        <div className="w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>AIML & DS Department Research/Project Hub</CardTitle>
              <CardDescription>
                Explore a diverse range of projects and research initiatives led by our students and faculty
              </CardDescription>
              <Input
                type="text"
                placeholder="Search for research papers, projects ..."
                className="mt-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </CardHeader>
            <CardContent>
              <h1 className="text-2xl font-bold mb-6 text-center">Projects & Research</h1>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project, idx) => (
                    <Card key={project._id || idx} className="bg-white text-black shadow-md rounded-lg overflow-hidden">
                      <CardHeader className="px-4 pt-4">
                        <CardTitle className="text-lg font-bold">{project.title}</CardTitle>
                      </CardHeader>
                      <div className="w-full h-48 relative">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="px-4 py-4 space-y-4">
                        <CardDescription>
                          {project.description}
                        </CardDescription>
                        <div className="flex items-center justify-between space-x-4">
                          <div className="flex-1">
                            <p className="text-sm font-medium mb-1">Progress</p>
                            <Progress value={project.progress} className="w-full" />
                          </div>
                          <div className="flex flex-col items-center">
                            <p className="text-sm font-medium mb-1">Contributors</p>
                            <div className="flex -space-x-2">
                              {project.contributors && project.contributors.map((contrib, i) => (
                                <Avatar key={i}>
                                  <AvatarImage src={contrib.src} />
                                  <AvatarFallback>{contrib.fallback}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

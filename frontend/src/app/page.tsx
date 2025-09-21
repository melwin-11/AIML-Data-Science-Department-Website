"use client";

import React from "react";
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
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useRef } from "react";

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

export default function LandingPage() {
  const carouselImages = Array.from({ length: 43 }, (_, i) => ({
    url: `/CU_EVENT (${i + 1}).jpg`,
  }));
  const [api, setApi] = React.useState<CarouselApi>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Start autoplay
    intervalRef.current = setInterval(() => {
      if (current === carouselImages.length - 1) {
        api.scrollTo(0);
      } else {
        api.scrollNext();
      }
    }, 5000); // 5 seconds

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api, current, carouselImages.length]);

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

      {/* Hero Section with Carousel */}
      <section className="my-10 flex flex-col items-center">
        <Carousel className="w-full max-w-6xl" setApi={setApi}>
          {/* wider carousel */}
          <CarouselContent>
            {Array.from({ length: 43 }, (_, i) => (
              <CarouselItem
                key={i}
                className="flex justify-center basis-auto" // don’t shrink
              >
                <div className="relative w-[900px] h-[600px] flex justify-center items-center">
                  <Image
                    src={`/CU_EVENT (${i + 1}).jpg`}
                    alt={`CU Event ${i + 1}`}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-4" />
          <CarouselNext className="mr-4" />
        </Carousel>
      </section>

      {/* Vision, Mission, Note, Curriculum, Contact */}
      <main className="px-6 space-y-8 max-w-4xl mx-auto scroll-smooth">
        {/* Message from the HOD */}
        <section className="space-y-4 border-2 border-zinc-950 p-4 rounded-lg bg-white shadow-md">
          <h2 className="text-xl font-bold text-center">
            Message from the HOD
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem>
                    <div className="relative aspect-square">
                      <Image
                        src="/CU_AI&DS_HOD.png"
                        alt="Head of Department"
                        fill

                        className="object-cover rounded-lg"
                        priority
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
            <div className="md:w-2/3">
              <p className="text-gray-700">
                We are at the vanguard of a technological revolution in which
                data-driven solutions and intelligent systems are reshaping every
                industry. At CHRIST (Deemed to be University), the Department of
                AIML & DS is dedicated to fostering the next wave of researchers,
                innovators and moral AI experts who can develop significant
                answers to pressing problems. Academic rigour and experiential
                learning are integrated in our department. Our students participate
                in project-based learning, research, industry collaboration and
                internships as part of a comprehensive curriculum that is tailored
                to stay up with global advancements. We place a strong emphasis on
                holistic education, which promotes societal impact,
                interdisciplinary learning, and critical thinking. We take great
                pride in the lively learning environment we foster, our committed
                faculty and our active student body. As we expand, we want to
                establish ourselves as a centre for innovation and teaching in the
                fields of artificial intelligence, machine learning and data
                science. I encourage you to investigate the opportunities in our
                department and work with us to create a future.
              </p>
            </div>
          </div>
        </section>

        {/* Vision and Mission Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="p-6 bg-white rounded-lg shadow-md border-2 border-zinc-950">
            <h2 className="text-xl font-bold mb-4 text-[#0A1A2F] text-center">
              Vision
            </h2>
            <p className="text-gray-700">
              To excel in human-centred AI and data-driven innovation through
              ethical research, societal well-being, and transformative
              collaborations.
            </p>
          </section>

          <section className="p-6 bg-white rounded-lg shadow-md border-2 border-zinc-950">
            <h2 className="text-xl font-bold mb-4 text-[#0A1A2F] text-center">
              Mission
            </h2>
            <p className="text-gray-700">
              <span className="font-semibold">M1:</span> Empowering individuals to
              ethically harness data and AI through accessible and value-driven
              curriculum.
              <br />
              <br />
              <span className="font-semibold">M2:</span> Foster a dynamic research
              environment that advances innovative and impactful solutions for the
              betterment of global well-being.
              <br />
              <br />
              <span className="font-semibold">M3:</span> Innovate scientific
              knowledge and Entrepreneurship through academia and Industry
              collaborations
            </p>
          </section>
        </div>

        {/* About Us Section */}
        <section
          id="about"
          className="p-6 bg-white rounded-lg shadow-md border-2 border-zinc-950 scroll-mt-24"
        >
          <h2 className="text-xl font-bold mb-4 text-[#0A1A2F] text-center">
            About Us
          </h2>
          <p className="text-gray-700">
            The Department of Artificial Intelligence (AI), Machine Learning (ML)
            and Data Science (DS) is dedicated to advancing cutting-edge
            technologies that are shaping the future.
            <br />
            <br />
            <strong>Key Features:</strong>
            <ol className="list-decimal ml-6 mt-2 space-y-1">
              <li>
                High-performance computing labs with GPUs and access to cloud
                platforms (AWS, Azure, Google Cloud) and data science tools.
              </li>
              <li>
                Best-in-class infrastructure and faculty profile. Industry-aligned
                curriculum covering AI, ML, deep learning, NLP, computer vision,
                and big data analytics with tools like Python, TensorFlow,
                PyTorch, R, and Spark.
              </li>
              <li>
                Active research in areas like explainable AI, generative models,
                ethical AI and data science with faculty-students’ publications
                in reputed journals and conferences.
              </li>
              <li>
                Intense industry-academia interface with leading companies like
                CISCO, REDHAT, Mongo DB, Festo and ORACLE Academy with
                certifications in AIML/DS.
              </li>
              <li>
                Strong placement records with support on resume-building,
                interview prep and career counselling sessions.
              </li>
            </ol>
          </p>
        </section>

        {/* Curriculum Section */}
        <section
          id="curriculum"
          className="p-6 bg-white rounded-lg shadow-md border-2 border-zinc-950 scroll-mt-24"
        >
          <h2 className="text-xl font-bold mb-4 text-[#0A1A2F] text-center">
            Curriculum
          </h2>
          <p className="text-gray-700">
            <strong>M1:</strong> Empowering individuals to ethically harness data
            and AI through accessible and value-driven curriculum.
            <br />
            <br />
            <strong>M2:</strong> Foster a dynamic research environment that
            advances innovative and impactful solutions for the betterment of
            global well-being.
            <br />
            <br />
            <strong>M3:</strong> Innovate scientific knowledge and
            Entrepreneurship through academia and Industry collaborations.
          </p>
        </section>

        {/* Achievements Section */}
        <section
          id="achievements"
          className="p-6 bg-white rounded-lg shadow-md border-2 border-zinc-950 scroll-mt-24"
        >
          <h2 className="text-xl font-bold mb-4 text-[#0A1A2F] text-center">
            Achievements
          </h2>
          <p className="text-gray-700">
            Dr. Michael Moses T, faculty member at CHRIST (Deemed to be
            University), Bangalore Kengeri Campus, has been awarded the Chief
            Minister’s Commendation in recognition of his exemplary service and
            unwavering dedication to his work.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          {/* University Info */}
          <div className="">
            <h2 className="text-xl font-bold">
              CHRIST(DEEMED TO BE UNIVERSITY)
            </h2>
            <p>
              Kanmanike,Kumbalgodu,Mysore Road,Bangalore,Karnatake-560074
            </p>
            <p>Tel: 080 62689800 / 9828 / 9820 / 9800</p>
            <p>Bengaluru, Karnataka 560074</p>
            <p>Fax: +91 806268 9820</p>
            <p>Email: admissions.kengeri@christuniversity.in</p>
          </div>

          {/* Relevant Links */}
          <div className="">
            <h2 className="text-xl font-bold">Relevant Links</h2>
            <div className="space-y-1">
              <a className="block text-blue-600 hover:underline cursor-pointer">
                UBA
              </a>
              <a className="block text-blue-600 hover:underline cursor-pointer">
                FCRA
              </a>
              <a className="block text-blue-600 hover:underline cursor-pointer">
                ALUMNI
              </a>
              <a className="block text-blue-600 hover:underline cursor-pointer">
                IQAC
              </a>
              <a className="block text-blue-600 hover:underline cursor-pointer">
                CAREERS
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 py-4 text-center text-sm ">
          A collaborative creation by Melwin, Sania, Tom, Shawn Luke, and Shawn Joseph.
        </footer>
      </main>
    </div>
  );
}

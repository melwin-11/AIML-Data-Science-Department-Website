"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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

export default function LandingPage() {
  const carouselImages = [
    {
      url: "/MOU_with_Mantis.jpg", 
      alt: "Faculty",
    },
    {
      url: "/Christ_Incubation_Cell_Ceremony.jpg", 
      alt: "Christ University Campus",
    },
        {
      url: "/CU_Chandraksh.jpg", 
      alt: "Christ University Campus",
    },
    {
      url: "/CU_Yes_Submit.jpg", 
      alt: "Christ University Campus",
    },
    {
      url: "/CU_Magnificat_24.jpg", 
      alt: "Christ University Campus",
    },
    {
      url: "/CUK_Sports_Day.jpg", 
      alt: "Christ University Campus",
    },
  ];

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
      <header className="p-4 shadow-md flex justify-between items-center bg-[#0A1A2F] text-white">
        {/* Logo instead of text */}
        <div className="relative w-40 h-16">
          <Image
            src="/CULOGO25_White.png"
            alt="Christ University Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* shadcn Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2 text-white">
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
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

      {/* Hero Section with Carousel */}
      <section className="my-2 flex flex-col items-center gap-6">
        <Carousel className="w-full max-w-8xl">
          <CarouselContent>
            {carouselImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[500px]">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover "
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
      <main className="px-6 space-y-8 max-w-4xl mx-auto">
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

        <section>
          <h2 className="text-xl font-bold">Curriculum</h2>
          <p>
            Explore our comprehensive curriculum designed to equip students with
            the knowledge and skills needed to excel in the fields of Artificial
            Intelligence, Machine Learning, and Data Science.
          </p>
          <a
            href="./Curriculum/index.html"
            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
          >
            View Curriculum
          </a>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          {/* University Info */}
          <div className="">
            <h2 className="text-xl font-bold">CHRIST(DEEMED TO BE UNIVERSITY)</h2>
            <p>Kanmanike,Kumbalgodu,Mysore Road,Bangalore,Karnatake-560074</p>
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
        <footer className="mt-8 py-4 text-center text-sm bg-gray-100">
          Developed by Melwin, Sania, Tom, Shawn Luke, Shawn Joseph
        </footer>
      </main>
    </div>
  );
}

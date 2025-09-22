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
import { CircularGallery } from "@/components/ui/circular-gallery";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
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
      {/* Navigation */}
      <Navigation />

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

      {/* Main Content Sections */}
      <main className="px-6 space-y-8 max-w-5xl mx-auto scroll-smooth">
        
        {/* 1. Message from Dean (first) */}
        <section className="border-2 border-zinc-950 p-6 rounded-lg bg-white shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#0A1A2F]">
            Message from the Dean
          </h2>
          <AnimatedTestimonials
            testimonials={[
              {
                quote: "Welcome to the School of Engineering and Technology (SoET) at CHRIST (Deemed to be University). Established in 2009, SoET is a unique and fastest-growing school that equips students and scholars with the skills and competencies necessary to navigate the complexities of today's dynamic world. The school offers a wide range of programmes approved by the University Grants Commission (UGC) and All India Council for Technical Education (AICTE) and accredited by the National Assessment and Accreditation Council (NAAC) and National Board for Accreditation (NBA) through a blend of project-based and multidisciplinary curricula in emerging technologies including Honors and Minors in AI&ML, Psychology, CIMA, Management, Geomatics, and Architecture. Our graduates stand out as exceptional problem-solvers, adept leaders, and skilled communicators through the holistic education imparted to them by the university.",
                name: "Dean - School of Engineering and Technology",
                designation: "CHRIST (Deemed to be University)",
                image: "/CU_AI&DS_HOD.png"
              }
            ]}
            autoplay={false}
            className="max-w-4xl mx-auto"
          />
        </section>

        {/* 2. Message from HOD (second) */}
        <section className="border-2 border-zinc-950 p-6 rounded-lg bg-white shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#0A1A2F]">
            Message from the HOD
          </h2>
          <AnimatedTestimonials
            testimonials={[
              {
                quote: "We are at the vanguard of a technological revolution in which data-driven solutions and intelligent systems are reshaping every industry. At CHRIST (Deemed to be University), the Department of AIML & DS is dedicated to fostering the next wave of researchers, innovators and moral AI experts who can develop significant answers to pressing problems. Academic rigour and experiential learning are integrated in our department. Our students participate in project-based learning, research, industry collaboration and internships as part of a comprehensive curriculum that is tailored to stay up with global advancements.",
                name: "Dr. Michael Moses T",
                designation: "Head of Department - AIML & DS",
                image: "/CU_AI&DS_HOD.png"
              }
            ]}
            autoplay={false}
            className="max-w-4xl mx-auto"
          />
        </section>

        {/* 3. Vision and Mission */}
        <section className="border-2 border-zinc-950 p-6 rounded-lg bg-white shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#0A1A2F]">
            Vision and Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#0A1A2F] text-center">
                Vision
              </h3>
              <p className="text-gray-700">
                To excel in human-centred AI and data-driven innovation through
                ethical research, societal well-being, and transformative
                collaborations.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-[#0A1A2F] text-center">
                Mission
              </h3>
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
            </div>
          </div>
        </section>

        {/* 4. About Us */}
        <section
          id="about"
          className="border-2 border-zinc-950 p-6 rounded-lg bg-white shadow-md scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-[#0A1A2F]">
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

        {/* 5. Internship Details and Top Companies */}
        <section className="border-2 border-zinc-950 p-6 rounded-lg bg-white shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#0A1A2F]">
            Internship & Career Opportunities
          </h2>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Internship Details */}
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-4 text-[#0A1A2F]">
                Internship Details
              </h3>
              <p className="text-gray-700">
                Our department offers comprehensive internship opportunities that provide students with hands-on experience in cutting-edge AI, Machine Learning, and Data Science technologies. Students have the opportunity to work on real-world projects, collaborate with industry professionals, and gain valuable insights into the latest technological advancements. Internships typically span 6-8 weeks during summer breaks and include mentorship from both faculty and industry experts. Students work on projects ranging from machine learning model development to data analysis and AI system implementation.
              </p>
            </div>

            {/* Top Companies */}
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-4 text-[#0A1A2F]">
                Top Recruiting Companies
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <span className="text-gray-700 font-medium">Microsoft Corporation</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <span className="text-gray-700 font-medium">Google LLC</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <span className="text-gray-700 font-medium">Amazon Web Services</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <span className="text-gray-700 font-medium">IBM Research</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">5</div>
                  <span className="text-gray-700 font-medium">Intel Corporation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Curriculum */}
        <section
          id="curriculum"
          className="border-2 border-zinc-950 p-6 rounded-lg bg-white shadow-md scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-[#0A1A2F]">
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

        {/* 6. Service Learning */}
        <section
          id="service-learning"
          className="border-2 border-zinc-950 p-6 rounded-lg bg-white shadow-md scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-[#0A1A2F]">
            Service Learning
          </h2>
          <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto">
            Our students actively engage in community service and social impact projects, 
            applying their technical skills to solve real-world problems.
          </p>
          
        </section>

        {/* 8. Testimonials */}
        <section
          id="achievements"
          className="border-2 border-zinc-950 p-6 rounded-lg bg-white shadow-md scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-[#0A1A2F]">
            Testimonials
          </h2>
          <div className="mb-6">
            <p className="text-gray-700 text-center">
              Dr. Michael Moses T, faculty member at CHRIST (Deemed to be
              University), Bangalore Kengeri Campus, has been awarded the Chief
              Minister's Commendation in recognition of his exemplary service and
              unwavering dedication to his work.
            </p>
          </div>
          <AnimatedTestimonials
            testimonials={[
              {
                quote: "The AIML department at CHRIST University has provided me with exceptional opportunities to grow both academically and professionally. The faculty's dedication and the cutting-edge curriculum have been instrumental in my success.",
                name: "Dr. Michael Moses T",
                designation: "Faculty Member - Chief Minister's Commendation Awardee",
                image: "/CU_AI&DS_HOD.png"
              },
              {
                quote: "The hands-on approach to learning and the emphasis on practical applications have made this program truly outstanding. I've gained invaluable skills that are directly applicable in the industry.",
                name: "Prof. Sarah Johnson",
                designation: "Industry Partner - Tech Solutions Inc.",
                image: "/CU_AI&DS_HOD.png"
              },
              {
                quote: "The research opportunities and industry collaborations have opened doors I never thought possible. This department truly prepares students for the future of technology.",
                name: "Dr. Rajesh Kumar",
                designation: "Alumni - Senior Data Scientist at Google",
                image: "/CU_AI&DS_HOD.png"
              }
            ]}
            autoplay={true}
            autoplayInterval={6000}
          />
        </section>

      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

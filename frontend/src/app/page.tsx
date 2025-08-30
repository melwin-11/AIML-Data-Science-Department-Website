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
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="p-4 shadow-md flex justify-between items-center bg-white">
        <h1 className="text-2xl font-bold font-[Space Grotesk]">
          AIML &amp; Data Science
        </h1>

        {/* shadcn Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="./index.html">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="../ShawnLuke/Dashboard/index.html">
                Lab
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="../Me/Faculty/MainFrame/index.html">
                Faculty
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="../Me/Student/MainFrame/index.html">
                Students
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="../Tom/Student's Dashboard/index.html">
                Attendance
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="../Sania/Projects/index.html">
                Projects
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      {/* Hero Section with Carousel */}
      <section className="my-6 flex flex-col items-center gap-6">
        <Carousel className="w-full max-w-2xl">
          <CarouselContent>
            <CarouselItem>
              <img
                src="./assets/image.jpg"
                alt="Department"
                className="rounded-2xl shadow-md"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="./assets/image2.jpg"
                alt="Students"
                className="rounded-2xl shadow-md"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="./assets/image3.jpg"
                alt="Faculty"
                className="rounded-2xl shadow-md"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Vision, Mission, Note, Curriculum, Contact */}
      <main className="px-6 space-y-8 max-w-4xl mx-auto">
        <section>
          <h2 className="text-xl font-bold">Vision</h2>
          <p>
            To be a leading department in Artificial Intelligence, Machine
            Learning, and Data Science, fostering innovation and excellence in
            education and research.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Mission</h2>
          <p>
            To provide high-quality education, conduct cutting-edge research,
            and promote collaboration with industry and academia in the fields
            of Artificial Intelligence, Machine Learning, and Data Science.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Note from the Head of Department</h2>
          <p>
            Welcome to the Department of AIML and DS. We are committed to
            nurturing the next generation of innovators and leaders in these
            dynamic fields. Our curriculum is designed to provide a strong
            foundation in theory and practice, preparing students for successful
            careers in academia and industry. We encourage students to engage in
            research, collaborate with faculty, and explore the vast
            opportunities in AI, ML, and DS.
          </p>
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

        <section>
          <h2 className="text-xl font-bold">Contact Us</h2>
          <p>Department of AIML &amp; DS</p>
          <p>CHRIST (Deemed to be University)</p>
          <p>Bengaluru, Karnataka 560074</p>
          <p>Email: aids@christuniversity.in</p>
          <p>Phone: 080 6268 9800</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-8 py-4 text-center text-sm bg-gray-100">
        © AIML&amp;DS
      </footer>
    </div>
  );
}

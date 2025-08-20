import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh]">
        <Link href="/">
          <Image
            src="/CULOGO25_White.png"
            alt="University Campus"
            fill
            className="object-cover cursor-pointer"
            priority
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      <div className="mt-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2 rounded hover:bg-gray-100">
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/faculty" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2 rounded hover:bg-gray-100">
                  Faculty
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/research" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2 rounded hover:bg-gray-100">
                  Research
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2 rounded hover:bg-gray-100">
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </main>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BorderBeam } from "@/components/magicui/border-beam";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);

      router.push("/students");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="sticky top-0 z-50 p-4 shadow-md flex items-center bg-[#0A1A2F] text-white">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold">AIML & DS Department</Link>
        </div>
        <div className="ml-auto">
          <Link href="/" className="px-4 py-2 text-white hover:text-gray-300">Back to Home</Link>
        </div>
      </div>
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-black">
      <div className="flex flex-col items-center w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">
          Login Page
        </h1>
        <p className="text-gray-300 mb-8 text-center">
          Access the AIML & DS department portal
        </p>

        <div className="relative p-[3px] rounded-2xl">
          <BorderBeam
            duration={8}
            size={200}
            className="absolute inset-0 rounded-2xl"
          />

          <Card className="relative z-10">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <p>University Email ID</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Please enter your email"
                  className="w-full px-4 py-2 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p>Password</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Please enter your password"
                  className="w-full px-4 py-2 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {error && (
                  <p className="text-red-500 text-sm mb-2">{error}</p>
                )}
                <Button
                  type="submit"
                  className="w-full bg-neutral-950 text-white font-semibold py-2 px-4 rounded-md"
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-[#0A1A2F] text-white py-4 text-center text-sm">
        <p>A collaborative creation by Melwin, Sania, Tom, Shawn Luke, and Shawn Joseph.</p>
      </footer>
    </div>
  );
}

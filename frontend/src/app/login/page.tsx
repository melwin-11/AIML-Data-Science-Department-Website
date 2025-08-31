"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BorderBeam } from "@/components/magicui/border-beam";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      {/* Centered Login Form */}
      <div className="flex flex-col items-center w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">
          Login Page
        </h1>
        <p className="text-gray-300 mb-8 text-center">
          Access the AIDS department portal 
        </p>

        {/* BorderBeam wrapper around Card */}
        <div className="relative p-[3px] rounded-2xl">
          <BorderBeam duration={8} size={200} className="absolute inset-0 rounded-2xl" />
          
          <Card className="relative z-10">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <p>University Email ID</p>
                <input
                  type="email"
                  placeholder="Please enter your email"
                  className="w-full px-4 py-2 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p>Password</p>
                <input
                  type="password"
                  placeholder="Please enter your password"
                  className="w-full px-4 py-2 mt-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-neutral-950 text-white font-semibold py-2 px-4 rounded-md">
                Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

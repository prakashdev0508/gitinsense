import { ArrowRight, Play, Sparkles, Users } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="">
      <div className="flex min-h-screen items-center overflow-x-hidden">
        {/* Gradient Backgrounds */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 to-gray-100" />
        <div className="bg-grid-black/[0.02] absolute inset-0 -z-10" />

        {/* Gradient Accent */}
        <div className="animate-blob absolute -left-4 top-10 h-72 w-72 rounded-full bg-purple-200 opacity-70 mix-blend-multiply blur-xl filter" />
        <div className="animate-blob animation-delay-2000 absolute -right-4 top-0 h-72 w-72 rounded-full bg-yellow-200 opacity-70 mix-blend-multiply blur-xl filter" />
        <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-pink-200 opacity-70 mix-blend-multiply blur-xl filter" />

        {/* Main Content */}
        <div className="container mx-auto px-4">
          <div className="mt-[-40vh] md:mt-[-30vh]">
            {/* Hero Content */}
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Understand Your{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  GitHub Projects
                </span>
                <br />
                With AI-Powered Insights
              </h1>

              <p className="mx-auto mt-3 max-w-2xl text-xs text-gray-600 md:mt-2 md:text-base">
                Get instant commit summaries, ask questions about your codebase,
                and collaborate seamlessly with your team using{" "}
                <strong className="">AI-powered </strong>
                analysis of your GitHub repositories.
              </p>

              {/* CTA Section */}
              <div className="mt-10 flex flex-col items-center gap-10">
                <div className="flex w-full max-w-md items-center gap-6">
                  <Link href={"/sign-up"}>
                    <Button size="lg" className="">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="lg">
                    <Play className="h-4 w-4" />
                    Watch Demo
                  </Button>
                </div>

                {/* Features List */}
                {/* <div className="flex items-center gap-6 text-sm text-gray-600">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div> */}
              </div>

              {/* Metrics */}
              {/* <div className="mx-auto grid max-w-xl grid-cols-2 gap-8 border-t border-gray-200 pt-12">
                {metrics.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="text-center">
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900">
                      <Icon className="h-6 w-6 text-purple-600" />
                      {value}
                    </div>
                    <div className="text-sm text-gray-600">{label}</div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

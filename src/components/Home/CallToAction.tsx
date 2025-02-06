import { Zap, Lock, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <div className="bg-gradient-to-br from-[#1a073e] to-[#261253] text-white py-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl">
          Transform Your Code Understanding Today
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Join thousands of developers who are already using GitInsight to
          better understand their codebase and collaborate more effectively.
        </p>

        {/* Feature Card */}
        <div className="mt-10 bg-gray-800 rounded-lg shadow-lg divide-x divide-gray-700 flex">
          {/* Quick Setup */}
          <div className="flex-1 p-6 flex flex-col items-center justify-center">
            <div className="bg-purple-600 p-3 rounded-full">
              <Zap className="text-white w-6 h-6" />
            </div>
            <h4 className="text-lg font-semibold mt-4">Quick Setup</h4>
            <p className="text-sm text-gray-400 mt-2">Start in minutes</p>
          </div>
          {/* Secure Access */}
          <div className="flex-1 p-6 flex flex-col items-center justify-center">
            <div className="bg-purple-600 p-3 rounded-full">
              <Lock className="text-white w-6 h-6" />
            </div>
            <h4 className="text-lg font-semibold mt-4">Secure Access</h4>
            <p className="text-sm text-gray-400 mt-2">GitHub integration</p>
          </div>
          {/* Free Trial */}
          <div className="flex-1 p-6 flex flex-col items-center justify-center">
            <div className="bg-green-600 p-3 rounded-full">
              <CheckCircle className="text-white w-6 h-6" />
            </div>
            <h4 className="text-lg font-semibold mt-4">Free Trial</h4>
            <p className="text-sm text-gray-400 mt-2">No credit card</p>
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-4">
          <Link href={"/sign-up"}>
          <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md shadow-lg hover:bg-blue-700 transition flex items-center">
            Get Started Free
            <span className="ml-2">→</span>
          </button>
          </Link>
          <button className="bg-gray-800 text-white font-bold py-3 px-6 rounded-md shadow-lg hover:bg-gray-700 transition flex items-center">
            Schedule Demo
            <span className="ml-2">🎥</span>
          </button>
        </div>
      </div>
    </div>
  );
}

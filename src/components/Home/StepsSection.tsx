import { GitBranch, Clipboard, Users } from "lucide-react";
import Image from "next/image";
import CodeImg from "public/images/code.png"

function StepsSection() {
  const steps = [
    {
      number: "1",
      title: "Connect Repository",
      description: "Paste your GitHub repository URL and connect in seconds.",
      icon: GitBranch,
    },
    {
      number: "2",
      title: "AI Analysis",
      description: "Our AI analyzes commits and generates smart summaries.",
      icon: Clipboard,
    },
    {
      number: "3",
      title: "Collaborate",
      description: "Invite team members and share insights instantly.",
      icon: Users,
    },
  ];

  return (
    <div className="bg-black/90 text-white py-16">
      <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <b className="text-sm font-semibold text-indigo-600 uppercase">
            How It Works
          </b>
          <h2 className="text-3xl font-bold mb-2">
            Simple Steps to Code Understanding
          </h2>
          <p className="text-lg text-gray-600">
            Get started in minutes and unlock the power of AI-driven code
            analysis.
          </p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 text-white rounded-lg shadow-lg">
          <div className="md:flex md:divide-x divide-y divide-gray-700">
            {steps.map((step, index) => (
              <div key={index} className="md:flex-1 p-6 text-center ">
                <div className="text-4xl font-bold text-indigo-500 mb-2">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <div className="flex justify-center items-center mb-4">
                  <step.icon className="w-8 h-8 text-indigo-500" />
                </div>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
          <div className="mt-12">
            <Image alt="Code image" src={CodeImg} />
          </div>
      </div>
    </div>
  );
}

export default StepsSection;

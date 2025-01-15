import { BarChart, Clipboard, ShieldCheck, RefreshCw } from "lucide-react";
import Image from "next/image";
import Code2Img from "public/images/code2.png"

function AICapabilitiesSection() {
  const capabilities = [
    {
      title: "Smart Analysis",
      description:
        "Advanced AI algorithms analyze code changes and provide detailed insights.",
      icon: BarChart,
    },
    {
      title: "Natural Language",
      description:
        "Ask questions in plain English and get detailed, contextual answers.",
      icon: Clipboard,
    },
    {
      title: "Security Analysis",
      description:
        "Automatic detection of security vulnerabilities and best practices.",
      icon: ShieldCheck,
    },
    {
      title: "Real-time Updates",
      description:
        "Continuous analysis and insights as your codebase evolves.",
      icon: RefreshCw,
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-indigo-600 uppercase">
            AI Capabilities
          </p>
          <h2 className="text-3xl font-bold mb-2">Powered by Advanced AI</h2>
          <p className="text-lg text-gray-600">
            Experience the power of AI-driven code analysis and understanding.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
          {/* Left Side: Chat Mockup */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 p-8 md:h-96 shadow-lg  ">
             <Image alt="code 2" src={Code2Img} height={396} />
          </div>

          {/* Right Side: Capabilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-1/2">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200"
              >
                <div className="flex justify-center items-center mb-4">
                  <capability.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{capability.title}</h3>
                <p className="text-gray-600 text-sm">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AICapabilitiesSection;

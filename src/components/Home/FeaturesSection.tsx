import {
  Clipboard,
  MessageCircle,
  Save,
  Users,
  Archive,
  GitBranch,
} from "lucide-react";

function FeaturesSection() {
  // Array of feature data
  const features = [
    {
      title: "Smart Commit Analysis",
      description:
        "Automatically analyze and summarize commit changes with detailed diff explanations.",
      icon: Clipboard,
      color: "bg-blue-700",
    },
    {
      title: "AI-Powered Q&A",
      description:
        "Ask questions about your codebase and get instant, contextual answers.",
      icon: MessageCircle,
      color: "bg-purple-700",
    },
    {
      title: "Save & Organize",
      description:
        "Store and organize important answers and insights for future reference.",
      icon: Save,
      color: "bg-green-700",
    },
    {
      title: "Team Collaboration",
      description: "Invite team members and share project insights seamlessly.",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Project Archive",
      description:
        "Archive and maintain historical project data for future access.",
      icon: Archive,
      color: "bg-yellow-600",
    },
    {
      title: "GitHub Integration",
      description: "Seamlessly connect and analyze any GitHub repository.",
      icon: GitBranch,
      color: "bg-red-600",
    },
  ];

  return (
    <div className="bg-white py-16 text-gray-800">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-20">
        {/* Heading */}
        <h2 className="mb-4 text-center text-3xl font-bold">
          Powerful Features for Better Code Understanding
        </h2>
        <p className="mb-12 text-center text-lg text-gray-600">
          Transform your development workflow with AI-powered insights and
          collaborative features
        </p>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="transform rounded-lg border p-6 text-center shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex justify-center">
                <div className={`${feature.color} rounded-full p-3 text-white`}>
                  <feature.icon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;

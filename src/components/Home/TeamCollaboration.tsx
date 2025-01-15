import { Users, MessageCircle, BookOpen } from "lucide-react";

export default function TeamCollaboration() {
  return (
    <div className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold sm:text-4xl">
          Seamless Team Collaboration
        </h2>
        <p className="mt-4 text-center text-lg text-gray-400">
          Share insights, discuss code changes, and build knowledge together
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Chat Section */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  JD
                </div>
                <div className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  AS
                </div>
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  MK
                </div>
                <div className="text-gray-400 font-semibold">+2</div>
              </div>
              <button className="bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-md hover:bg-blue-700 transition">
                Invite
              </button>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center space-x-2">
                  <div className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    AS
                  </div>
                  <p className="text-gray-400 text-sm">2 hours ago</p>
                </div>
                <p className="mt-2 bg-gray-700 text-white p-3 rounded-lg">
                  Can someone explain the recent authentication changes?
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                    JD
                  </div>
                  <p className="text-gray-400 text-sm">1 hour ago</p>
                </div>
                <p className="mt-2 bg-gray-700 text-white p-3 rounded-lg">
                  We implemented JWT token rotation and rate limiting. Check
                  the saved answer in <span className="text-blue-400">#security-updates</span>.
                </p>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="flex items-center justify-center w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition">
                + New Thread
              </button>
              <button className="flex items-center justify-center w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition">
                💾 Save Answer
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-4">
                <div className="bg-purple-600 text-white rounded-full p-2">
                  <Users className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-semibold">Team Management</h4>
              </div>
              <p className="mt-2 text-gray-400">
                Invite team members, manage access levels, and collaborate
                seamlessly on project insights.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-4">
                <div className="bg-purple-600 text-white rounded-full p-2">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-semibold">Real-time Discussions</h4>
              </div>
              <p className="mt-2 text-gray-400">
                Start threads, discuss code changes, and get instant
                notifications about team activities.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-600 text-white rounded-full p-2">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-semibold">Knowledge Base</h4>
              </div>
              <p className="mt-2 text-gray-400">
                Save important answers and insights to build a searchable
                knowledge base for your team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

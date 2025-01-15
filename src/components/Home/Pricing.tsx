// components/Pricing.js
export default function Pricing() {
    return (
      <div className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            Simple, transparent pricing that grows with your needs
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900">Free</h3>
              <p className="mt-4 text-4xl font-bold text-gray-900">$0</p>
              <p className="text-sm text-gray-500">/month</p>
              <ul className="mt-6 space-y-4 text-gray-600">
                <li>✔ Up to 3 repositories</li>
                <li>✔ Basic commit analysis</li>
                <li>✔ 5 AI queries per day</li>
              </ul>
              <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Start Free
              </button>
            </div>
  
            {/* Pro Plan */}
            <div className="bg-white border-2 border-blue-600 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 p-6 text-center relative">
              <span className="absolute top-[-12px] right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-lg">
                POPULAR
              </span>
              <h3 className="text-lg font-semibold text-gray-900">Pro</h3>
              <p className="mt-4 text-4xl font-bold text-gray-900">$29</p>
              <p className="text-sm text-gray-500">/month</p>
              <ul className="mt-6 space-y-4 text-gray-600">
                <li>✔ Unlimited repositories</li>
                <li>✔ Advanced commit analysis</li>
                <li>✔ Unlimited AI queries</li>
                <li>✔ Team collaboration</li>
                <li>✔ Priority support</li>
              </ul>
              <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Get Started
              </button>
            </div>
  
            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 p-6 text-center ">
              <h3 className="text-lg font-semibold text-gray-900">Enterprise</h3>
              <p className="mt-4 text-4xl font-bold text-gray-900">Custom</p>
              <p className="text-sm text-gray-500">Pricing</p>
              <ul className="mt-6 space-y-4 text-gray-600">
                <li>✔ Everything in Pro</li>
                <li>✔ Custom integrations</li>
                <li>✔ Dedicated support</li>
                <li>✔ SLA guarantees</li>
              </ul>
              <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
import Link from 'next/link';

export default function ResponsiveTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            📱 Responsive Design Test
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Testing responsiveness across all screen sizes - Mobile, Tablet, and Desktop
          </p>
        </div>

        {/* Responsive Grid Test */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Grid System Test
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Product {i + 1}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
                  This is a test product description that demonstrates text truncation and responsive design.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">$99.99</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responsive Text Test */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Typography Test
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Main Heading - Responsive Typography
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
              Subheading with proper scaling
            </h2>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-700 mb-3">
              Section heading that adapts to screen size
            </h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              This is a paragraph with responsive text sizing. The text will scale appropriately 
              across different screen sizes, ensuring optimal readability on mobile devices, 
              tablets, and desktop computers. The line height and spacing also adjust to 
              provide the best reading experience.
            </p>
          </div>
        </div>

        {/* Responsive Button Test */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Button Test
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-700 transition-colors">
              Primary Button
            </button>
            <button className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-600 hover:text-white transition-colors">
              Secondary Button
            </button>
            <button className="w-full sm:w-auto bg-gray-200 text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-300 transition-colors">
              Tertiary Button
            </button>
          </div>
        </div>

        {/* Responsive Form Test */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Form Test
          </h2>
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter last name"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your message"
                />
              </div>
              <div className="sm:col-span-2">
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Submit Form
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Navigation Test */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Navigation Test
          </h2>
          <nav className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
                Logo
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Products</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
              </div>
            </div>
          </nav>
        </div>

        {/* Responsive Card Test */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Card Layout Test
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-4xl text-white">🎨</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Feature Card 1</h3>
                <p className="text-gray-600 mb-4">
                  This card demonstrates responsive design with proper spacing and typography scaling.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <span className="text-4xl text-white">⚡</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Feature Card 2</h3>
                <p className="text-gray-600 mb-4">
                  Responsive cards that adapt to different screen sizes and maintain proper proportions.
                </p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <span className="text-4xl text-white">🚀</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Feature Card 3</h3>
                <p className="text-gray-600 mb-4">
                  This card spans differently on various screen sizes to demonstrate responsive grid behavior.
                </p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            href="/"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 
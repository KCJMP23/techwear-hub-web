

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-apple-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              Privacy Policy
            </h1>
            <p className="text-xl mb-8 text-white/90 animate-fade-in-up animation-delay-200">
              How we collect, use, and protect your information
            </p>
            <p className="text-sm text-white/70 animate-fade-in-up animation-delay-400">
              Last updated: January 15, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-12">
              <div className="animate-fade-in-up">
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  Introduction
                </h2>
                <p className="text-apple-gray-600 mb-4">
                  At Affiliate Template, we respect your privacy and are committed to protecting your personal data. 
                  This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
                </p>
                <p className="text-apple-gray-600">
                  By using our website, you consent to the data practices described in this policy.
                </p>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-apple-gray-900 mb-3">Personal Information</h3>
                    <p className="text-apple-gray-600 mb-2">
                      We may collect personal information that you voluntarily provide to us, including:
                    </p>
                    <ul className="list-disc list-inside text-apple-gray-600 space-y-1 ml-4">
                      <li>Name and email address when you subscribe to our newsletter</li>
                      <li>Contact information when you reach out to us</li>
                      <li>Comments and feedback you provide on our website</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-apple-gray-900 mb-3">Automatically Collected Information</h3>
                    <p className="text-apple-gray-600 mb-2">
                      When you visit our website, we automatically collect certain information, including:
                    </p>
                    <ul className="list-disc list-inside text-apple-gray-600 space-y-1 ml-4">
                      <li>IP address and browser type</li>
                      <li>Pages visited and time spent on each page</li>
                      <li>Referring website and search terms</li>
                      <li>Device information and operating system</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  How We Use Your Information
                </h2>
                <p className="text-apple-gray-600 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-apple-gray-600 space-y-2 ml-4">
                  <li>Provide and maintain our website services</li>
                  <li>Send you newsletters and updates (with your consent)</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Analyze website usage and improve our content</li>
                  <li>Detect and prevent fraud or abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  Cookies and Tracking Technologies
                </h2>
                <p className="text-apple-gray-600 mb-4">
                  We use cookies and similar tracking technologies to enhance your browsing experience. 
                  These technologies help us:
                </p>
                <ul className="list-disc list-inside text-apple-gray-600 space-y-2 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Improve website performance and security</li>
                </ul>
                <p className="text-apple-gray-600 mt-4">
                  You can control cookie settings through your browser preferences, though disabling 
                  certain cookies may affect website functionality.
                </p>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  Third-Party Services
                </h2>
                <p className="text-apple-gray-600 mb-4">
                  We may use third-party services that collect, monitor, and analyze data, including:
                </p>
                <ul className="list-disc list-inside text-apple-gray-600 space-y-2 ml-4">
                  <li>Google Analytics for website analytics</li>
                  <li>Affiliate networks for product recommendations</li>
                  <li>Email marketing services for newsletters</li>
                  <li>Social media platforms for sharing content</li>
                </ul>
                <p className="text-apple-gray-600 mt-4">
                  These third-party services have their own privacy policies, and we encourage you 
                  to review them.
                </p>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  Data Security
                </h2>
                <p className="text-apple-gray-600 mb-4">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside text-apple-gray-600 space-y-2 ml-4">
                  <li>SSL encryption for data transmission</li>
                  <li>Regular security assessments and updates</li>
                  <li>Limited access to personal data on a need-to-know basis</li>
                  <li>Secure data storage and backup procedures</li>
                </ul>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '1200ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  Your Rights
                </h2>
                <p className="text-apple-gray-600 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-apple-gray-600 space-y-2 ml-4">
                  <li>Access and review your personal information</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Lodge a complaint with supervisory authorities</li>
                </ul>
                <p className="text-apple-gray-600 mt-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '1400ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  Children&apos;s Privacy
                </h2>
                <p className="text-apple-gray-600">
                  Our website is not intended for children under 13 years of age. We do not knowingly 
                  collect personal information from children under 13. If you are a parent or guardian 
                  and believe your child has provided us with personal information, please contact us 
                  immediately.
                </p>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '1600ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  Changes to This Policy
                </h2>
                <p className="text-apple-gray-600">
                  We may update this privacy policy from time to time. We will notify you of any changes 
                  by posting the new policy on this page and updating the &quot;Last updated&quot; date. 
                  We encourage you to review this policy periodically.
                </p>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '1800ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  Contact Us
                </h2>
                <p className="text-apple-gray-600 mb-4">
                  If you have any questions about this privacy policy or our data practices, please contact us:
                </p>
                <div className="bg-apple-gray-50 p-6 rounded-2xl">
                  <p className="text-apple-gray-600 mb-2">
                    <strong>Email:</strong> privacy@affiliate-template.com
                  </p>
                  <p className="text-apple-gray-600 mb-2">
                    <strong>Address:</strong> 123 Tech Street, San Francisco, CA 94102
                  </p>
                  <p className="text-apple-gray-600">
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
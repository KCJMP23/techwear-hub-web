

export default function DisclosurePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-apple-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              Affiliate Disclosure
            </h1>
            <p className="text-xl mb-8 text-white/90 animate-fade-in-up animation-delay-200">
              Transparency about our affiliate relationships and how we earn commissions
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
                  What is Affiliate Marketing?
                </h2>
                <p className="text-apple-gray-600 mb-4">
                  Affiliate marketing is a performance-based marketing strategy where we earn commissions 
                  by promoting products and services from other companies. When you click on our affiliate 
                  links and make a purchase, we may receive a small commission at no additional cost to you.
                </p>
                <p className="text-apple-gray-600">
                  This helps us keep our website running and continue providing free, valuable content to our readers.
                </p>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  Our Affiliate Partners
                </h2>
                <p className="text-apple-gray-600 mb-4">
                  We participate in various affiliate programs, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-apple-gray-600 space-y-2 ml-4">
                  <li>Amazon Associates Program</li>
                  <li>Commission Junction (CJ Affiliate)</li>
                  <li>ShareASale</li>
                  <li>ClickBank</li>
                  <li>Direct partnerships with product manufacturers</li>
                </ul>
                <p className="text-apple-gray-600 mt-4">
                  These programs allow us to earn commissions when you make purchases through our links.
                </p>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  Our Commitment to Honesty
                </h2>
                <p className="text-apple-gray-600 mb-4">
                  We believe in complete transparency and honesty in our affiliate relationships. Here&apos;s our commitment to you:
                </p>
                <ul className="list-disc list-inside text-apple-gray-600 space-y-2 ml-4">
                  <li>We only recommend products we genuinely believe in and would use ourselves</li>
                  <li>Our reviews are honest and unbiased, regardless of commission rates</li>
                  <li>We clearly disclose affiliate relationships when applicable</li>
                  <li>We never let affiliate commissions influence our recommendations</li>
                  <li>We always prioritize your best interests over earning commissions</li>
                </ul>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  How We Test Products
                </h2>
                <p className="text-apple-gray-600 mb-4">
                  To ensure our recommendations are trustworthy, we follow a rigorous testing process:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-apple-gray-50 p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-apple-gray-900 mb-3">Personal Testing</h3>
                    <p className="text-apple-gray-600">
                      We purchase and test products with our own funds whenever possible to provide 
                      authentic, hands-on reviews.
                    </p>
                  </div>
                  <div className="bg-apple-gray-50 p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-apple-gray-900 mb-3">Research & Analysis</h3>
                    <p className="text-apple-gray-600">
                      We thoroughly research products, read user reviews, and analyze specifications 
                      to provide comprehensive recommendations.
                    </p>
                  </div>
                  <div className="bg-apple-gray-50 p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-apple-gray-900 mb-3">Expert Consultation</h3>
                    <p className="text-apple-gray-600">
                      We consult with industry experts and professionals to ensure our recommendations 
                      are accurate and up-to-date.
                    </p>
                  </div>
                  <div className="bg-apple-gray-50 p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-apple-gray-900 mb-3">Ongoing Monitoring</h3>
                    <p className="text-apple-gray-600">
                      We continuously monitor product performance and user feedback to keep our 
                      recommendations current and relevant.
                    </p>
                  </div>
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  Commission Disclosure
                </h2>
                <p className="text-apple-gray-600 mb-4">
                  Commission rates vary by affiliate program and product category:
                </p>
                <ul className="list-disc list-inside text-apple-gray-600 space-y-2 ml-4">
                  <li>Amazon Associates: 1-10% depending on product category</li>
                  <li>Electronics and tech products: 1-4%</li>
                  <li>Home and garden products: 4-8%</li>
                  <li>Digital products and courses: 10-50%</li>
                  <li>Direct partnerships: Varies by agreement</li>
                </ul>
                <p className="text-apple-gray-600 mt-4">
                  These commissions help support our website and allow us to continue providing free content.
                </p>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  Your Privacy and Data
                </h2>
                <p className="text-apple-gray-600 mb-4">
                  When you click on affiliate links, certain information may be shared with our affiliate partners:
                </p>
                <ul className="list-disc list-inside text-apple-gray-600 space-y-2 ml-4">
                  <li>Your IP address and browser information</li>
                  <li>Pages you visit on the merchant&apos;s website</li>
                  <li>Purchase information (for commission tracking)</li>
                  <li>Referral source (our website)</li>
                </ul>
                <p className="text-apple-gray-600 mt-4">
                  We do not have access to your personal information or purchase details. 
                  This data is handled by the affiliate networks and merchants according to their privacy policies.
                </p>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '1200ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  FTC Compliance
                </h2>
                <p className="text-apple-gray-600 mb-4">
                  We comply with Federal Trade Commission (FTC) guidelines for affiliate marketing:
                </p>
                <ul className="list-disc list-inside text-apple-gray-600 space-y-2 ml-4">
                  <li>Clear disclosure of affiliate relationships</li>
                  <li>Honest and unbiased product reviews</li>
                  <li>No misleading claims about products</li>
                  <li>Transparent about potential earnings</li>
                  <li>Easy-to-find disclosure information</li>
                </ul>
                <p className="text-apple-gray-600 mt-4">
                  We believe in building trust with our readers through complete transparency.
                </p>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '1400ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  Questions About Affiliate Links?
                </h2>
                <p className="text-apple-gray-600 mb-4">
                  We understand you may have questions about our affiliate relationships. Here are some common questions:
                </p>
                <div className="space-y-4">
                  <div className="bg-apple-gray-50 p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">
                      Do affiliate links cost me more?
                    </h3>
                    <p className="text-apple-gray-600">
                      No, affiliate links do not increase the price you pay. The commission comes from the merchant&apos;s 
                      marketing budget, not your purchase.
                    </p>
                  </div>
                  <div className="bg-apple-gray-50 p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">
                      How do I know if a link is affiliate?
                    </h3>
                    <p className="text-apple-gray-600">
                      We clearly label affiliate links and provide this disclosure page. When in doubt, 
                      assume links to products are affiliate links.
                    </p>
                  </div>
                  <div className="bg-apple-gray-50 p-6 rounded-2xl">
                    <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">
                      Can I still trust your recommendations?
                    </h3>
                    <p className="text-apple-gray-600">
                      Absolutely. Our recommendations are based on honest testing and research, 
                      not commission rates. We only recommend products we genuinely believe in.
                    </p>
                  </div>
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '1600ms' }}>
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-6">
                  Contact Us
                </h2>
                <p className="text-apple-gray-600 mb-4">
                  If you have any questions about our affiliate relationships or this disclosure, please contact us:
                </p>
                <div className="bg-apple-gray-50 p-6 rounded-2xl">
                  <p className="text-apple-gray-600 mb-2">
                    <strong>Email:</strong> affiliate@affiliate-template.com
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
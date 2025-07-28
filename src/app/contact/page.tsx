

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-apple-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              Get in Touch
            </h1>
            <p className="text-xl mb-8 text-white/90 animate-fade-in-up animation-delay-200">
              Have a question or suggestion? We&apos;d love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="animate-fade-in-left">
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-8">
                  Send us a Message
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-apple-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:ring-4 focus:ring-apple-blue/20 focus:border-apple-blue transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-apple-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:ring-4 focus:ring-apple-blue/20 focus:border-apple-blue transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-apple-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:ring-4 focus:ring-apple-blue/20 focus:border-apple-blue transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-apple-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:ring-4 focus:ring-apple-blue/20 focus:border-apple-blue transition-all duration-300"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="product-review">Product Review Request</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="feedback">Feedback</option>
                      <option value="technical">Technical Support</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-apple-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:ring-4 focus:ring-apple-blue/20 focus:border-apple-blue transition-all duration-300 resize-none"
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full btn btn-primary text-lg px-8 py-4 rounded-2xl shadow-apple-xl hover:shadow-apple-2xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              
              {/* Contact Information */}
              <div className="animate-fade-in-right">
                <h2 className="text-3xl font-bold text-apple-gray-900 mb-8">
                  Contact Information
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-apple-blue/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Email</h3>
                      <p className="text-apple-gray-600 mb-1">hello@affiliate-template.com</p>
                      <p className="text-apple-gray-600">support@affiliate-template.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-apple-green/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-apple-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Address</h3>
                      <p className="text-apple-gray-600">
                        123 Tech Street<br />
                        San Francisco, CA 94102<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-apple-purple/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-apple-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Business Hours</h3>
                      <p className="text-apple-gray-600 mb-1">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                      <p className="text-apple-gray-600">Saturday: 10:00 AM - 4:00 PM PST</p>
                      <p className="text-apple-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold text-apple-gray-900 mb-6">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="w-12 h-12 bg-apple-gray-100 rounded-2xl flex items-center justify-center hover:bg-apple-blue hover:text-white transition-all duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-12 h-12 bg-apple-gray-100 rounded-2xl flex items-center justify-center hover:bg-apple-blue hover:text-white transition-all duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-12 h-12 bg-apple-gray-100 rounded-2xl flex items-center justify-center hover:bg-apple-blue hover:text-white transition-all duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-apple-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-apple-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-apple-gray-600">
                Quick answers to common questions
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-apple-gray-900 mb-3">
                  How do you test products?
                </h3>
                <p className="text-apple-gray-600">
                  We purchase products with our own funds and test them in real-world conditions. 
                  Our reviews are based on hands-on experience, not just specifications.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-apple-gray-900 mb-3">
                  Do you accept product submissions?
                </h3>
                <p className="text-apple-gray-600">
                  Yes! We welcome product submissions from manufacturers and PR agencies. 
                  Please contact us with details about your product.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-apple-gray-900 mb-3">
                  How can I suggest a product for review?
                </h3>
                <p className="text-apple-gray-600">
                  Send us an email with the product name and why you think it would be 
                  interesting to our readers. We consider all suggestions!
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-apple-gray-900 mb-3">
                  Are your affiliate links disclosed?
                </h3>
                <p className="text-apple-gray-600">
                  Absolutely! We always disclose affiliate relationships and only recommend 
                  products we genuinely believe in, regardless of commission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
import Image from 'next/image';

export default function AboutPage() {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Expert in consumer electronics with 10+ years of experience in product testing and review.",
      image: "/placeholder-product-1.jpg"
    },
    {
      name: "Mike Chen",
      role: "Head of Technology",
      bio: "Former engineer at major tech companies, specializing in smart home and IoT devices.",
      image: "/placeholder-product-2.jpg"
    },
    {
      name: "Emma Davis",
      role: "Lead Product Reviewer",
      bio: "Professional photographer and tech enthusiast with a passion for finding the best products.",
      image: "/placeholder-product-3.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-apple-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              About Us
            </h1>
            <p className="text-xl mb-8 text-white/90 animate-fade-in-up animation-delay-200">
              We&apos;re passionate about helping you find the perfect products through honest, thorough reviews
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-left">
                <h2 className="text-4xl font-bold text-apple-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-apple-gray-600 mb-6">
                  We believe that everyone deserves access to honest, comprehensive product reviews. 
                  In a world filled with marketing hype and paid promotions, we cut through the noise 
                  to give you the real story.
                </p>
                <p className="text-lg text-apple-gray-600 mb-6">
                  Our team of experts spends countless hours testing products, comparing features, 
                  and analyzing value to bring you recommendations you can trust.
                </p>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-apple-blue mb-2">500+</div>
                    <div className="text-apple-gray-600">Products Reviewed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-apple-blue mb-2">50K+</div>
                    <div className="text-apple-gray-600">Happy Readers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-apple-blue mb-2">5+</div>
                    <div className="text-apple-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>
              <div className="animate-fade-in-right">
                <div className="relative">
                  <Image
                    src="/placeholder-product-1.jpg"
                    alt="Our Mission"
                    width={500}
                    height={400}
                    className="rounded-2xl shadow-apple-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-apple-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-apple-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-apple-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center animate-fade-in-up">
              <div className="w-16 h-16 bg-apple-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-apple-gray-900 mb-4">Honesty</h3>
              <p className="text-apple-gray-600">
                We never compromise on truth. Every review is based on real testing and honest assessment.
              </p>
            </div>
            
            <div className="card p-8 text-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-apple-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-apple-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-apple-gray-900 mb-4">Excellence</h3>
              <p className="text-apple-gray-600">
                We strive for excellence in everything we do, from our testing methods to our writing.
              </p>
            </div>
            
            <div className="card p-8 text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="w-16 h-16 bg-apple-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-apple-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-apple-gray-900 mb-4">Community</h3>
              <p className="text-apple-gray-600">
                We build community by sharing knowledge and helping others make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-apple-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-apple-gray-600 max-w-2xl mx-auto">
              The experts behind our reviews and recommendations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={member.name}
                className="card p-8 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-apple-gray-900 mb-2">{member.name}</h3>
                <p className="text-apple-blue font-medium mb-4">{member.role}</p>
                <p className="text-apple-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-apple text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Find Your Perfect Product?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Start exploring our comprehensive reviews and recommendations today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/products" className="btn btn-primary text-lg px-8 py-4 rounded-2xl">
                Browse Products
              </a>
              <a href="/blog" className="btn btn-ghost text-lg px-8 py-4 rounded-2xl border-2 border-white/30">
                Read Reviews
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
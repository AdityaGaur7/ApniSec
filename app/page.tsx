import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight animate-fade-in">
                Secure Your <span className="text-primary">Digital Future</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto animate-slide-up">
                Advanced cybersecurity solutions tailored for modern enterprises.
                Identify vulnerabilities before they become threats.
              </p>
              <div className="flex justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Link href="/register" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25">
                  Get Started
                </Link>
                <Link href="/#features" className="bg-surface border border-white/10 text-white px-8 py-3 rounded-lg font-medium hover:bg-surface-hover transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Our Services</h2>
              <p className="text-gray-400">Comprehensive security assessments for every layer of your infrastructure.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Cloud Security',
                  description: 'Secure your cloud infrastructure with deep configuration analysis and compliance checks.',
                  icon: '☁️',
                },
                {
                  title: 'VAPT',
                  description: 'Vulnerability Assessment and Penetration Testing to find and fix security holes.',
                  icon: '🛡️',
                },
                {
                  title: 'Red Teaming',
                  description: 'Simulate real-world attacks to test your organization\'s detection and response capabilities.',
                  icon: '🚩',
                },
              ].map((feature, index) => (
                <div key={index} className="bg-surface p-8 rounded-xl border border-white/5 hover:border-primary/50 transition-colors group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

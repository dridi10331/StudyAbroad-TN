import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 glass sticky top-0 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black gradient-text">
            StudyAbroad TN
          </Link>
          <div className="flex gap-3">
            <Link href="/login" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition">
              Sign In
            </Link>
            <Link href="/register" className="btn btn-primary text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 md:w-96 md:h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 animate-slide-up">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 text-slate-900">
              Study Abroad with
              <span className="gradient-text block">Confidence</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-slate-600 mb-6 leading-relaxed max-w-2xl">
              Get complete guides for Campus France, Italian & German universities. Master French, English & Arabic to C1 level with AI tutoring.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/register" className="btn btn-primary px-6 py-3 text-sm md:text-base">
                Start Free Trial
              </Link>
              <Link href="#features" className="btn btn-secondary px-6 py-3 text-sm md:text-base">
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: "500+", label: "Students Enrolled" },
              { number: "3", label: "Languages" },
              { number: "15+", label: "Countries" },
              { number: "24/7", label: "AI Support" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black mb-2">{stat.number}</div>
                <div className="text-blue-300 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 text-slate-900">
              Everything You Need
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive tools designed to make your study abroad journey seamless.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📚",
                title: "Study Guides",
                description: "Step-by-step guides for Campus France, Italian & German universities"
              },
              {
                icon: "🤖",
                title: "AI Tutor",
                description: "Practice French, English & Arabic with personalized AI exercises"
              },
              {
                icon: "📈",
                title: "Progress Tracking",
                description: "Monitor your language level and applications in real-time"
              },
              {
                icon: "📝",
                title: "Templates",
                description: "Pre-made CV, motivation letters & application documents"
              },
              {
                icon: "👥",
                title: "Community",
                description: "Connect with other students & share experiences"
              },
              {
                icon: "🎓",
                title: "Scholarships",
                description: "Discover funding opportunities and winning strategies"
              }
            ].map((feature, i) => (
              <div key={i} className="card group hover:shadow-2xl">
                <div className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm md:text-base text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-2 text-slate-900">
              Simple Pricing
            </h2>
            <p className="text-base md:text-lg text-slate-600">Choose your learning path</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="card">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Basic</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-black text-slate-900">29</span>
                  <span className="text-sm md:text-base text-slate-600">TND/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {["Basic study guides", "AI tutor (100/month)", "1 language", "Community"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-700 text-sm md:text-base">
                    <span className="text-lg">✓</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className="btn btn-secondary w-full justify-center text-sm md:text-base">
                Get Started
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="card premium relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="badge premium text-xs md:text-sm">MOST POPULAR</span>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Premium</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-black text-slate-900">59</span>
                  <span className="text-sm md:text-base text-slate-600">TND/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {["All premium guides", "Unlimited AI tutor", "3 languages", "Priority support", "Templates", "Exclusive updates"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-700 text-sm md:text-base">
                    <span className="text-lg">✓</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className="btn btn-primary w-full justify-center text-sm md:text-base">
                Start Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg py-16 md:py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            Ready to Study Abroad?
          </h2>
          <p className="text-base md:text-lg mb-6 text-blue-100 max-w-2xl mx-auto">
            Join hundreds of Tunisian students who achieved their dreams. Start your journey today.
          </p>
          <Link href="/register" className="btn bg-white text-blue-600 hover:bg-slate-100 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold inline-block">
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 md:gap-8 mb-8">
            <div>
              <h4 className="text-white font-black text-lg mb-3">StudyAbroad TN</h4>
              <p className="text-sm">Your complete guide to studying abroad with AI tutoring.</p>
            </div>
            <div>
              <h5 className="text-white font-bold text-base mb-3">Resources</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white transition">Guides</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold text-base mb-3">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition">Terms</Link></li>
                <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold text-base mb-3">Follow Us</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">Twitter</Link></li>
                <li><Link href="#" className="hover:text-white transition">LinkedIn</Link></li>
                <li><Link href="#" className="hover:text-white transition">Instagram</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8">
            <p className="text-center text-xs md:text-sm">
              © 2026 StudyAbroad TN. Built with ❤️ for Tunisian students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

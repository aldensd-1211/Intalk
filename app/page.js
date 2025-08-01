"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      {/* NAVBAR */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-teal-600">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={200}
              height={100}
              className="w-[120px]"
            />
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex space-x-6 text-sm text-gray-700">
            <Link href="#features" className="hover:text-teal-600">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-teal-600">
              How It Works
            </Link>
            <Link href="/billing" className="hover:text-teal-600">
              Pricing
            </Link>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center space-x-3">
            <Link href="/auth">
              <button className="text-sm font-medium text-gray-700 hover:text-teal-600">
                Login
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Dashboard
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="px-6 py-24 bg-teal-50 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Smarter Hiring with an{" "}
          <span className="text-teal-600">AI Interview Assistant</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Automate your candidate screening with voice-based interviews. Focus
          on selecting top talent while we handle the rest.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/dashboard/create-interview">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md text-sm font-medium">
              Create Interview →
            </button>
          </Link>
          <button className="border border-gray-300 px-5 py-2 rounded-md text-sm font-medium">
            Watch Demo
          </button>
        </div>

        {/* Screenshot */}
        <div className="mt-12 flex justify-center">
          <Image
            src="/dashboard-mockup.png"
            alt="Dashboard Screenshot"
            width={800}
            height={500}
            className="rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="px-6 py-20 text-center bg-white">
        <h2 className="text-3xl font-semibold mb-4">
          How Intalk Simplifies Hiring
        </h2>
        <p className="text-gray-600 mb-12">
          Streamline your hiring in just three easy steps.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-12">
          {[
            {
              title: "Create Interview",
              description:
                "Define job roles and tailor AI-led interview questions effortlessly.",
            },
            {
              title: "Share with Candidates",
              description:
                "Send a link – they complete interviews anytime, anywhere.",
            },
            {
              title: "Review Results",
              description:
                "Access AI-evaluated transcripts and rank candidates instantly.",
            },
          ].map((step, index) => (
            <div key={index} className="flex-1 max-w-sm mx-auto">
              <div className="text-4xl font-bold text-teal-600 mb-2">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-50 px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to Transform Your Hiring Process?
        </h2>
        <p className="text-gray-700 mb-6">
          Join forward-thinking teams already using Intalk to hire better and
          faster.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md text-sm font-medium">
            Get Started for Free
          </button>
          <button className="border border-gray-300 px-5 py-2 rounded-md text-sm font-medium">
            Schedule a Demo
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-6 text-center text-sm text-gray-500 border-t bg-white">
        <div className="flex justify-center gap-4 mb-2">
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <p>© 2025 Intalk. All rights reserved.</p>
      </footer>
    </main>
  );
}

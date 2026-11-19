"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me");
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError("Failed to load user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="card text-center max-w-md">
          <p className="text-red-600 mb-4">{error || "Unable to load dashboard"}</p>
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 text-sm">Welcome back, {user.name}! 👋</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-secondary"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="card mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Ready to Study Abroad?
              </h2>
              <p className="text-slate-600">
                Explore guides, practice languages, and track your progress.
              </p>
            </div>
            <div className="text-5xl">🎯</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-600 font-semibold">Languages</h3>
              <span className="text-3xl">🌍</span>
            </div>
            <p className="text-4xl font-bold text-slate-900">3</p>
            <p className="text-sm text-slate-500 mt-2">French, English, Arabic</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-600 font-semibold">Current Level</h3>
              <span className="text-3xl">📊</span>
            </div>
            <p className="text-4xl font-bold text-slate-900">A1</p>
            <p className="text-sm text-slate-500 mt-2">Start here</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-600 font-semibold">Practice Days</h3>
              <span className="text-3xl">🔥</span>
            </div>
            <p className="text-4xl font-bold text-slate-900">0</p>
            <p className="text-sm text-slate-500 mt-2">Streak</p>
          </div>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* AI Tutor Card */}
          <Link href="/tutor" className="group">
            <div className="card group-hover:shadow-lg border-2 border-transparent group-hover:border-blue-600 transition-all h-full">
              <div className="mb-4">
                <div className="text-5xl mb-3">🤖</div>
                <h3 className="text-2xl font-bold text-slate-900">AI Tutor</h3>
                <p className="text-slate-600 mt-2">
                  Practice languages with personalized AI exercises
                </p>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-slate-600">✓ Unlimited conversations</p>
                <p className="text-sm text-slate-600">✓ Grammar explanations</p>
                <p className="text-sm text-slate-600">✓ Real-time feedback</p>
              </div>
              <div className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                Start Practice →
              </div>
            </div>
          </Link>

          {/* Study Guides Card */}
          <Link href="/courses" className="group">
            <div className="card group-hover:shadow-lg border-2 border-transparent group-hover:border-purple-600 transition-all h-full">
              <div className="mb-4">
                <div className="text-5xl mb-3">📚</div>
                <h3 className="text-2xl font-bold text-slate-900">Study Guides</h3>
                <p className="text-slate-600 mt-2">
                  Complete guides for studying in Europe
                </p>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-slate-600">✓ Campus France guide</p>
                <p className="text-sm text-slate-600">✓ Italian universities</p>
                <p className="text-sm text-slate-600">✓ German universities</p>
              </div>
              <div className="text-purple-600 font-bold group-hover:translate-x-1 transition-transform">
                Explore Guides →
              </div>
            </div>
          </Link>
        </div>

        {/* Secondary Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="font-bold text-slate-900 mb-2">Templates</h3>
            <p className="text-sm text-slate-600">
              CV, motivation letters & application documents
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="font-bold text-slate-900 mb-2">Community</h3>
            <p className="text-sm text-slate-600">
              Connect with other students & share tips
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="font-bold text-slate-900 mb-2">Scholarships</h3>
            <p className="text-sm text-slate-600">
              Discover funding opportunities
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-12 p-6 bg-slate-100 rounded-lg">
          <h4 className="font-bold text-slate-900 mb-3">Account Information</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-600">Name</p>
              <p className="font-semibold text-slate-900">{user.name}</p>
            </div>
            <div>
              <p className="text-slate-600">Email</p>
              <p className="font-semibold text-slate-900">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

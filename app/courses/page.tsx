"use client";

import Link from "next/link";

const courses = [
  {
    id: 1,
    country: "🇫🇷 France",
    title: "Campus France Guide",
    description: "Complete step-by-step guide to applying through Campus France",
    icon: "📚",
    lessons: 12,
    level: "Beginner"
  },
  {
    id: 2,
    country: "🇫🇷 France",
    title: "Student Visa Process",
    description: "Everything you need to know about French student visa requirements",
    icon: "🛂",
    lessons: 8,
    level: "Intermediate"
  },
  {
    id: 3,
    country: "🇮🇹 Italy",
    title: "Italian Universities Overview",
    description: "Top universities in Italy and how to apply as an international student",
    icon: "🏫",
    lessons: 10,
    level: "Beginner"
  },
  {
    id: 4,
    country: "🇮🇹 Italy",
    title: "Living in Italy",
    description: "Practical guide to student life, costs, and culture in Italy",
    icon: "🏠",
    lessons: 9,
    level: "Intermediate"
  },
  {
    id: 5,
    country: "🇩🇪 Germany",
    title: "DAAD Scholarship Guide",
    description: "How to apply for prestigious DAAD scholarships in Germany",
    icon: "🎓",
    lessons: 11,
    level: "Advanced"
  },
  {
    id: 6,
    country: "🇩🇪 Germany",
    title: "German University System",
    description: "Understanding the German higher education system and admission process",
    icon: "🎯",
    lessons: 7,
    level: "Beginner"
  },
  {
    id: 7,
    country: "🌍 General",
    title: "Scholarship Strategies",
    description: "Tips and strategies to win scholarships for studying abroad",
    icon: "💡",
    lessons: 6,
    level: "Beginner"
  },
  {
    id: 8,
    country: "🌍 General",
    title: "Document Preparation",
    description: "How to write compelling motivation letters and personal statements",
    icon: "✍️",
    lessons: 5,
    level: "Intermediate"
  }
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">📚 Study Guides</h1>
            <p className="text-slate-600 mt-1">Everything you need to study abroad</p>
          </div>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filter Section */}
        <div className="mb-12">
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">
              All Courses
            </button>
            <button className="px-4 py-2 bg-slate-200 text-slate-900 rounded-full font-medium hover:bg-slate-300">
              🇫🇷 France
            </button>
            <button className="px-4 py-2 bg-slate-200 text-slate-900 rounded-full font-medium hover:bg-slate-300">
              🇮🇹 Italy
            </button>
            <button className="px-4 py-2 bg-slate-200 text-slate-900 rounded-full font-medium hover:bg-slate-300">
              🇩🇪 Germany
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="card group hover:shadow-lg hover:border-blue-600 cursor-pointer transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{course.icon}</div>
                <span className="badge">{course.level}</span>
              </div>

              {/* Country */}
              <p className="text-sm font-semibold text-blue-600 mb-2">
                {course.country}
              </p>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                {course.title}
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                {course.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>📖</span>
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">📝 More Courses Coming Soon</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We're constantly adding new courses on scholarships, language requirements, and country-specific guides. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-100">
      <h1 className="text-6xl font-semibold mb-14 text-black">Which type of Weather do you want?</h1>
      <div className="space-x-4">
        <a href="/current" className="bg-blue-600 text-white px-10 py-10 rounded text-lg hover:bg-blue-700 transition">
          Current
        </a>
        <a href="/5day" className="bg-gray-800 text-white px-10 py-10 rounded text-lg hover:bg-gray-900 transition">
          5 Day
        </a>
      </div>
    </div>
  );
}

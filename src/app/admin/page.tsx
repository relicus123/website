"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleAddTherapist = () => {
    router.push("/admin/therapists");
  };

  const handleManageBookings = () => {
    router.push("/admin/bookings");
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Admin Panel
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Select an action below to manage your platform
        </p>

        <div className="space-y-4">
          {/* Add Therapist Button */}
          <button
            onClick={handleAddTherapist}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="text-lg">➕</span> Add Therapist
          </button>

          {/* Manage Bookings Button */}
          <button
            onClick={handleManageBookings}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <span className="text-lg">📅</span> Manage All Bookings
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center mb-4">
            Logged in as: <strong>{session?.user?.email}</strong>
          </p>
          <button
            onClick={handleLogout}
            className="w-full text-red-600 hover:text-red-700 font-semibold py-2 px-4 rounded-lg transition duration-300 border border-red-200 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

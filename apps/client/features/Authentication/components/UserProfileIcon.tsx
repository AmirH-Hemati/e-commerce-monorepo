"use client";
import { LogOut, Settings, ShoppingBag, User, UserCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useLogout } from "../hooks/useLogout";

export default function UserProfileIcon() {
  const { user, isLoading, isAuthenticated } = useUser();
  const { logout, isPending } = useLogout();
  const [open, setOpen] = useState(false);

  if (isLoading) return <p>Loading...</p>;

  function handelLogout() {
    logout();
  }
  if (!isAuthenticated)
    return (
      <Link href="/login" className="text-gray-700">
        Sign in
      </Link>
    );

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-gray-700"
      >
        <User className="w-5 h-5" />
      </button>

      {open && user && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-200 bg-white shadow-md overflow-hidden z-50">
          {/* User Info */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                {user?.data?.name}
              </p>
              <p className="text-xs text-gray-500"> {user?.data?.email}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col py-1">
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              <User className="w-4 h-4 text-gray-500" />
              Profile
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              <Settings className="w-4 h-4 text-gray-500" />
              Settings
            </Link>
            <Link
              href="/orders"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              <ShoppingBag className="w-4 h-4 text-gray-500" />
              My Orders
            </Link>

            <button
              disabled={isPending}
              onClick={handelLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition w-full text-left"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

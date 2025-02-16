"use client";

import Link from "next/link";
import { UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="w-full text-lg font-bold h-[90px] flex flex-row justify-between items-center bg-gray-100 text-black px-6 shadow-sm">
      <div className="flex flex-row gap-6">
        <Link
          href="/"
          className={`transition ${
            pathname === "/" ? "text-[#00a36c]" : "hover:text-[#00a36c]"
          }`}
        >
          Feed
        </Link>
        <Link
          href="/create"
          className={`transition ${
            pathname === "/create" ? "text-[#00a36c]" : "hover:text-[#00a36c]"
          }`}
        >
          Create
        </Link>
      </div>

      <Link href="/profile">
        <UserCircle
          size={36}
          className={`cursor-pointer transition ${
            pathname === "/profile" ? "text-[#00a36c]" : "hover:text-[#00a36c]"
          }`}
        />
      </Link>
    </div>
  );
}

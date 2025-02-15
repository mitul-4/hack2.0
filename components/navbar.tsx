import Link from "next/link";
import { UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full text-lg font-bold h-[90px] flex flex-row justify-between items-center bg-gray-100 text-black px-6 shadow-sm">
      <div className="flex flex-row gap-6">
        <Link href="/" className="hover:text-[#00a36c] transition">Feed</Link>
        <Link href="/create" className="hover:text-[#00a36c] transition">Create</Link>
      </div>

      <Link href="/profile" className="hover:text-[#00a36c] transition">
        <UserCircle size={36} className="cursor-pointer" />
      </Link>
    </div>
  );
}

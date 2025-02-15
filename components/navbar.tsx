import Link from "next/link";

export default function Navbar() {
  return (
    <div className='w-full text-lg font-bold h-[90px] flex flex-row justify-center gap-4 items-center bg-gray-100 text-black px-4 shadow-sm'>
      <Link href="/">Feed</Link>
      <Link href="/create">Create</Link>
    </div>
  );
}
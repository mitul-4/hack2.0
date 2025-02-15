import Link from "next/link";

export default function Navbar() {
  return (
    <div className='w-full h-[90px] flex flex-row justify-center gap-4 items-center bg-gray-800 text-white px-4'>
      <Link href="/">Feed</Link>
      <Link href="/profile">Create</Link>
    </div>
  )
}
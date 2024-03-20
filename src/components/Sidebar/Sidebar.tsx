import Link from "next/link" ;
import React, { SetStateAction } from "react" ;
import { IoIosClose } from "react-icons/io" ;

const Sidebar = ({ onClick }: { onClick: React.Dispatch<SetStateAction<boolean>> }) => {
  return (
    <nav className="absolute top-0 bottom-[-100%] left-0 right-0 bg-[#00000080] pointer-events-none">
      <div className="absolute top-0 bottom-0 right-0 border-l-black border-l-4 w-[50%] bg-white opacity-100 z-50 max-sm:w-[100%] max-sm:border-hidden pointer-events-auto">
        <IoIosClose onClick={() => onClick(false)} size={75} className="cursor-pointer mb-3" />
        <Link
          href="/posts"
          className="text-3xl px-5"
          onClick={() => onClick(false)}
        >פוסטים</Link>
      </div>
    </nav>
  ) ;
}

export default Sidebar ;
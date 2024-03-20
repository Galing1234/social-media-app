import { getServerSession } from "next-auth" ;
import Image from "next/image" ;
import Link from "next/link" ;
import { options } from "@/app/api/auth/[...nextauth]/options" ;
import Menu from "../Menu/Menu" ;

const Navbar = async () => {
  const session = await getServerSession(options) ;
  
  return (
    <nav className="bg-blue-900 h-[77px]">
      <header className="flex jusfify-between items-center">
        <Menu />
        
        <div className="flex items-center flex-1 max-sm:hidden"> 
          <Image
            src="/boomerang-logo.png"
            alt=""
            width={200}
            height={100}
            className="w-auto max-sm:hidden"
            priority
          />
        </div>

        <div className="flex justify-between text-gray-100 flex-1 ml-10 max-sm:justify-around items-center h-[77px] text-center max-sm:ml-0 max-sm:mr-3">
          <Link
            href="/"
            className="text-3xl no-underline hover:text-gray-400"
          >בית</Link>

          {
            session 
            ?
            <>
              <Link
                href="/users"
                className="text-3xl no-underline hover:text-gray-400"
              >משתמשים</Link>

              <Link
                href="/api/auth/signout?callbackUrl=/"
                className="text-3xl no-underline hover:text-gray-400"
              >צאו</Link>
            </>
            : 
            <Link
              href="/api/auth/signin?callbackUrl=/"
              className="text-3xl no-underline hover:text-gray-400"
            >כנסו</Link>
          }
        </div>
      </header>
    </nav>
  ) ;
}

export default Navbar ;
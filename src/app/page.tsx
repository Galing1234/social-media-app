import { getServerSession } from "next-auth" ;
import { options } from "./api/auth/[...nextauth]/options" ;
import { findUser, postNewUser } from "@/lib/utils" ;
import Link from "next/link" ;
import { UserType } from "@/types/types";

const HomePage = async () => {
  const session = await getServerSession(options) ;

  let user = { name: '' } ;

  if (session) {
    postNewUser(session) ;
    user = await findUser(session.user.email) as UserType ;
  }
  
  return (
    <div className={`${session ? null : "bg-black text-gray-100"} min-h-screen pt-2 text-center`}>
      { user && user.name ? 
          <h1 className="text-4xl">ברוכים הבאים, {user.name}</h1>
        : 
        <>
          <h1 className="text-4xl">ברוכים הבאים לבומרנג</h1>

          <br /> 
          <br />
          
          <Link 
            href="/api/auth/signin?callbackUrl=/"
            className="p-3 bg-gray-600 rounded no-underline cursour-pointer hover:bg-gray-500 active:bg-gray-400"
          >הצטרפו עכשיו!</Link>
        </>
      }
    </div>
  ) ;
}

export default HomePage ;
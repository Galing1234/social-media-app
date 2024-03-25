import Link from 'next/link' ;
import Image from "next/image" ;
import { options } from "@/app/api/auth/[...nextauth]/options" ;
import { findUser, findUserById } from "@/lib/utils" ;
import { UserType } from "@/types/types" ;
import { getServerSession } from "next-auth" ;
import { AiOutlineLike } from 'react-icons/ai' ;

const Profile = async () => {
  const session = await getServerSession(options) ;
  const user = await findUser(session.user.email) as UserType ;

  return (
    <div className="my-2 mx-5 max-sm:flex max-sm:flex-col max-sm:items-center">
      <div className="flex items-center">
        <Image
          alt=""
          src={user.profilePicture}
          width={35}
          height={35}
          className="ml-2 rounded-lg"
        />
        <h1 className="no-underline max-sm:text-3xl text-5xl overflow-ellipsis overflow-hidden whitespace-nowrap">{user.name}</h1>
      </div>

      <h2 className="max-sm:text-vase text-xl overflow-ellipsis overflow-hidden whitespace-nowrap">{user.email}</h2>
      <div className="flex items-center"><AiOutlineLike size={20} /> <p className="text-xl mr-0.5">{user.likedNumber}</p></div> <br />
      <h1 className="no-underline mb-1 overflow-ellipsis overflow-hidden whitespace-nowrap">החברים שלך</h1>

      {
        user.friends.map(async (friendId: string) => {
          const friend = await findUserById(friendId) as UserType ;

          return (
            <div key={friend._id} className="mb-0.5">
              <Link
                href={`${process.env.NEXT_BASE_URL_PATH}/users/${friendId}`}
                className="flex"
              >
                <Image
                  alt=""
                  src={friend.profilePicture}
                  width={25}
                  height={25}
                  className="ml-1 rounded-lg"
                />
                
                <h2 className="text-base overflow-ellipsis overflow-hidden whitespace-nowrap">{friend.name}</h2>
              </Link>
            </div>
          )
        })
      }
    </div>
  ) ;
}

export default Profile ;
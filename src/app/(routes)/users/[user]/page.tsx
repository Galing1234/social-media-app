import Link from "next/link" ;
import Image from "next/image" ;
import { AiOutlineLike } from "react-icons/ai" ;
import { getServerSession } from "next-auth" ;
import { UserType } from "@/types/types" ;
import AddFriendButton from "@/components/AddFriendButton/AddFriendButton" ;
import { options } from "@/app/api/auth/[...nextauth]/options" ;
import { findUser, getFriends, getUser } from "@/lib/utils" ;
import { redirect } from "next/navigation";

const UserPage = async ({ params }: { params: { user: string } }) => {
  const chosenUser: UserType = await getUser(params.user) ;
  const session = await getServerSession(options) ;
  const userUnJSONed = await findUser(session.user.email) as UserType ;
  const user: UserType = JSON.parse(JSON.stringify(userUnJSONed)) ;
  
  if (chosenUser._id === user._id) redirect("/profile") ;
  
  const chosenUserFriends = await getFriends(chosenUser) ;
  const userTSX = (
    <div className="max-sm:flex max-sm:flex-col max-sm:items-center mt-2">
      <Image 
        src={chosenUser.profilePicture} 
        width={150} 
        height={150} 
        alt=""
        className="absolute left-[10px] top-[10px] rounded-[25px] max-sm:w-[75px] max-sm:h-[75px] max-sm:static max-sm:rounded-[12.5]"
      />

      <h1 className="text-7xl max-sm:text-6xl no-underline mb-1 max-sm:mt-2 max-w-[500px] overflow-ellipsis overflow-hidden whitespace-nowrap max-sm:max-w-full">{chosenUser.name}</h1>
      <h2 className="text-2xl max-sm:text-xl max-w-[500px] overflow-ellipsis overflow-hidden whitespace-nowrap max-sm:max-w-full">{chosenUser.email}</h2>

      <div className="flex items-center">
        <AiOutlineLike className="ml-0.5" size={25} />
        <p className="text-2xl">{chosenUser.likedNumber}</p>
      </div>

      { user.friends.includes(chosenUser._id) && chosenUser.friends.includes(user._id)
        ? <button className="text-xl bg-gray-200 rounded px-2 mt-2 shadow-md" disabled>כבר חבר</button> 
        : user.friends.includes(chosenUser._id) 
          ? <button className="text-xl bg-gray-200 rounded px-2 mt-2 shadow-md" disabled>נשלחה בקשת חברות</button>
          : <AddFriendButton userId={user._id} chosenUser={chosenUser} /> 
      }

      { chosenUserFriends.length > 0 && <h1 className="mt-5 text-5xl">חברים</h1> }      

      {
        chosenUserFriends.map(friend => {
          return (
            <div key={friend?._id} className="mt-2 cursor-pointer">
              <Link
                href={friend?._id == user._id ? '/profile' : `/users/${friend?._id}`}
                className="flex max-sm:justify-center items-center"
              >
                <Image 
                  src={friend?.profilePicture as HTMLImageElement} 
                  width={50} 
                  height={50} 
                  alt=""
                  className="rounded-[25px] ml-2"
                />

                <h1 className="no-underline">{friend?.name}</h1>
              </Link>
            </div>
          )
        })
      }
    </div>
  ) ;

  return (
    <div className="relative mr-2 max-sm:text-center">
      {userTSX}
    </div>
  ) ;
}

export default UserPage ;
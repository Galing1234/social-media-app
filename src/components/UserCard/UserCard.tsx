"use client"

import { UserType } from "@/types/types" ;
import Image from "next/image" ;
import { useRouter } from 'next/navigation' ;

const UserCard = ({ user }: { user: UserType }) => {
  const router = useRouter() ;

  return (
    <div 
      className="flex w-[100%] text-center bg-gray-400 py-2 my-1 cursor-pointer items-center justify-center"
      onClick={() => router.push(`/users/${user._id}`)}
    >
      {
        user.profilePicture &&
        <Image 
          src={`${user.profilePicture}`} 
          width={50} 
          height={50} 
          alt=""
          priority
          className="rounded-3xl ml-2 z"
        />
      }
      <h1 className="no-underline">{user.name}</h1>
    </div>
  ) ;
}

export default UserCard ;
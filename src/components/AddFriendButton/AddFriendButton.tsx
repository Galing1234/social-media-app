"use client"

import { useEffect, useState } from "react" ;
import { UserType } from "@/types/types" ;

const AddFriendButton = ({ userId, chosenUser }: { userId: string, chosenUser: UserType }) => {
  const [isClicking, setIsClicking] = useState<boolean>(false) ;
  
  useEffect(() => {
    async function postUser() {
      if (!isClicking) return ;

      try {
        const res = await fetch(`/api/users/${userId}`, {
          method: 'POST',
          body: JSON.stringify({
            action: {
              type: 'add_new_friend'
            },
            id: chosenUser._id
          })
        }) ;
        const data = await res.json() ;

        console.log(data) ;
      } catch (error: any) {
        console.error(error) ;
      }

      setIsClicking(false) ;
    }

    postUser() ;
  }, [chosenUser._id, isClicking, userId]) ;
  
  return (
    <button className="text-xl border-black border-2 hover:bg-gray-200 active:bg-gray-300 rounded px-2 mt-2 shadow-md" onClick={() => setIsClicking(true)}>
      הוסף חבר
    </button>
  ) ;
}

export default AddFriendButton ;
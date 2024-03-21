"use client"

import { useEffect, useState } from "react" ;
import { AiOutlineLike } from "react-icons/ai" ;

interface Props {
  userId: string ;
  postId: string ;
}

const LikeComponent = ({
  userId,
  postId
}: Props) => {
  const [isClicking, setIsClicking] = useState<boolean>(false) ;
  const [isLiked, setIsLiked] = useState<boolean>(false) ;

  useEffect(() => {
    if (!isClicking) return ;
    
    async function updateUser() {
      if (isLiked) {
        const res1 = await fetch(`/api/users/${userId}`, {
          method: "POST",
          body: JSON.stringify({
            action: {
              type: "remove_likes"
            }
          }),
        }) ;
        const res2 = await fetch(`/api/users/${postId}`, {
          method: "POST",
          body: JSON.stringify({
            action: {
              type: "remove_likes"
            }
          }),
        }) ;
        const data = await res1.json() ;

        console.log(data) ;

        setIsClicking(false) ;
        setIsLiked(false) ;
      } else {
        const res1 = await fetch(`/api/users/${userId}`, {
          method: "POST",
          body: JSON.stringify({
            action: {
              type: "add_likes"
            }
          }),
        }) ;
        const res2 = await fetch(`/api/users/${postId}`, {
          method: "POST",
          body: JSON.stringify({
            action: {
              type: "remove_likes"
            }
          }),
        }) ;
        const data = await res1.json() ;
        
        console.log(data) ;

        setIsClicking(false) ;
        setIsLiked(true) ;
      }
    }

    updateUser() ;
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, isClicking]) ;
  
  return (
    <button onClick={() => setIsClicking(true)}>
      <AiOutlineLike />
    </button>
  ) ;
}

export default LikeComponent ;
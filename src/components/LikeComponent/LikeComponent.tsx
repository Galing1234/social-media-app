"use client"

import { useEffect, useState } from "react" ;
import { AiOutlineLike, AiFillLike } from "react-icons/ai" ;

interface Props {
  userId: string ;
  chosenUserId: string ;
  postId: string ;
}

const LikeComponent = ({
  userId,
  chosenUserId,
  postId
}: Props) => {
  const [isLiking, setIsLiking] = useState<boolean>(false) ;
  const [isUpdatingLikes, setIsUpdatingLikes] = useState(false) ;

  useEffect(() => {
    async function getUserLikes() {
      const userRes = await fetch(`/api/users/${userId}`);
      const userData = await userRes.json();

      setIsLiking(userData.user.postsLiked.includes(postId)) ;
    }

    getUserLikes() ;
  }, [userId, postId]) ;

  const handleLike = async () => {
    if (isUpdatingLikes) return ;

    setIsUpdatingLikes(true) ;

    try {
      const chosenUserUpdateUrl = `/api/users/${chosenUserId}` ;
      const chosenUserBody = JSON.stringify({
        action: {
          type: isLiking ? "remove_likes" : "add_likes",
        },
        id: postId,
      }) ;
      const chosenUser = await fetch(chosenUserUpdateUrl, {
        method: "POST",
        body: chosenUserBody,
      }) ;

      if (!chosenUser.ok) {
        throw new Error(`Failed to update like status: ${chosenUser.statusText}`) ;
      }

      const userUpdateUrl = `/api/users/${userId}` ;
      const userBody = JSON.stringify({
        action: {
          type: isLiking ? "remove_likes_from_post" : "add_likes_to_post",
        },
        id: postId,
      }) ;
      const userRes = await fetch(userUpdateUrl, {
        method: "POST",
        body: userBody,
      }) ;

      if (!userRes.ok) {
        throw new Error(`Failed to update like status: ${userRes.statusText}`) ;
      }

      const postUpdateUrl = `/api/posts/${postId}` ;
      const postBody = JSON.stringify({
        action: {
          type: isLiking ? "remove_likes" : "add_likes",
        },
      }) ;
      const postRes = await fetch(postUpdateUrl, {
        method: "POST",
        body: postBody,
      }) ;

      if (!postRes.ok) {
        throw new Error(`Failed to update like status: ${postRes.statusText}`) ;
      }

      setIsLiking(!isLiking) ;
    } catch (error) {
      console.error("Error updating like status:", error) ;
    } finally {
      setIsUpdatingLikes(false) ;
    }
  } ;
  
  return (
    <button onClick={handleLike}>
      { isLiking ? <AiFillLike /> : <AiOutlineLike /> }
    </button>
  ) ;
}

export default LikeComponent ;
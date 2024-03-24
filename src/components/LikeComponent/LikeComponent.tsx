"use client"

import { PostType } from "@/types/types";
import { useEffect, useState } from "react" ;
import { AiOutlineLike, AiFillLike } from "react-icons/ai" ;

interface Props {
  userId: string ;
  chosenUserId: string ;
  post: PostType ;
}

const LikeComponent = ({
  userId,
  chosenUserId,
  post
}: Props) => {
  const [isLiking, setIsLiking] = useState<boolean | null>(null) ;
  const [isUpdatingLikes, setIsUpdatingLikes] = useState(false) ;
  const [postLikes, setPostLikes] = useState<number>(post.likes) ;

  useEffect(() => {
    async function getUserLikes() {
      const userRes = await fetch(`/api/users/${userId}`) ;
      const userData = await userRes.json() ;

      setIsLiking(userData.user.postsLiked.includes(post._id)) ;
    }

    getUserLikes() ;
  }, [userId, post._id]) ;

  const handleLike = async () => {
    if (isUpdatingLikes) return ;
    if (isLiking === null) return ;

    setIsUpdatingLikes(true) ;
    setPostLikes(prevPostLikes => {
      return isLiking ? prevPostLikes - 1 : prevPostLikes + 1
    }) ;
    setIsLiking(!isLiking) ;

    try {
      const chosenUserUpdateUrl = `/api/users/${chosenUserId}` ;
      const chosenUserBody = JSON.stringify({
        action: {
          type: isLiking ? "remove_likes" : "add_likes",
        },
        id: post._id,
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
        id: post._id,
      }) ;
      const userRes = await fetch(userUpdateUrl, {
        method: "POST",
        body: userBody,
      }) ;

      if (!userRes.ok) {
        throw new Error(`Failed to update like status: ${userRes.statusText}`) ;
      }

      const postUpdateUrl = `/api/posts/${post._id}` ;
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
    } catch (error) {
      console.error("Error updating like status:", error) ;
    } finally {
      setIsUpdatingLikes(false) ;
    }
  } ;
  
  return (
    <>
      <button onClick={handleLike}>
        { isLiking ? <AiFillLike /> : <AiOutlineLike /> }
      </button>
      <p className="mr-1">{postLikes}</p>
    </>
  ) ;
}

export default LikeComponent ;
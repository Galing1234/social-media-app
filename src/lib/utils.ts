import { Session } from "next-auth" ;
import { Post, User } from "@/models/Models" ;
import { UserType } from "@/types/types" ;
import axios from "axios" ;

export async function postNewUser(sess: Session) {
  const { data: { user } } = await axios.post(
    `${process.env.NEXT_BASE_URL_PATH}/api/users`,
    { user: sess },
  ) ;
}

export async function findUser(userEmail: string) {
  const user = await User.findOne({ email: userEmail }).exec() ;

  return user ;
}

export async function findUserById(userId: string) {
  const user = await User.findOne({ _id: userId }) ;
  
  return user ;
}

export async function getUsers() {
  const res = await fetch(
    `${process.env.NEXT_BASE_URL_PATH}/api/users`, 
    { next: { revalidate: 1 } }
  ) ;
  const data = await res.json() ;

  return data.res ;
}

export async function getFriends(user: UserType) {
  const friends = await Promise.all(
    user.friends.map(async (friendId) => {
      const friend = await findUserById(friendId) ;
      return friend ;
    })
  ) ;

  const mutualFriends = friends.filter((friend) => friend?.friends.includes(user._id)) ;
    
  return mutualFriends ;
}

export async function getUser(userId: string) {
  const res = await fetch(`${process.env.NEXT_BASE_URL_PATH}/api/users/${userId}`, { next: { revalidate: 1 } }) ;
  const data = await res.json() ;

  return data.user ;
} 

export async function getPosts(number?: number) {
  const res = await fetch(`${process.env.NEXT_BASE_URL_PATH}/api/posts?${number !== undefined && `posts=${number}`}`, { next: { revalidate: 1 } } ) ;

  console.log(`${process.env.NEXT_BASE_URL_PATH}/api/posts?${number !== undefined && `posts=${number}`}`) ;
  
  const data = await res.json() ;

  console.log('data:', data) ;

  return data.res ;
}

export async function findPostById(postId: string) {
  const post = await Post.findOne({ _id: postId }) ;

  return post ;
}
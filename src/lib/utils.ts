import { Session } from "next-auth" ;
import { User } from "@/models/Models" ;
import { UserType } from "@/types/types" ;

export async function postNewUser(sess: Session) {
  const res = await fetch(`${process.env.NEXT_BASE_URL_PATH}/api/users`, {
    method: 'POST',
    body: JSON.stringify(sess),
    headers: {
      'Content-Type': 'application/json'
    },
  }) ;
  const data = await res.json() ;

  return data.user ;
}

export async function findUser(userEmail: string) {
  const user = await User.findOne({ email: userEmail }).exec() ;

  return user ;
}

export async function findUserById(userId: string) {
  const user = await User.findOne({ _id: userId }) ;

  console.log(userId) ;
  

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

export async function getPosts() {
  const res = await fetch(`${process.env.NEXT_BASE_URL_PATH}/api/posts`, { next: { revalidate: 1 } } ) ;
  const data = await res.json() ;

  return data.res ;
}
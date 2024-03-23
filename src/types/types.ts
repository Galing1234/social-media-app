export type UserType = { 
  name: string, 
  email: string, 
  role: string,
  profilePicture: HTMLImageElement, 
  friends: Array<string>,
  likedNumber: number, 
  postsLiked: Array<string>,
  _id: string,
} ;
export type PostType = {
  title: string,
  user: string,
  content: string,
  likes: number,
  comments: Array<CommentType>,
  _id: string,
} ;
export type CommentType = {
  title: string,
  user: string,
  content: string,
  likes: number,
  _id: string,
}
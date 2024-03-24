import mongoose, { Schema } from 'mongoose';
import { CommentType, PostType, UserType } from '@/types/types' ;

const mongoPostsUri = process.env.MONGODB_POSTS_URI! ;
const mongoUsersUri = process.env.MONGODB_USERS_URI! ;

if (!mongoPostsUri || !mongoUsersUri) {
  console.log('users:', mongoPostsUri, 'posts', mongoUsersUri) ;
  
  throw new Error('Missing required environment variables: MONGODB_POSTS_URI and MONGODB_USERS_URI') ;
}

// Create separate connections using correct connection options type
const postsConnection = mongoose.createConnection(mongoPostsUri) ;
const usersConnection = mongoose.createConnection(mongoUsersUri) ;

mongoose.Promise = global.Promise ;

const postSchema = new Schema<PostType>({
  title: String,
  user: String,
  content: String,
  likes: Number,
  comments: Array<CommentType>,
}, { timestamps: true }) ;

const userSchema = new Schema<UserType>({
  name: String,
  email: String,
  role: String,
  profilePicture: String,
  friends: [String],
  likedNumber: Number,
  postsLiked: [String]
}, { timestamps: true }) ;

const Post = postsConnection.model('Post', postSchema) ;
const User = usersConnection.model('User', userSchema) ;

export { Post, User } ;

import Image from "next/image" ;
import { getPosts, findUserById, findUser } from "@/lib/utils" ;
import { PostType, UserType } from "@/types/types" ;
import LikeComponent from "@/components/LikeComponent/LikeComponent";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const PostsList = async () => {
  const posts: Array<PostType> = await getPosts() ;
  const session = await getServerSession(options) ;
  const user = await findUser(session.user.email) as UserType ;
  const postsTSX = posts.map(async (post: PostType) => {
    const userPost = await findUserById(post.user) as UserType ;

    return (
      <div key={post._id} className="border-black border-2 m-2 p-2 rounded shadow-lg cursor-pointer text-start">
        {
          userPost.profilePicture &&
          <div className="flex">
            <Image 
              src={`${userPost.profilePicture}`} 
              width={35} 
              height={35} 
              alt=""
              priority
              className="rounded-3xl"
            />
            <h1 className="no-underline mr-2">{userPost.name}</h1>
          </div>
        }

        <h1 className="no-underline mb-0 text-3xl">{post.title}</h1>
        <h2 className="mt-0">{post.content}</h2>

        <div className="flex items-center text-xl">
          <LikeComponent 
            userId={user._id}
            chosenUserId={userPost._id}
            postId={post._id}
           />
          <p className="mr-1">{post.likes}</p>
        </div>
      </div>
    ) ;
  }) ;
  
  return (
    <>
      {postsTSX}
    </>
  ) ;
}

export default PostsList ;
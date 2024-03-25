import Image from "next/image" ;
import Link from "next/link" ;
import { getPosts, findUserById, findUser } from "@/lib/utils" ;
import { PostType, UserType } from "@/types/types" ;
import LikeComponent from "@/components/LikeComponent/LikeComponent";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import PostForm from "@/components/PostForm/PostForm";
import CommentsComponent from "@/components/CommentsComponent/CommentsComponent";
import { FaCrown } from "react-icons/fa" ;
import { Post } from "@/models/Models" ;

const PostsList = async ({ 
  searchParams 
}: {
  searchParams: { posts: string }
}) => {
  const postsLength = await Post.countDocuments() ;
  const posts: Array<PostType> = await getPosts(Number(searchParams.posts) || 0) ;
  const session = await getServerSession(options) ;
  const user = await findUser(session.user.email) as UserType ;
  const postsTSX = posts.map(async (post: PostType) => {
    const userPost = await findUserById(post.user) as UserType ;

    return (
      <div key={post._id} className="border-black border-2 mx-2 mb-2 p-2 rounded shadow-lg cursor-pointer text-start">
        <div>
          <Link
            href={userPost._id == user._id ? '/profile' : `/users/${userPost._id}`}
            className="flex items-center"
          >
            <Image 
              src={`${userPost.profilePicture}`} 
              width={35} 
              height={35} 
              alt=""
              priority
              className="rounded-3xl"
            />
            <h1 className="no-underline mr-2 whitespace-nowrap overflow-hidden text-ellipsis">{userPost.name}</h1>

            { userPost.role === 'Admin' && <FaCrown 
              className="mr-2"
            /> }
          </Link>
        </div>

        <Link
          href={`${process.env.NEXT_BASE_URL_PATH}/posts/${post._id}`}
        >
          <h1 className="no-underline mb-0 text-3xl whitespace-nowrap overflow-hidden text-ellipsis">{post.title}</h1>
          <h2 className="mt-0 whitespace-nowrap overflow-hidden text-ellipsis">{post.content}</h2>
        </Link>
        
        <div className="flex items-center text-xl">
          <CommentsComponent />
          <p className="mr-1 ml-2">{post.comments.length}</p>

          <LikeComponent 
            userId={user._id.toString()}
            chosenUserId={userPost._id.toString()}
            post={post}
          />
        </div>
      </div>
    ) ;
  }) ;

  return (
    <>
      <PostForm userId={user._id.toString()} />

      <div className="mt-2">
        {postsTSX}

        { Number(searchParams.posts) < postsLength && <div className="flex justify-center w-full">
          <Link
            href={`${process.env.NEXT_BASE_URL_PATH}/posts?posts=${Number(searchParams.posts) + 10}`}
            className="border-black border-2 rounded text-gray-100 bg-orange-500 px-2 shadow-sm shadow-black"
          >ראו עוד</Link>
        </div> }
      </div>
    </>
  ) ;
}

export default PostsList ;
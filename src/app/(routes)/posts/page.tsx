import { getPosts, findUserById } from "@/lib/utils" ;
import { PostType } from "@/types/types" ;

const PostsList = async () => {
  const posts: Array<PostType> = await getPosts() ;
  const postsTSX = posts.map(async (post: PostType) => {
    const userPost = await findUserById(post.user) ;

    console.log(userPost) ;

    return (
      <div key={post._id} className="border-black border-2 m-2 px-2 py-1 rounded shadow-lg cursor-pointer text-start">
        <h1 className="no-underline mb-0 text-3xl">{post.title}</h1>
        <h2 className="mt-0">{post.content}</h2>
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
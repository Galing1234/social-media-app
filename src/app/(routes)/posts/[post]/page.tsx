import Image from 'next/image'
import { findPostById, findUserById } from "@/lib/utils" ;
import { UserType, PostType, CommentType } from "@/types/types" ;
import CommentsForm from '@/components/CommentsForm/CommentsForm';

const Post = async ({
  params
}: {
  params: {
    post: string
  }
}) => {
  const post = await findPostById(params.post) as PostType ;
  const user = await findUserById(post.user) as UserType ;
  const postTSX = (
    <div className="m-2">
      <div className="border-b-black border-b-2 pb-2">
        <div className="flex">
          <Image
            alt=''
            src={user.profilePicture}
            width={25}
            height={25}
            className="rounded-[30%] ml-2"
          />
          <h2>{user.name}</h2>
        </div>

        <h1 className="no-underline text-2xl">{post.title}</h1>
        <h2>{post.content}</h2>
      </div>

      <div className="">
        <h1 className="no-underline text-3xl pb-3 text-center">תגובות</h1>

        <CommentsForm userId={user._id} postId={post._id} />

        {
          post.comments.reverse().map(async (comment: CommentType) => {
            const user = await findUserById(comment.user) as UserType ;

            return (
              <div key={comment._id} className="border-t-black border-b-black border-2 my-2 p-2">
                <div className="flex items-center">
                  <Image
                    alt=''
                    src={user.profilePicture}
                    width={25}
                    height={25}
                    className="rounded-[50%] ml-2"
                  />
                  <h2>{user.name}</h2>
                </div>

                <h1 className="no-underline">{comment.title}</h1>
                <h2>{comment.content}</h2>
              </div>
            ) ;
          })
        }
      </div>
    </div>
  ) ;

  return (
    <div>
      {postTSX}
    </div>
  ) ;
}

export default Post ;
import Image from 'next/image'
import { findPostById, findUser, findUserById } from "@/lib/utils" ;
import { UserType, PostType, CommentType } from "@/types/types" ;
import CommentsForm from '@/components/CommentsForm/CommentsForm';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import Link from 'next/link';

const Post = async ({
  params
}: {
  params: {
    post: string
  }
}) => {
  const post = await findPostById(params.post) as PostType ;
  const user = await findUserById(post.user) as UserType ;
  const session = await getServerSession(options) ;
  const commentUser = await findUser(session.user.email) as UserType ;
  const postTSX = (
    <div className="m-2">
      <div className="border-b-black border-b-2 pb-2">
        <Link
          href={`${process.env.NEXT_BASE_URL_PATH}/users/${user._id}`}
        >
          <div className="flex items-center text-base">
            <Image
              alt=''
              src={user.profilePicture}
              width={25}
              height={25}
              className="rounded-[30%] ml-2"
            />
            <h2>{user.name}</h2>
          </div>
        </Link>

        <h1 className="no-underline text-2xl">{post.title}</h1>
        <h2>{post.content}</h2>
      </div>

      <div>
        <h1 className="no-underline text-3xl pb-3 text-center">תגובות</h1>

        <CommentsForm userId={commentUser._id} postId={post._id} />

        {
          post.comments.reverse().map(async (comment: CommentType) => {
            const userComment = await findUserById(comment.user) as UserType ;

            return (
              <div key={comment._id} className="border-t-black border-b-black border-2 my-2 p-2">
                <Link
                  href={`${process.env.NEXT_BASE_URL_PATH}/users/${userComment._id}`}
                >
                  <div className="flex items-center text-base">
                    <Image
                      alt=''
                      src={userComment.profilePicture}
                      width={25}
                      height={25}
                      className="rounded-[50%] ml-2"
                    />
                    <h2>{userComment.name}</h2>
                  </div>
                </Link>
                
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
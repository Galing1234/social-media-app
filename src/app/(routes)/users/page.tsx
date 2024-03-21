import { options } from "@/app/api/auth/[...nextauth]/options" ;
import UserCard from "@/components/UserCard/UserCard";
import { findUser, getUsers } from "@/lib/utils" ;
import { UserType } from "@/types/types" ;
import { getServerSession } from "next-auth";

const PeopleList = async () => {
  const users: Array<UserType> = await getUsers() ;
  const session = await getServerSession(options) ;
  const user = await findUser(session.user.email) as UserType ;
  const filteredUsers = users.filter(userFilter => userFilter._id !== String(user._id)) ;
  const usersTSX = filteredUsers.map(user => {
    return (
      <div key={user._id}>
        <UserCard user={user} />
      </div>
    ) ;
  }) ;
  
  return (
    <div>
      {usersTSX}
    </div>
  ) ;
}

export default PeopleList ;
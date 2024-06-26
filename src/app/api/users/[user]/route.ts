import { User } from "@/models/Models" ;
import { NextRequest, NextResponse } from "next/server" ;

export async function GET(_req: NextRequest, { params }: { params: { user: string } }) {
  try {
    const user = await User.findOne({ _id: params.user }) ;

    return NextResponse.json({ user }) ;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }) ;
  }
}

export async function POST(req: NextRequest, { params }: { params: { user: string } }) {
  try {
    const json = await req.json() ;
    const user = await User.findOne({ _id: params.user }) ;

    if (!user) return NextResponse.json({ error: "User not found" }) ;
    
    switch (json.action.type) {
      case 'add_new_friend':
        if (user.friends.includes(json.id)) return NextResponse.json({ user }) ;
        user.friends.push(json.id) ;

        await user.save() ;

        return NextResponse.json({ user }) ;
      case 'add_likes':
        user.likedNumber++ ;

        await user.save() ;

        return NextResponse.json({ user }) ;
      case 'remove_likes':
        user.likedNumber-- ;

        await user.save() ;

        return NextResponse.json({ user }) ;
      case 'add_likes_to_post':
        user.postsLiked.push(json.id) ;

        await user.save() ;

        return NextResponse.json({ user }) ;
      case 'remove_likes_from_post':
        user.postsLiked.splice(user.postsLiked.indexOf(json.id), 1) ;

        await user.save() ;

        return NextResponse.json({ user }) ;
      default: 
        return NextResponse.json({ user }) ;
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}
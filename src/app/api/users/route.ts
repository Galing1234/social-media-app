import { User } from "@/models/Models" ;
import { NextRequest, NextResponse } from "next/server" ;

export async function GET() {
  try {
    const res = await User.find({}) ;

    return NextResponse.json({ res }) ;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }) ;
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json() ;
    const body = data.user.user ;

    console.log(body) ;
    

    if (!body.name || !body.email || !body.image) {
      return NextResponse.json("All areas of input must be filled") ;
    }

    const existingUser = await User.findOne({ email: body.email }).exec() ;

    if (existingUser) {
      existingUser.name = body.name ;
      existingUser.profilePicture = body.image ;
      existingUser.postsLiked = existingUser.postsLiked || [] ;

      await existingUser.save() ;

      const users = await User.find({}) ;
      
      return NextResponse.json({ users }) ;
    } else {
      const newUser = new User({
        name: body.name,
        email: body.email,
        role: body.role,
        friends: [],
        profilePicture: body.image,
        postsLiked: [],
        likedNumber: 0
      }) ;

      await newUser.save() ;

      const users = await User.find({}) ;

      return NextResponse.json({ users }) ;
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }) ;
  }
}

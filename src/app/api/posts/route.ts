import { NextRequest, NextResponse } from "next/server" ;
import { Post } from "@/models/Models" ;

export async function GET(req: NextRequest) {
  const url = new URL(req.url) ;

  console.log(Number(url.searchParams.get("posts")) === 0) ;

  try {
    const sortedRes = await Post.find({}).sort({ _id: -1 }) ;
    const res = sortedRes.slice(0, Number(url.searchParams.get("posts"))) ;

    return NextResponse.json({ res: Number(url.searchParams.get("posts")) === 0 ? [] : res }) ;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }) ;
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json() ;
    const existingPost = await Post.findOne({ title: data.title, user: data.user }) ;

    if (existingPost) {
      return NextResponse.json({ res: "Title already exists. Please try again" }, { status: 409 }) ;
    }

    const newPost = new Post({
      title: data.title,
      user: data.user,
      content: data.content,
      likes: 0,
      comments: []
    }) ;

    console.log(newPost) ;

    await newPost.save() ;

    const res = await Post.find({}) ;

    return NextResponse.json({ res }) ;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }) ;
  }
}
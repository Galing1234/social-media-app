import { Post } from "@/models/Models" ;
import { NextRequest, NextResponse } from "next/server" ;

export async function GET(_req: NextRequest, { params }: { params: { post: string } }) {
  try {
    const post = await Post.findOne({ _id: params.post }) ;

    return NextResponse.json({ post }) ;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }) ;
  }
}

export async function POST(req: NextRequest, { params }: { params: { post: string } }) {
  try {
    const json = await req.json() ;
    const post = await Post.findOne({ _id: params.post }) ;

    if (!post) return NextResponse.json({ error: "Post not found" }) ;
    
    switch (json.action.type) {
      case 'add_likes':
        post.likes++ ;

        await post.save() ;

        return NextResponse.json({ post }) ;
      case 'remove_likes':
        post.likes-- ;

        await post.save() ;

        return NextResponse.json({ post }) ;
      default: 
        return NextResponse.json({ post }) ;
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}
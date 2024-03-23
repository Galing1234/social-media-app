"use client"

import { usePathname, useRouter } from "next/navigation" ;
import React, { useRef, useState } from "react" ;

interface Props {
  userId: string ;
}

const PostForm = ({ 
  userId
}: Props) => {
  const [formData, setFormData] = useState({ 
    title: '',
    content: '',
  }) ;
  const router = useRouter() ;
  const titleInput = useRef<HTMLInputElement>(null) ;
  const contentInput = useRef<HTMLInputElement>(null) ;
  const pathname = usePathname() ;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prevData => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    }) ;
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault() ;

    if (!formData.title || !formData.content) return ;

    await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        user: userId
      })
    }) ;

    if (titleInput.current) titleInput.current.value = '' ;
    if (contentInput.current) contentInput.current.value = '' ;

    router.push(pathname) ;
    router.refresh() ;
  }

  return (
    <form className="mt-2 mx-5">
      <input 
        type="text" 
        placeholder="מה עולה לך בראש?" 
        onChange={handleChange}
        name="title"
        className="mb-2 w-full"
        ref={titleInput}
      /> <br />

      <div className="flex">
        <input 
          type="text" 
          placeholder="ספרו לנו..." 
          onChange={handleChange}
          name="content"
          className="w-full ml-2"
          ref={contentInput}
        />

        <button onClick={handleSubmit} className="bg-gray-400 border-black border-2 rounded px-3 py-1">שלחו!</button>
      </div>
    </form>
  ) ;
}

export default PostForm ;
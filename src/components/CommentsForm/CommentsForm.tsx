"use client"

import React, { useState, useRef } from "react" ;
import { useRouter, usePathname } from "next/navigation" ;

const CommentsForm = ({
  userId,
  postId
}: {
  userId: string,
  postId: string
}) => {
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

    await fetch(`/api/posts/${postId}`, {
      method: 'POST',
      body: JSON.stringify({
        action: {
          type: 'add_comments'
        },
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
    <form className="w-full mb-5">
      <input 
        type="text" 
        placeholder="הכניסו כותרת כאן..." 
        onChange={handleChange}
        name="title"
        className="mb-2 w-full"
        ref={titleInput}
      /> <br />

      <div className="flex">
        <input 
          type="text" 
          placeholder="מה אתם חושבים?" 
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

export default CommentsForm ;
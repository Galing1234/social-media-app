"use client"

import { useState } from "react" ;
import { MdMenu } from "react-icons/md" ;
import Sidebar from "../Sidebar/Sidebar" ;

const Menu = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false) ;

  return (
    <div>
      {
        isClicked 
        ? <Sidebar onClick={setIsClicked} />
        : <MdMenu size={35} color="#FFF" className="cursor-pointer mr-3" onClick={() => setIsClicked(true)} />
      }
    </div>
  ) ;
}

export default Menu ;
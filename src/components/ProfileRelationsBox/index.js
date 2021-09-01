import React, {useState, useRef} from 'react'
import { ProfileRelationsBoxWrapper } from '../ProfileRelations'


function ProfileRelationsBox({items, title}) {

    const [text, setText] = useState("Ver mais")
    const ulRef = useRef()
  
    function handleSeeMore(){
      ulRef.current.classList.toggle("show")
      ulRef.current.style.height = "auto" 
      setText(text == "Ver mais" ? "Ver menos" : "Ver mais")
    }

    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {title} ({items.length})
        </h2>
        <ul ref={ulRef}>
           {items.map((item) => {
            return (
              <li key={ item.id || item.login}>
                <a href={  `/comunidades/${item.id}` || `https://github.com/${item}.png`}>
                  <img src={item.avatar_url || item.imageUrl || `https://github.com/${item.login}.png`} />
                  <span>{item.title || item.login}</span>
                </a>
              </li>
            )
          })} 
        </ul>
       {items.length > 6 && <span id="SeeMore" onClick={handleSeeMore}>{text}</span>}
      </ProfileRelationsBoxWrapper>
  
    )
  }

  export default ProfileRelationsBox
import React, { useState } from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'
import { likePost } from '../../api/PostRequest'
import { useLocation } from 'react-router-dom'
import copy from 'copy-to-clipboard'


const Post = ({data}) => {
  const {user} = useSelector((state) => state.authReducer.authData);

  const location = useLocation();
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const url = 'http://localhost:3000'

  const handleLike = () => {
    setLiked((prev) => !prev)
    likePost(data._id, user._id)
    liked ? setLikes((prev) => prev -1) : setLikes((prev) => prev +1)
  }

  const handleShare = () => {
    copy(url+location.pathname)
    alert('Copied url : '+url+location.pathname)
  }

  return (
    <div className='Post'>

        {data.image && (<img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt=""/>)}

        {data.video && (
          <video width="650" height="450" controls >
            <source src={data.video ? process.env.REACT_APP_PUBLIC_FOLDER + data.video : ""} type="video/mp4"/>
          </video>
        )}
        
        

        <div className='postReact'>
            <img src={liked ? Heart : NotLike} alt='' style={{ cursor: "pointer" }} onClick={handleLike} />
            <img src={Comment} alt=''/>
            <img src={Share} style={{ cursor: "pointer" }} onClick={handleShare} alt=''/>
        </div>

        <span style={{color: "var(--gray)", fontSize: "12px"}}> { likes } likes</span>

        <div className='detail'>
            <span><b>{data.name}</b></span>
            <span>{data.desc}</span>
        </div>
    </div>
  )
}

export default Post
import React from 'react'
import './Home.css'
import ProfileSide from '../profileSide/ProfileSide'
import PostSide from '../PostSide/PostSide'
import RightSide from '../RightSide/RightSide'

const Home = () => {
  return (
    <div className='Home'>
        <ProfileSide />
        <PostSide/>
        <RightSide/>
    </div>
  )
}

export default Home
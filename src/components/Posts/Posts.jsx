import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './Posts.css'
import { getTimelinePosts } from '../../actions/postAction'
import Post from '../Post/Post'
import { useParams } from 'react-router-dom'


const Posts = () => {
  const dispatch = useDispatch();
  const params  = useParams();
  const {user} = useSelector((state) => state.authReducer.authData);
  let {posts, loading} = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, [])

  if(!posts) return "No posts";

  if(params.id)  posts = posts.filter((post) => post.userId === params.id);

  return (
    <div className='Posts'>
        {loading 
          ? "Fetching Posts..."
          : posts.map((post, id) => {
              return <Post data={post} id={id} />
            })
        }
    </div>
  )
}

export default Posts
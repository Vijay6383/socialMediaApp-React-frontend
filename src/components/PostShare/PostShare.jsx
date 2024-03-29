import React, { useState, useRef } from 'react'
import defaultProfile from '../../img/defaultProfile.png'
import './PostShare.css'
import { UilScenery } from "@iconscout/react-unicons"
import { UilPlayCircle } from "@iconscout/react-unicons"
import { UilLocationPoint } from "@iconscout/react-unicons"
import { UilSchedule } from "@iconscout/react-unicons"
import { UilTimes } from "@iconscout/react-unicons"
import { useSelector, useDispatch } from 'react-redux'
import { uploadImage, uploadPost, uploadVideo } from '../../actions/uploadActions'

const PostShare = () => {
    const loading = useSelector((state) => state.postReducer.uploading);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const imageRef = useRef();
    const videoRef = useRef();
    const desc = useRef();
    const { user } = useSelector((state) => state.authReducer.authData);
    const dispatch = useDispatch();
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

    const reset = () => {
        setImage(null);
        setVideo(null);
        desc.current.value ="";
    }

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage(img);
        }
    }

    const onVideoChange = (event) => {
        if(event.target.files && event.target.files[0]){
            const vid = event.target.files[0];
            setVideo(vid);
            
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        if (image) {
            const data = new FormData();
            const filename = Date.now() + image.name
            data.append("name", filename)
            data.append("file", image)
            newPost.image = filename;
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error);
            }
        }

        if(video){
            const data = new FormData();
            const fileName = Date.now() + video.name;
            data.append("name", fileName);
            data.append("file", video);
            newPost.video = fileName;
            try {
                dispatch(uploadVideo(data))
            } catch (error) {
                console.log(error);
            }
        }

        dispatch(uploadPost(newPost));
        reset();
    }

    return (
        <div className='PostShare'>
            <img src={user.profilePicture ? serverPublic + user.profilePicture : defaultProfile} alt='' />
            <div>
                <input ref={desc} required type="text" placeholder="What's happening" />
                <div className='postOptions'>
                    <div className='option' style={{ color: "var(--photo)" }} onClick={() => imageRef.current.click()}>
                        <UilScenery />
                        Photo
                    </div>
                    <div className='option' style={{ color: "var(--video)" }} onClick={() => videoRef.current.click()}>
                        <UilPlayCircle />
                        Video
                    </div>
                    <div className='option' style={{ color: "var(--location)" }}>
                        <UilLocationPoint />
                        Location
                    </div>
                    <div className='option' style={{ color: "var(--schedule)" }}>
                        <UilSchedule />
                        Schedule
                    </div>
                    <button className='button ps-button'
                        onClick={handleSubmit}
                        disabled={loading}>
                        {loading? "uploading" : "Share"}
                    </button>
                    <div style={{ display: "none" }}>
                        <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
                        <input type="file" name="myVideo" ref={videoRef} onChange={onVideoChange} />
                    </div>
                </div>
                {image && (
                    <div className='previewImage'>
                        <UilTimes onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt='' />
                    </div>
                )}
                {video && (
                    <div className='previewVideo'>
                        <UilTimes onClick={() => setVideo(null)} />
                        <video width="750" height="500" controls >
                            <source src={URL.createObjectURL(video)} type="video/mp4"/>
                        </video>
                    </div>
                )}
            </div>

        </div>
    )
}

export default PostShare
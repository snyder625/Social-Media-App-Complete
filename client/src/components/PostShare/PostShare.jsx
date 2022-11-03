import React, {useState, useRef} from 'react'
import './PostShare.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {UilScenery} from '@iconscout/react-unicons'
import {UilPlayCircle} from '@iconscout/react-unicons'
import {UilLocationPoint} from '@iconscout/react-unicons'
import {UilSchedule} from '@iconscout/react-unicons'
import {UilTimes} from '@iconscout/react-unicons'
import {useDispatch, useSelector} from 'react-redux';
import {uploadImage, uploadPost} from '../../actions/uploadAction.js'
import app from '../../firebase';

const PostShare = () => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const loading = useSelector((state)=>state.postReducer.uploading)
    const dispatch = useDispatch();

    const [input, setInput] = useState();
    const [imageUrl, setImageUrl] = useState();
    const inputRef = useRef();
    const desc = useRef();
    const {user} = useSelector((state)=>state.authReducer.authData)

    const onInputChange= (event) => {
        if(event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setInput(img)
        }

    };

    const reset = () => {
        setInput(null);
        desc.current.value = "";
    };


    const uploadFile = (file, urlType)=> {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
        case 'paused':
            console.log('Upload is paused');
            break;
        case 'running':
            console.log('Upload is running');
            break;
        default:
            break;
        }
    }, 
    (error) => {
        // Handle unsuccessful uploads
    },
    () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
        console.log('File available at', downloadURL);
        });
    })
    };

    const handleSubmit =(e)=> {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            username: user.username,
            desc: desc.current.value
        }           
            newPost.image = imageUrl;
            console.log(newPost)
            try {
                dispatch(uploadImage(imageUrl))
            } catch (error) {
                console.log(error)
            }
        dispatch(uploadPost(newPost));
        reset();
    }


  return (
    <div className="PostShare">
        <img src={user.profilePicture?serverPublic + user.profilePicture: serverPublic + "defaultProfile.png"} alt="" />
        <div>
            <input ref={desc} required type="text" placeholder="What's happening?"></input>
            <div className="PostOptions">
                <div className="Option" style={{color: 'var(--photo)'}}
                onClick={()=> inputRef.current.click()}>
                    <UilScenery />
                    Photo
                </div>
                <div className="Option" style={{color: 'var(--video)'}}
                onClick={()=> inputRef.current.click()}>
                    <UilPlayCircle />
                    Video
                </div>
                <div className="Option" style={{color: 'var(--location)'}}>
                    <UilLocationPoint />
                    Location
                </div>
                <div className="Option" style={{color: 'var(--schedule)'}}>
                    <UilSchedule />
                    Schedule
                </div>
                <button className="Button ps-button" onClick={handleSubmit} disabled={loading}>
                    {loading?"Uploading...":"Share"}
                </button>
                <div style={{display: 'none'}}>
                    <input type="file" name="myImage" ref={inputRef} onChange={onInputChange} />
                </div>
            </div>
            {input && (
                <div className="previewImage">
                    <UilTimes onClick={()=>{setInput(null)}}/>
                    <img src={URL.createObjectURL(input)} alt=""></img>
                </div>
            )}

        </div>
    </div>
  )
}

export default PostShare
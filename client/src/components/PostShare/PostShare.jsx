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

    const [image, setImage] = useState();
    const [inputs, setInputs] = ({});
    const imageRef = useRef();
    const desc = useRef();
    const {user} = useSelector((state)=>state.authReducer.authData)

    const onImageChange= (event) => {
        if(event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img)
        }

    };

    const reset = () => {
        setImage(null);
        desc.current.value = "";
    };

    const handleSubmit =(e)=> {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            username: user.username,
            desc: desc.current.value
        }
        if (image) {
            const storage = getStorage(app);
            const filename = Date.now() + image.name;
            const storageRef = ref(storage, filename);
            const data = new FormData();

            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
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
                    downloadUrl = downloadURL;
                  console.log('File available at', downloadURL);
                });
              }
            );

            
            newPost.image = downloadUrl;
            console.log(newPost)
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
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
                onClick={()=> imageRef.current.click()}>
                    <UilScenery />
                    Photo
                </div>
                <div className="Option" style={{color: 'var(--video)'}}>
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
                    <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
                </div>
            </div>
            {image && (
                <div className="previewImage">
                    <UilTimes onClick={()=>{setImage(null)}}/>
                    <img src={URL.createObjectURL(image)} alt=""></img>
                </div>
            )}

        </div>
    </div>
  )
}

export default PostShare
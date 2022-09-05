import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { followUser, unFollowUser } from '../../actions/userAction';

const User = ({person}) => {
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.authReducer.authData)
    const [following, setFollowing] = useState(person.followers.includes(user._id))
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

    const handleFollow = () => {
        following ? 
        dispatch(unFollowUser(person._id, user)) :
        dispatch(followUser(person._id, user))

        setFollowing((prev)=> !prev)
    };

  return (
    <div className="Follower">
                    <div>
                        <img src={person.profilePicture?serverPublic + person.profilePicture: serverPublic + "defaultProfile.png"} alt="" className="FollowerImage" />
                        <div className="Name">
                            <span>{person.firstname} {person.lastname}</span>
                            <span>@{person.username}</span>
                        </div>
                    </div>
                    <button className={following?"Button fc-button UnfollowButton": "Button fc-button"} onClick={handleFollow}>{following?"Unfollow": "Follow"}</button>
                </div>
  )
}

export default User
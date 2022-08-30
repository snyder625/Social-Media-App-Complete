import React from 'react'
import './FollowersCard.css'
import {Followers} from '../../Data/FollowersData'

const FollowersCard = () => {
  return (
    <div className="FollowersCard">
        <h3>Who is following you</h3>
        
        {Followers.map((follower, id) => {
            return (
                <div className="Follower">
                    <div>
                        <img src={follower.img} className="FollowerImage" />
                        <div className="Name">
                            <span>{follower.name}</span>
                            <span>@{follower.username}</span>
                        </div>
                    </div>
                    <button className="Button fc-button">Follow</button>
                </div>
            )
        })}
    </div>
  )
}

export default FollowersCard
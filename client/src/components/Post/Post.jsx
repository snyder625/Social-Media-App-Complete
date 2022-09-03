import {useState, React} from 'react'
import './Post.css'
import {useSelector} from 'react-redux'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import {likePost} from '../../api/PostRequest'


const Post = ({data}) => {
  const {user} = useSelector((state)=>state.authReducer.authData)

  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)

  const handleLike = () => {
    console.log(data.likes.includes(user._id))
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
    console.log(data.likes.includes(user._id))
  };

  return (
    <div className="Post">
        <img src={data.image? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt=""/>

        <div className="PostReact">
            <img src={liked?Heart: NotLike} alt="" style={{cursor: "pointer"}} onClick={handleLike} />
            <img src={Comment} alt=""/>
            <img src={Share} alt=""/>
        </div>

        <span style={{color:'var(--gray)', fontSize:'16px'}}>{likes} Likes</span>

        <div className="Detail">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>
        </div>
    </div>
  )
}

export default Post
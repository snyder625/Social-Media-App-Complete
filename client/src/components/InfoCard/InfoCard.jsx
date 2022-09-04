import {useState, useEffect, React} from 'react'
import './InfoCard.css'
import {UilPen} from '@iconscout/react-unicons'
import ProfileModal from '../ProfileModal/ProfileModal'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import * as UserApi from '../../api/UserRequest.js'
import {logout} from '../../actions/AuthAction.js'

const InfoCard = () => {

    const [modalOpened, setModalOpened] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();

    const profileUserId = params.id
    const [profileUser, setProfileUser] = useState({});

    const {user} = useSelector((state)=>state.authReducer.authData)
    useEffect(()=> {
        const fetchProfileUser = async()=> {
            if(profileUserId === user._id) {
                setProfileUser(user)
            }
            else {
                const profileUser = await UserApi.getUser(profileUserId)
                setProfileUser(profileUser)
            }
        }
        fetchProfileUser();
    }, [user]);

    const handleLogout = () => {
        dispatch(logout());
    }

  return (
    <div className="InfoCard">
        <div className="InfoHead">
            <h4>Profile Info</h4>
            {user._id === profileUserId? (
                <div>
                <UilPen width='2rem' height='1.2rem' onClick={()=>{setModalOpened(true);}}/>
                <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} />
            </div>
            ): ""}
        </div>
        <div className="Info">
            <span><b>Status </b></span>
            <span>{profileUser.relationshipStatus}</span>
        </div>
        <div className="Info">
            <span><b>Lives in </b></span>
            <span>{profileUser.livesIn}</span>
        </div>
        <div className="Info">
            <span><b>Works at </b></span>
            <span>{profileUser.worksAt}</span>
        </div>

        <button className="Button l-button" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default InfoCard
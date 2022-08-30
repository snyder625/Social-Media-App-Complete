import {useState, React} from 'react'
import './InfoCard.css'
import {UilPen} from '@iconscout/react-unicons'
import ProfileModal from '../ProfileModal/ProfileModal'

const InfoCard = () => {

    const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="InfoCard">
        <div className="InfoHead">
            <h4>Your Info</h4>
            <div>
                <UilPen width='2rem' height='1.2rem' onClick={()=>{setModalOpened(true);}}/>
                <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
            </div>
        </div>
        <div className="Info">
            <span><b>Status</b></span>
            <span> in Relationship</span>
        </div>
        <div className="Info">
            <span><b>Lives in</b></span>
            <span> Karachi</span>
        </div>
        <div className="Info">
            <span><b>Works at</b></span>
            <span> Google Inc.</span>
        </div>

        <button className="Button l-button">Logout</button>
    </div>
  )
}

export default InfoCard
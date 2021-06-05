import Moment from "react-moment";
import {useState} from 'react'
import {useHistory} from 'react-router-dom'

function EventCard(props){
    const [show, setShow] = useState(false);
    const history = useHistory()
    const event = props.event

    const push = () => {
        history.push(`/event/${event._id}`)
    }

    return(
        <>
            <div className={'mainpage-event-card'} onMouseLeave={()=>setShow(false)} onMouseEnter={()=> setShow(true)}>
                <img src={event.image} height={'200'} alt={'no-image.jpg'} width={'220'}/>
                <b style={{fontSize: '18px'}}>{event.name}</b><br/>
                <b style={{fontSize: '14px'}}><Moment format={'MMMM D, HH:mm'}>{event.date_time}</Moment></b>
                {show && <div className={'mainpage-event-hover'}>
                    <div style={{color: 'white', fontSize: '20px', backgroundColor: '#00838F'}}>{event.artist}</div>
                    <br/>
                    <button onClick={push} className={'mainpage-event-button'}>More</button></div>}
            </div>
        </>
    )

}


export default EventCard
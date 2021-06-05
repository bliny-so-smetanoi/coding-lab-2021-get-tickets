
import Moment from "react-moment";

function EventPageInfoCard(props){
    const event = props.event

    return (
        <>
            <h1 align={'center'}> {event.name}</h1>
            <div className={'eventpage-main-body'}>
                <div>

                    <img className={'eventpage-image-card'} height={'400'} width={'400'} src={event.image}/>

                </div>
                <div className={'eventpage-event-card'}>
                    <div>
                        <p>Artist: <i>{event.artist}</i></p>
                    </div>
                    <div>
                        <p>Place: <i>{event.address}</i></p>
                    </div>
                    <div>
                        <p>Date and time: <i><Moment format={'HH:mm MMM D, YYYY'}>{event.date_time}</Moment></i></p>
                    </div>
                    <div className={'eventpage-info-desc'}>
                        <p>Description: <i>{event.description}</i></p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default EventPageInfoCard
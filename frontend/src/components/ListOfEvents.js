import EventCard from "./EventCard";

function ListOfEvents(props){
    const events = props.events
    const order = props.order
    if(order){
        const list = events.map((event)=>
            <div key={event._id}>
                <EventCard event={event}/>
            </div>
        )
        return(
            <>
                <div className={'mainpage-main-card'}>
                    {list}
                </div>
            </>
        )
    }
    else{
        const list = events.slice(0).reverse().map((event)=>
            <div key={event._id}>
                <EventCard event={event}/>
            </div>
        )
        return(
            <>
                <div className={'mainpage-main-card'}>
                    {list}
                </div>
            </>
        )
    }

}

export default ListOfEvents

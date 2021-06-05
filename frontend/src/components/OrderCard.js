import DetailCard from "./DetailCard";
import Moment from "react-moment";
import {useState, useEffect} from 'react'

function OrderCard(props){
    const [empty, setEmpty] = useState(false)

    const orders = props.orderInfo
    const listOrders = orders.map((info)=>
        <div className={'userinfopage-ticketcard'} key={info._id}>
            <div>
                <div style={{color: '#707070'}}>Concert information:</div>
                <div>Name of concert: <b style={{color: '#00838F', fontFamily: 'Montserrat, sans-serif'}}>{info.event}</b></div>
                <div>Place: <b style={{color: '#00838F', fontFamily: 'Montserrat, sans-serif'}}>{info.place}</b></div>
                <div>Date of concert: <b style={{color: '#00838F', fontFamily: 'Montserrat, sans-serif'}}><Moment format={'D MMM HH:mm'}>{info.event_time}</Moment></b></div>
                <div><b style={{fontSize: '12px'}}>Details: </b><DetailCard details={info.details}/></div>
            </div>
            <div>
                <div style={{color: '#707070'}}>Order information:</div>
                <div className={'userinfopage-order-detail'}>Receipt ID: {info._id}</div>
                <div className={'userinfopage-order-detail'}>Date of order: <Moment format={'HH:mm:ss DD/MM/YYYY'}>{info.date_time}</Moment></div>
                <br/>
                <div>Total price: {info.total_cost} KZT</div>
            </div>
        </div>
    )

    useEffect(()=>{
        if(orders.length === 0){
            setEmpty(true)
        }
        else{
            setEmpty(false)
        }
    }, [orders])

    return(
        <>
            <h3>Orders:</h3>
            <div className={'userinfopage-ordercard'}>
                {empty && <p style={{height: '200px'}}>Sorry, you have no orders yet . . .</p>}
                {listOrders}
            </div>
        </>
    )
}

export default OrderCard
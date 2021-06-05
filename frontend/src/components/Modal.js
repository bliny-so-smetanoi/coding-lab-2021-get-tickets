import React, {useEffect, useState, useContext} from "react";
import ReactCreditCards from "react-credit-cards";
import {AuthContext} from "../context/AuthContext";
import {Link, useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http-hook";
import LoaderTwo from "./LoaderTwo";
import NumberFormat from 'react-number-format'
import ReactTooltip from "react-tooltip";
import 'react-credit-cards/es/styles-compiled.css';

function Modal(props){
    const {id} = useParams()
    const {request, loading} = useHttp()
    const {event, eventSeats} = props.event
    const {userID} = useContext(AuthContext)

    const [next, setNext] = useState(false)
    const [payment, setPayment] = useState(false)

    const [totalCost, setTotal] = useState(0)
    const [seats, setSeat] = useState(eventSeats)
    const [orderedSeat, setOrder] = useState([])

    const [newOrder, setNewOrder] = useState({
        owner: userID,
        details: orderedSeat,
        event: event.name,
        event_time: event.date_time,
        place: event.address,
        total_cost: 0,
        date_time: Date.now()
    })

    const [form, setForm] = useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: ''
    })

    useEffect(()=>{
        setNewOrder({...newOrder, total_cost: totalCost})
    }, [totalCost])

    useEffect(()=>{
        setNewOrder({...newOrder, details: orderedSeat})
    }, [orderedSeat])


    if(props.show === false) return null

    function handleInputFocus(e){
        setForm({...form, focus: e.target.name})
    }

    function handleInputChange(e){
        setForm({...form, [e.target.name]: e.target.value})
    }

    function handleClick(seat){
        seat.quantity--
        setTotal(totalCost + seat.price)
        orderedSeat.push({sector: seat.sector, price: seat.price})
    }

    async function handleCancel(){
        try{
            const updated = await request(`/api/event/${id}`)
            setSeat(updated.eventSeats)
            setOrder([])
            setTotal(0)
        }catch(e){}
    }

    const allow = ((form.number.length >= 16 && form.cvc.length === 3) && (form.expiry.length >= 4 && form.name.length >= 2))

    const order = orderedSeat.map((order, index)=>{
        return <div className={'eventpage-modal-order-card'} key={index}>
            Sector: {order.sector}, Price: {order.price} KZT;
        </div>
    })

    const available = seats.map((seat)=>{
        return <button
            data-tip={''}
            data-for={seat._id}
            className={'eventpage-modal-seat-button'}
            disabled={orderedSeat.length >= 5 || seat.quantity <= 0}
            onClick={()=>handleClick(seat)}
            key={seat._id}>{seat.sector}, available tickets: {seat.quantity || 'sold out'}
            <ReactTooltip className={'eventpage-modal-tooltip'} type={'dark'} place={'left'} effect={'solid'} id={seat._id} getContent={()=>`Price: ${seat.price} KZT`}/>
        </button>
    })


    async function handlePayment(){
        try{
            setPayment(true)
            const data = await request('/api/event/create', 'POST', {
                newOrder,
                seats
            })

        }catch(e){}
    }

    return(
        <>
            <div className={'eventpage-modal'}>
                <div className={'eventpage-modal-content'}>

                    <button className={'eventpage-modal-close-button'} onClick={props.onShow}>X</button>

                    <h2 align={'center'}>{event.name}</h2>

                    {!next && <div className={'eventpage-modal-body'}>


                        <div className={'eventpage-modal-left'}>
                            {orderedSeat.length >= 5 && <div style={{color: 'darkred'}}><p>You can purchase only 5 ticket!</p></div>}
                            <div><i>Choose type: </i></div>
                            <div className={'eventpage-modal-seats'}>{available}{seats.length === 0 && <div style={{fontSize: '20px'}}>No ticket available yet!</div>}</div>
                        </div>
                        <div className={'eventpage-modal-right'}>
                            <div><i>Here you can see your selected tickets:</i></div>
                            <div align={'right'}>{loading && <span><i>Clearing . . . </i></span>}<button className={'eventpage-modal-clear-button'} onClick={handleCancel} disabled={orderedSeat.length === 0 || loading}>Clear order</button></div>
                            <p>Total cost: <b>{totalCost}</b> KZT</p>
                            <div>{order}</div>
                        </div>
                        <div/>
                        <button disabled={orderedSeat.length === 0 || loading} className={'eventpage-modal-buy-button'} onClick={()=>setNext(!next)}>Purchase</button>
                    </div>}

                    {(next && !payment)&& <div className={'eventpage-card'}>
                        <p>Please enter your card information below: </p>
                        <p>Total: <b>{newOrder.total_cost}</b> KZT</p>
                        <ReactCreditCards
                            cvc={form.cvc}
                            expiry={form.expiry}
                            focused={form.focus}
                            name={form.name}
                            number={form.number}
                        />
                        <form className={'eventpage-card-form'}>
                            <div className={'eventpage-card-body'}>
                                <NumberFormat displayType={'tel'} placeholder={'Credit card number'} onChange={handleInputChange} onFocus={handleInputFocus} name={'number'} format={'#### #### #### ####'} mask={'_'}/>
                                <input type={'text'} name={'name'} placeholder={'Card owner: e.g John Doe'} onChange={handleInputChange} onFocus={handleInputFocus}/>
                                <div className={'eventpage-card-input'}>
                                    <NumberFormat displayType={'tel'} name={'expiry'} onChange={handleInputChange} onFocus={handleInputFocus} format="##/##" placeholder="MM/YY" mask={['M', 'M', 'Y', 'Y']}/>
                                    <NumberFormat displayType={'tel'} name={'cvc'} onFocus={handleInputFocus} onChange={handleInputChange} placeholder={'CVC/CVV'} format={'###'}/>
                                </div>
                            </div>
                        </form>
                        <div className={'eventpage-card-buttons'} align={'center'}>
                            <button className={'eventpage-card-button'} onClick={()=>setNext(!next)}>Back</button>
                            <button className={'eventpage-card-purchase'} onClick={handlePayment} disabled={!allow}>Confirm</button>
                        </div>
                    </div>}
                    {payment && <div>
                        {loading && <div align={'center'}><LoaderTwo/><p>Payment proceeding. . .</p></div>}
                        {!loading && <div align={'center'} style={{color: 'darkgreen'}}>Thank you for purchasing, follow the link to see the ordered ticket <Link to={'/info'}>Link</Link></div>}
                    </div>}

                </div>
            </div>
        </>
    )
}


export default Modal
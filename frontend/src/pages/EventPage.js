import {Link, useParams} from "react-router-dom";
import {useState, useCallback, useEffect, useContext} from 'react'
import Navigation from "../components/Navigation";
import React from "react";
import {useHttp} from "../hooks/http-hook";
import Loader from "../components/Loader";
import {AuthContext} from "../context/AuthContext";
import EventPageInfoCard from "../components/EventPageInfoCard";
import Modal from "../components/Modal";
import {Helmet} from "react-helmet";

function EventPage(){
    const {id} = useParams()
    const [event, setEvent] = useState()
    const {loading, request} = useHttp()
    const {isAuth} = useContext(AuthContext)
    const [modal, setModal] = useState(false)

    const fetchEvent = useCallback(async () =>{
        try{
            const fetched = await request(`/api/event/${id}`)
            setEvent(fetched)
        }catch (e){}
    }, [request])

    useEffect(()=>{
        fetchEvent()
    }, [fetchEvent])


    return (
        <>
            <Navigation/>
            <div className={'eventpage-container'}>
                <div className={'eventpage-main'}>
                    {event !== undefined && <Helmet>
                        <title>{event.event.name}</title>
                    </Helmet>}

                    <Link style={{textDecoration: 'none', color: '#00838F'}} to={'/'}>&#9664;Back</Link>
                    {(loading || event === undefined)&& <div align={'center'}><Loader/></div>}
                    {event !== undefined && <EventPageInfoCard event={event.event}/>}

                    {!isAuth && <p align={'right'} style={{color: 'darkred'}}>In order to purchase, you have to sign in</p>}
                    <div className={'eventpage-mobile-buy'} align={'right'}><button onClick={()=>setModal(true)} disabled={!isAuth} className={'eventpage-purchase-button'}>Buy tickets</button></div>

                    {event !== undefined && <Modal event={event} show={modal} onShow={()=>setModal(false)}/>}

                </div>
            </div>
        </>
    )
}


export default EventPage
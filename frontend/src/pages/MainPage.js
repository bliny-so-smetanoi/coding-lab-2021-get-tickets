import Navigation from "../components/Navigation";
import React from "react";
import {useHttp} from "../hooks/http-hook";
import {useState, useEffect, useCallback} from 'react';
import ListOfEvents from "../components/ListOfEvents";
import LoaderTwo from "../components/LoaderTwo";
import {Helmet} from "react-helmet";

function MainPage(){
    const {loading, request} = useHttp()
    const [events, setEvents] = useState()
    const [order, setOrder] = useState(true)

    const [search, setSearch] = useState({
        search: ''
    })

    const fetchEvents = useCallback(async () =>{
        try{
            const fetched = await request('/api/event')
            setEvents(fetched)
        }catch(e){}
    }, [request])

    useEffect(()=>{
        searchEvent()
    }, [search])

    function handleChange(e){
        setSearch({...search, [e.target.name]: e.target.value})
    }

    const searchEvent = async ()=>{
        try{
            const data = await request('/api/event/search','POST',search,{})
            setEvents(data)
        }catch(e){}
    }

    useEffect(()=>{
        fetchEvents()
    }, [fetchEvents])

    return (
        <>
            <Navigation/>
            <Helmet>
                <title>Get Tickets ™</title>
            </Helmet>
            <div className={'mainpage-container'}>
                <div className="four" style={{marginTop: "20px", marginBottom: '20px'}}>
                    <div className="div1"/>
                    <div className="div2"/>
                    <div className="div3"/>
                    <div className="div4"/>
                </div>

            <main className={'mainpage-main'}>
                <input placeholder={'Search by artist:'} className={'mainpage-search-bar'} type={'text'} name={'search'} value={search.search} onChange={handleChange}/>

                <h1 align={'center'} style={{color: '#707070'}}>Available events:</h1>
                <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'flex-end', width: '100%'}}>
                {(events !== undefined && events.length !== 0) && <div style={{color: '#707070'}}>sort: <button className={'mainpage-sort-button'} onClick={()=>setOrder(!order)}>{order && 'Earliest'} {!order && 'Latest'} first</button></div>}
                </div>
                <br/>

                {(loading || events === undefined) && <div align={'center'}><LoaderTwo/></div>}

                {(events !== undefined && !loading) && <ListOfEvents order={order} events={events}/>}

                {((events !== undefined && events.length === 0) && !loading) && <div style={{fontSize: '20px'}}>Sorry, we couldn't find anything . . .</div>}
            </main>
            </div>
        </>
    )
}

export default MainPage
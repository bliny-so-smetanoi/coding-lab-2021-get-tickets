import Navigation from "../components/Navigation";
import React from "react";
import {Helmet} from "react-helmet";

function AboutPage(){

    return(
        <>
            <Helmet>
                <title>About</title>
            </Helmet>
            <Navigation/>
            <div className={'userinfopage-container'}>
                <div className={'userinfopage-body'}>
                <h1 style={{color: '#00838F'}} align={'center'}>Get Tickets</h1>
                    <p align={'center'}>This web-service was developed by Akezhan Issadilov.</p>
                    <p style={{height: '50vh', textAlign: 'center'}}>The aim of this project is presentation of MERN perception in web development.</p>
                </div>
            </div>
        </>
    )
}
export default AboutPage

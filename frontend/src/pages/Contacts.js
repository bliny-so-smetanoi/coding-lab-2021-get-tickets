import Navigation from "../components/Navigation";
import ContactForm from "../components/ContactForm";
import React from "react";
import {Helmet} from "react-helmet";

function ContactsPage(){
    return (
        <>
            <Helmet>
                <title>Contact</title>
            </Helmet>
            <Navigation/>
            <div className={'userinfopage-container'}>
                <div className={'userinfopage-body'}>
                    <article style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <h1>Contacts</h1>
                    <p>Akezhan Issadilov: <b style={{color: '#00838F'}}>akezhan.issadilov@gmail.com</b></p>
                    </article>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <ContactForm/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ContactsPage
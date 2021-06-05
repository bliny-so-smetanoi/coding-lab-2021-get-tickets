import {useHistory} from "react-router-dom";
function Footer(){
    const history = useHistory()

    return (
        <>
         <footer>
             <div className={'footer-container'}>
                 <div><a className={'footer-link'} href={'/about'} onClick={(e)=>{
                     e.preventDefault()
                     history.push('/about')
                 }}>About</a></div>
                 <div><a className={'footer-link'} href={'/contacts'} onClick={(e)=>{
                     e.preventDefault()
                     history.push('/contacts')
                 }}>Contacts</a></div>
             </div>
             <div>
                 <div align={'center'}>© Get Tickets™ All rights reserved</div><br/>
                 <div align={'center'} style={{fontSize: '12px'}}><b>Web-service for coding lab 2021 AITU</b><br/><b>Developed in Nur-Sultan, Almaty Qazaqstan</b></div>
             </div>
         </footer>
        </>
    )
}

export default Footer
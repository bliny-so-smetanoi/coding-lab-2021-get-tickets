import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {useContext, useState} from 'react'
import {Nav} from "react-bootstrap";


function Navigation(){
    const history = useHistory()
    const {isAuth, logout} = useContext(AuthContext)

    const [nav, setNav] = useState(false)

    function logoutHandler(){
        logout()
        history.push('/')
    }

    if(isAuth){
        return (
            <>
                <nav className={'navClass'}>
                    <NavLink to={'/about'} className={'navItemEdge'}>About</NavLink>
                    <NavLink to={'/contacts'} className={'navItem'}>Contacts</NavLink>
                    <div className={'navButtonsContainer'}>
                        <NavLink className={'navMainButton'} to={'/'}>Get Tickets™</NavLink>
                    </div>
                    <div className={'navButtonsContainerRight'}>
                    <button onClick={() => history.push('/info')} className={'navButtons'}>My account</button>
                    <button onClick={logoutHandler} className={'navButtons'}>Logout</button>
                    </div>
                </nav>

                <div className={'mobile-button'} onClick={()=>setNav(!nav)}><svg height="20pt" viewBox="0 -53 384 384" width="384pt" xmlns="http://www.w3.org/2000/svg"><path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/></svg></div>
                <div className={'mobile-nav'} style={{display: nav ? 'block': 'none'}}>
                    <div className={'mobile-nav-body'}>
                        <NavLink to={'/'} className={'mobile-nav-elem'}>Buy tickets</NavLink>
                        <NavLink to={'/about'} className={'mobile-nav-elem'}>About</NavLink>
                        <NavLink to={'/contacts'} className={'mobile-nav-elem'}>Contacts</NavLink>
                        <div className={'mobile-nav-button'}>
                            <button onClick={() => history.push('/info')} className={'navButtons'}>My account</button>
                            <button onClick={logoutHandler} className={'navButtons'}>Logout</button>
                         </div>
                    </div>
                </div>
                        </>
                )
    }
    else{
            return (
            <>
                <nav className={'navClass'}>
                    <NavLink to={'/about'} className={'navItemEdge'}>About</NavLink>
                    <NavLink to={'/contacts'} className={'navItem'}>Contacts</NavLink>
                    <div className={'navButtonsContainer'}>
                        <NavLink className={'navMainButton'} to={'/'}>Get Tickets™</NavLink>
                    </div>
                    <div className={'navButtonsContainerRight'}>
                        <button onClick={() => history.push('/login')} className={'navButtons'}>Sign in</button>
                    </div>
                </nav>
                <div className={'mobile-button'} onClick={()=>setNav(!nav)}><svg height="20pt" viewBox="0 -53 384 384" width="384pt" xmlns="http://www.w3.org/2000/svg"><path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/></svg></div>
                <div className={'mobile-nav'} style={{display: nav ? 'block': 'none'}}>
                    <div className={'mobile-nav-body'}>
                        <NavLink to={'/'} className={'mobile-nav-elem'}>Buy tickets</NavLink>
                        <NavLink to={'/about'} className={'mobile-nav-elem'}>About</NavLink>
                        <NavLink to={'/contacts'} className={'mobile-nav-elem'}>Contacts</NavLink>
                        <div className={'mobile-nav-button-is'}>
                            <button onClick={() => history.push('/login')} className={'navButtons'}>Log in</button>
                        </div>
                    </div>
                </div>
            </>
        )
        }
}

export default Navigation
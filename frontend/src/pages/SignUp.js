import {useHttp} from "../hooks/http-hook"
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {validate} from 'react-email-validator'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {Helmet} from "react-helmet";

function SignUpPage(){
    const {loading, request, error, clearError} = useHttp()

    const [emailClick, setEmailClick] = useState(false)
    const [passClick, setPassClick] = useState(false)
    const [nameClick, setNameClick] = useState(false)
    const [phoneClick, setPhoneClick] = useState(false)
    const [conPassClick, setConPassClick] = useState(false)

    const [confirmPassword, setConfirm] = useState('')
    const [serverWarning, setWarning] = useState('')
    const [success, setSuccess] = useState('')
    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    })

    useEffect(()=>{
        setWarning('')
    }, [form.email])

    useEffect(()=>{
        if(error === null){
            return
        }
        setWarning(error)
        clearError()
    }, [error, clearError])

    let style = {backgroundColor: 'rgba(45, 193, 90, 0.2)'}


    const emailClickHandle = () => setEmailClick(!emailClick)
    const passClickHandle = () => setPassClick(!passClick)
    const nameClickHandle = () => setNameClick(!nameClick)
    const phoneClickHandle = () => setPhoneClick(!phoneClick)
    const conPassClickHandle = () => setConPassClick(true)

    const valid = () => ((!validate(form.email) || form.password.length < 6) || (form.name.length < 1 || form.phone.length < 11)) || confirmPassword !== form.password

    async function registerHandler(){
        try{
            setWarning('')
            const data = await request('/api/auth/register', 'POST', {...form})
            setSuccess(data.message)
        }catch(e){}
    }

    function changeHandler(event){
        setForm({...form, [event.target.name]: event.target.value.trim()})
    }

    return (
        <>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
             <div className={'loginpage-card'}>

                 {!success && <div className={'loginpage-main'}>

            <Link to={'/'} className={'loginpage-back'}>&#9665;Back</Link>
            <div align={'center'} className={'loginpage-header'}>Sign Up</div>

            <div className={'signuppage-grid'}>
                <div style={{display: 'flex', alignItems: 'center'}}>Email: </div>
                <div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                <input style={validate(form.email) ? style : null} className={"signuppage-input"} onFocus={emailClickHandle} onBlur={emailClickHandle} placeholder={'example@email.com'} type={'email'} name={'email'} value={form.email} onChange={changeHandler}/>
                    {/*    {validate(form.email) && <span className="checkmark">*/}
                    {/*<div className="checkmark_circle"/>*/}
                    {/*<div className="checkmark_stem"/>*/}
                    {/*<div className="checkmark_kick"/>*/}
                    {/*</span>}*/}
                    </div>
                {(emailClick && !validate(form.email)) && <div style={{color: 'darkred', fontSize: '15px'}}>Email should be in the form "example@email.com"</div>}

                {serverWarning && <div style={{color: 'darkred', fontSize: '15px'}}>{serverWarning}</div>}
            </div>
                <div style={{display: 'flex', alignItems: 'center'}}>Name: </div>
            <div>
                <input style={form.name.length >= 1 ? style : null} className={'signuppage-input'} onFocus={nameClickHandle} onBlur={nameClickHandle} placeholder={'e.g. Alua'} type={'text'} name={'name'} value={form.name} onChange={changeHandler}/>
                {/*{form.name.length >= 1 && <span className="checkmark">*/}
                {/*    <div className="checkmark_circle"/>*/}
                {/*    <div className="checkmark_stem"/>*/}
                {/*    <div className="checkmark_kick"/>*/}
                {/*    </span>}*/}

                {(nameClick && form.name.length < 1) && <div style={{color: 'darkred', fontSize: '15px'}}>Name field must not be empty</div>}

            </div>
                <div style={{display: 'flex', alignItems: 'center'}}>Password: </div>
            <div>
                <input style={form.password.length >= 6 ? style : null} className={'signuppage-input'} onFocus={passClickHandle} onBlur={passClickHandle} placeholder={'******'} type={'password'} name={'password'} value={form.password} onChange={changeHandler}/>
                {/*{form.password.length >= 6 && <span className="checkmark">*/}
                {/*    <div className="checkmark_circle"/>*/}
                {/*    <div className="checkmark_stem"/>*/}
                {/*    <div className="checkmark_kick"/>*/}
                {/*    </span>}*/}

                {(passClick && form.password.length < 6) && <div style={{color: 'darkred', fontSize: '15px'}}>Password should contain at least 6 characters</div>}

            </div>
                <div style={{display: 'flex', alignItems: 'center', whiteSpace: 'nowrap'}}>Confirm password: </div>
            <div>
                <input style={(form.password.length >= 6 && form.password === confirmPassword) ? style : null} className={'signuppage-input'} onClick={conPassClickHandle} placeholder={'******'} type={'password'} name={'confirmpassword'} value={confirmPassword} onChange={(e)=> setConfirm(e.target.value.trim())}/>
                {/*{(form.password.length >= 6 && form.password === confirmPassword) && <span className="checkmark">*/}
                {/*    <div className="checkmark_circle"/>*/}
                {/*    <div className="checkmark_stem"/>*/}
                {/*    <div className="checkmark_kick"/>*/}
                {/*    </span>}*/}

                {(conPassClick && form.password !== confirmPassword) && <div style={{color: 'darkred', fontSize: '15px'}}>Passwords are not the same</div>}

            </div>
                <div style={{display: 'flex', alignItems: 'center'}}>Phone number: </div>
            <div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                <PhoneInput containerStyle={{borderRadius: '20px'}} buttonStyle={{borderRadius: '20px'}} dropdownStyle={{borderRadius: '20px'}} inputStyle={{backgroundColor: form.phone.length >=11 ? 'rgba(45, 193, 90, 0.2)' : null,borderRadius: '20px', width:'296px'}} inputClass={'signuppage-input'} onFocus={phoneClickHandle} onBlur={phoneClickHandle} onlyCountries={['kz']} country={'kz'} value={form.phone} placeholder={'+7 XXX XXX-XX-XX'} onChange={(phone)=>{setForm({...form, phone})}}/>
                {/*{form.phone.length >=11 && <span className="checkmark">*/}
                {/*    <div className="checkmark_circle"/>*/}
                {/*    <div className="checkmark_stem"/>*/}
                {/*    <div className="checkmark_kick"/>*/}
                {/*    </span>}*/}
                </div>
                {(phoneClick && form.phone.length < 11) && <div style={{color: 'darkred', fontSize: '15px'}}>Phone number should be in the format +7 XXX XXX-XX-XX</div>}

            </div>
            </div>
                    <div align={'center'} style={{padding: '10px'}}>
                        <br/>

                        {loading &&  <div>Loading...</div>}

                    <button className={'signuppage-button'} onClick={registerHandler} disabled={valid() || loading}>Register</button>
                    </div>

                </div>}
                 {success && <div className={'signuppage-success'}><div><b>You have been successfully signed up to our web-service! Follow the link in order to login!</b></div> <br/> <div align={'center'}><Link to={'/login'} style={{color: 'white'}}>Login</Link></div></div>}
            </div>
        </>
    )
}


export default SignUpPage
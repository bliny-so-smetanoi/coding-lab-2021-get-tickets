import {AuthContext} from "../context/AuthContext";
import {useContext, useState, useEffect} from "react";
import {useHttp} from "../hooks/http-hook";
import {useHistory, Link} from 'react-router-dom'
import {Helmet} from "react-helmet";

function LoginPage(){
    const history = useHistory()
    const auth = useContext(AuthContext)

    const [warning, setWarning] = useState(true)
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    useEffect(()=>{
        if(error === null){
            return
        }
        setWarning(false)
        clearError()
    },[error, clearError])

    async function loginHandler(){
        try{
            if(form.password === '' || form.email === ''){
                return
            }
            setWarning(true)
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userID)
            history.push('/info')
        }catch(e){}
    }

    function changeHandler(event){
        setForm({...form, [event.target.name]: event.target.value.trim()})
    }

    return (
        <>
            <div className={'loginpage-card'}>
                <Helmet>
                    <title>Log in</title>
                </Helmet>

                <div className={'loginpage-main'}>
                    <Link to={'/'} className={'loginpage-back'}>&#9665;Back</Link>
                    <div align={'center'} className={'loginpage-header'}>Log in</div>
                    <div className={'loginpage-grid'}>
                    <div align={'center'}>
                        <input className={'loginpage-input'} placeholder={'Email'} type={'text'} name={'email'} value={form.email} onChange={changeHandler}/>
                    </div>
                    <div align={'center'}>
                        <input className={'loginpage-input'} placeholder={'Password'} type={'password'} name={'password'} value={form.password} onChange={changeHandler}/>

                        {!warning && <div style={{color: 'darkred', fontSize: '17px'}}>Invalid email or password!</div>}

                        {loading && <div>Loading...</div>}

                    </div>
                        <div align={'center'} style={{fontSize: '13px'}}>Do not have account yet? <Link to={'/register'} style={{color: 'white'}}>Sign up now</Link></div>
                        <div align={'center'}>

                        <button onClick={loginHandler} className={'loginpage-button'} disabled={loading}>Login</button>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default LoginPage
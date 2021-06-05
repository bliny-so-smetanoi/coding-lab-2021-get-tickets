import {useState} from 'react'
import {useHttp} from "../hooks/http-hook"

function ContactForm(){
    const [form, setForm] = useState({
        name: '',
        text: ''
    })
    const {request} = useHttp()

    async function handleClick(){
        if(form.name === '' || form.text === '') return
        try{
            const data = await request('api/userdata/feedback', 'POST', form)
            alert(data.message)
        }
        catch (e){}

    }

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
    }


    return (
        <>

            <div className={'contactform-container'}>
                <div className={'contactform-head'}>
                <div>
                    <input placeholder={'Your first name'} name={'name'} onChange={handleChange} className={'contactform-input'}/>
                </div>
                    <div>
                        <button onClick={handleClick} className={'contactform-send-button'}>Send</button>
                    </div>

                </div>
                <div>
                    <textarea name={'text'} onChange={handleChange} placeholder={'Your feedback or suggestions. . .'} className={'contactform-text'}/>
                </div>

            </div>

        </>

    )

}

export default ContactForm
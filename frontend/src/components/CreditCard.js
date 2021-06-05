

function CreditCard(props){
    const [form, setForm] = useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: ''
    })

    if(props.show === false) return null

    function handleInputFocus(e){
        setForm({...form, focus: e.target.name})
    }

    function handleInputChange(e){
        setForm({...form, [e.target.name]: e.target.value})
    }

    return(
        <>
            <div className={'eventpage-card'}>
            <ReactCreditCards
                cvc={form.cvc}
                expiry={form.expiry}
                focused={form.focus}
                name={form.name}
                number={form.number}
            />
            <form>
                <div className={'eventpage-card-body'}>
                <input type={'tel'} name={'number'} placeholder={'Credit Card number'} onChange={handleInputChange} onFocus={handleInputFocus}/>
                <input type={'tel'} name={'expiry'} placeholder={'Valid thru: e.g 12/23'} onChange={handleInputChange} onFocus={handleInputFocus}/>
                <div className={'eventpage-card-input'}>
                <input type={'text'} name={'name'} placeholder={'Card owner: e.g John Doe'} onChange={handleInputChange} onFocus={handleInputFocus}/>
                <input type={'tel'} name={'cvc'} placeholder={'CVC/CVV'} onChange={handleInputChange} onFocus={handleInputFocus}/>
                </div>
                </div>
            </form>
            </div>
            <div align={'center'}>
            <button>Purchase</button>
            <button>Back</button>
            </div>
        </>
    )
}

export default CreditCard
function UserCard(props){
    const phone = props.userInfo.phone
    const email = props.userInfo.email

    return(
        <>
            <h3>Customer's personal information:</h3>
            <div className={'userinfopage-usercard'}>
                <div style={{whiteSpace: 'nowrap'}}>Phone number:</div>
            <div style={{fontFamily: 'Montserrat, sans-serif'}}>+{phone}</div>
                <div>Email:</div>
            <div style={{fontFamily: 'Montserrat, sans-serif'}}>{email}</div>
            </div>
        </>
    )
}

export default UserCard
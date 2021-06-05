import {useState} from 'react'

function DetailCard(props){
    const [show, setShow] = useState(false)

    const details = props.details
    const listDetails = details.map((detail)=>
        <tr key={detail._id}>
            <td><b style={{fontFamily: 'Montserrat, sans-serif'}}>{detail.sector}</b></td>
            <td><b style={{fontFamily: 'Montserrat, sans-serif'}}>{detail.price}</b> KZT</td>
        </tr>
)

    return (
        <>
            <button className={'userinfopage-detail-button'} onClick={()=>show ? setShow(false) : setShow(true)}>{!show && <b>&#9656;</b>} {show && <b>&#9662;</b>}</button>
            {show && <table style={{paddingLeft: '20px'}}>
                    <th style={{borderBottom: '1px solid black'}}>Sector name</th>
                    <th style={{borderBottom: '1px solid black'}}>Price for sector</th>
                    {listDetails}
                </table>}
        </>
    )
}

export default DetailCard
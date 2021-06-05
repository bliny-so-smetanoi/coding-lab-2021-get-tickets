import Navigation from "../components/Navigation";
import {useState, useCallback, useContext, useEffect} from "react";
import {useHttp} from "../hooks/http-hook";
import {AuthContext} from "../context/AuthContext";
import UserCard from "../components/UserCard";
import OrderCard from "../components/OrderCard";
import Loader from "../components/Loader";
import {Helmet} from "react-helmet";

function UserInfoPage(){
    const {loading, request} = useHttp()
    const {token, isAuth} = useContext(AuthContext)
    const [orders, setOrders] = useState(null)

    const fetchOrders = useCallback(async ()=>{
        try{
            const fetched = await request('/api/userdata', 'GET', null, {
                'Content-Type': 'application/json',
                Authorization: `Basic ${token}`
            })
            setOrders(fetched)
        }catch (e){}
    }, [token, request])


    useEffect(()=>{
        fetchOrders()
    }, [fetchOrders])

    return (
        <>
            <Navigation/>
            <Helmet>
                <title>
                    My account
                </title>
            </Helmet>
            <div className={'userinfopage-container'}>
                <div className={'userinfopage-body'}>
                    {((loading || orders === null) && isAuth) && <div align={'center'} style={{height: '500px'}}><Loader/></div>}
                    {!isAuth && <div style={{fontSize: '40px', color: 'darkred', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Error 401 (No authorization)</div>}
                    {(isAuth && orders !== null) && <h1 align={'center'} style={{color: '#707070'}}>Hello, {orders.userInfo.name}!</h1>}
                    <div className={'userinfopage-main'}>
                    {orders !== null && <UserCard userInfo={orders.userInfo}/>}
                    {orders !== null && <OrderCard orderInfo={orders.orderInfo}/>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserInfoPage

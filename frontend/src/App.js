import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import AboutPage from "./pages/About";
import ContactsPage from "./pages/Contacts";
import EventPage from "./pages/EventPage";
import LoginPage from "./pages/Login";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUp";
import UserInfoPage from "./pages/UserInfo";
import Footer from "./components/Footer";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth-hook";


function App() {
    const {token, login, logout, userID} = useAuth()
    const isAuth = !!token

  return (
      <>
          <AuthContext.Provider value={{
              token, login, logout, userID, isAuth
          }}>
        <BrowserRouter>
            <Switch>
                <Route path={'/'} exact>
                    <MainPage/>
                </Route>
                <Route path={'/about'} exact>
                    <AboutPage/>
                </Route>
                <Route path={'/contacts'} exact>
                    <ContactsPage/>
                </Route>
                <Route path={'/info'} exact>
                    <UserInfoPage/>
                </Route>

                <Route path={'/login'} exact>
                    <LoginPage/>
                </Route>
                <Route path={'/register'} exact>
                    <SignUpPage/>
                </Route>
                <Route path={'/event/:id'}>
                    <EventPage/>
                </Route>
                <Redirect to={'/'}/>
            </Switch>
            <Footer/>
        </BrowserRouter>
          </AuthContext.Provider>

      </>
  )
}

export default App

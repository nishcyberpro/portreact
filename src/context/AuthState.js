import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {

    const [token, setToken] = useState(localStorage.getItem('access_token'))
    const [state, setState] = useState()


    useEffect(() => {
        setToken(localStorage.getItem('access_token'))
        console.log(token)
        if (token) {
            console.log("in login")
            setState({ isloggedIn: true })

        }
        else {
            console.log("in logout")

            setState({ isloggedIn: false })
        }


    }, [])



    const logOut = () => {
        setState({ isloggedIn: false })
    }
    const logIn = () => {
        setState({ isloggedIn: true })
    }


    return (
        <AuthContext.Provider value={{ state, logOut, logIn }} >
            {props.children}
        </AuthContext.Provider >
    )

}


export default AuthState;
import React from "react"
import axios from "axios"
import { base_url } from "../Config.js";
 
export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            message: "",
            logged: true
        }

        


    }
    render(){
        return(
            <h1>Ini Halaman Login</h1>
        )
    }
}

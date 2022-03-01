import React from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { base_url } from "../Config.js"
 
export default class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            // token: "",
            adminName: null,
            productsCount: 0,
            customersCount: 0,
            transactionsCount: 0,
            adminsCount: 0
        }
        // if (localStorage.getItem("token")) {
        //     this.state.token = localStorage.getItem("token")
        // } else {
        //     window.location = "/login"
        // }
        // headerConfig = () => {
        //     let header = {
        //         headers: { Authorization: `Bearer ${this.state.token}` }
        //     }
        //     return header
        // }
    
    }

    
    render(){
        return(
            <div>
                <Navbar />
                <h1>Ini Admin Site</h1>
            </div>
        )
    }
}

import React from "react"
import Navbar from "../components/Navbar"
 
export default class Admin extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <Navbar />
                <h1>Ini Halaman Admin</h1>
            </div>
        )
    }
}

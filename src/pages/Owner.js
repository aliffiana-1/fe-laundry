import React from "react"
import Navbar from "../components/Navbar"
 
export default class Owner extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <Navbar />
                <h1>Ini Halaman Owner</h1>
            </div>
        )
    }
}

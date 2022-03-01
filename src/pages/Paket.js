import React from "react"
import Navbar from "../components/Navbar"
import PaketList from "../components/PaketList"
import { base_url } from "../Config.js";
import $ from "jquery"
import axios from "axios" 

export default class Paket extends React.Component{
    constructor(){
        super()
        this.state = {
            
        }
    }
    render(){
        return(
            <div>
                <Navbar />
                <h1>Ini Halaman Paket</h1>
            </div>
        )
    }
}

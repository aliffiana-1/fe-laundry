import React from "react"
import Navbar from "../components/Navbar"
import { base_url } from "../Config" 
import axios from "axios"
import TransaksiList from "../components/TransaksiList"

export default class Transaksi extends React.Component{
    constructor(){
        super()
        this.state = {
            transaction: [],
            selectedItem: null
        }
        
 

    }
    render(){
        return(
            <div>
                <Navbar />
                <h1>Ini Halaman Transaksi</h1>
            </div>
        )
    }
}

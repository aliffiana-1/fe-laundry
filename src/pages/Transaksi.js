import React from "react"
import Navbar from "../components/Navbar"
import { base_url, authorization } from "../Config" 
import axios from "axios"
import TransaksiList from "../components/TransaksiList"

export default class Transaksi extends React.Component{
    constructor(){
        super()
        this.state = {
            token   : "",
            transaksi: [],
            selectedItem: null
        }

        // if (localStorage.getItem("token")) {
        //     this.state.token = localStorage.getItem("token")
        // } else {
        //     window.location = "/transaksi"
        // }

    }

    // headerConfig = () => {
    //     let header = {
    //         headers: { Authorization: `Bearer ${this.state.token}` }
    //     }
    //     return header
    // }

    // getTransaction = () => {
    //     let url = base_url + "/transaksi"
 
    //     axios.get(url, this.headerConfig())
    //     .then(response => {
    //         this.setState({transaction: response.data})
    //     })
    //     .catch(error => {
    //         if (error.response) {
    //             if(error.response.status) {
    //                 window.alert(error.response.data.message)
    //                 this.props.history.push("/login")
    //             }
    //         }else{
    //             console.log(error);
    //         }
    //     })
    // }

    // componentDidMount(){
    //     this.getTransaction()
    // }


    render(){
        return(
            <div>
                <Navbar />
                <div className="card">
                    <div className="container">
                        <h4 className="text-bold text-info mt-2">List Transaksi</h4>
                    </div>    
                

                    <div className="card-body">
                        <ul className="list-group">

                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

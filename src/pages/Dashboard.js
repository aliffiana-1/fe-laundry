import React from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { base_url } from "../Config.js"
 
export default class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            // token: "",
            adminName: '',
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
                <div className="container mt-2">
                    <h3 className="my-2">
                        <strong>Welcome back, Alip {this.state.adminName}</strong>
                    </h3>
                    <div className="row">
                        {/* products count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-success">
                                    <h4 className="text-dark">
                                        <strong>Transactions Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.productsCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
 
                        
                    </div>
                </div>
            </div>
        )
    }

        
    
}

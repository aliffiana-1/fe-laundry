import React from "react"
import axios from "axios"
import { base_url } from "../../Config.js"
import NavbarOwner from "../../components/NavbarOwner"
import Navbar from "../../components/Navbar"

export default class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            // token: "",
            nama: '',
            petugas: [],
            productsCount: 0,
            customersCount: 0,
            dataTransaksi: 0,
            dataPaket: 0
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
    getTransaksi = () => {
        let url = base_url + "/transaksi"
        axios.get(url)
        .then(response=> {
            this.setState({dataTransaksi: response.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    // this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    getPaket = () => {
        let url = base_url + "/paket"
        axios.get(url)
        .then(response=> {
            this.setState({dataPaket: response.data.length})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    // this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    componentDidMount() {
        this.getTransaksi()
        this.getPaket()
    }

    
    render(){
        return(
            <div>
                <NavbarOwner />
                <div className="container mt-2">
                    <h3 className="my-2">
                        <strong>Welcome back</strong>
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
                                        <strong>{this.state.dataTransaksi}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* paket counts */}
                        {/* <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-warning">
                                    <h4 className="text-dark">
                                        <strong>Pakets Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.dataPaket}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div> */}

 
                        
                    </div>
                </div>
            </div>
        )
    }

        
    
}

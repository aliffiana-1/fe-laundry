import React from "react"
import Navbar from "../components/Navbar"
import Swal from "sweetalert2"
import axios from "axios"
import { base_url } from "../Config"
import NavbarLogged from "../components/NavbarLogged"
 
export default class LoginOwner extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            message: "",
            logged: true,
            role: ""
        }
    }

    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password
        }
 
        let url = base_url + "/petugas/login"
        
 
        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged) {
                let owner = response.data.data
                let token = response.data.token
                let role = owner.role
                localStorage.setItem("owner", JSON.stringify(owner))
                localStorage.setItem("token", token)
                localStorage.setItem("role", role)
                
                
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    // timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                  })

                  this.props.history.push("/OwnerDashboard")
                  
                  
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Try Again',
                    text: 'Invalid username or password!',
                  })
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div>
                <NavbarLogged />
                <div className="container d-flex h-100 justify-content-center align-items-center">
                    <div className="col-sm-5 card my-5">
                        <div className="card-header bg-primary text-white text-center">
                            <h4>Laundry.in</h4>
                            <strong className="text-warning">Owner Sign In</strong>
                        </div>
                        <div className="card-body">
                            
                            <form onSubmit={ev => this.Login(ev)}>
                            Username
                                <input type="text" className="form-control mb-1" value={this.state.username}
                                onChange={ev => this.setState({username: ev.target.value})} />
                                Password
                                <input type="password" className="form-control mb-2" value={this.state.password}
                                onChange={ev => this.setState({password: ev.target.value})}
                                autoComplete="false" />
    
                                <button className="btn btn-block btn-primary mb-1" type="submit">
                                    Sign In
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
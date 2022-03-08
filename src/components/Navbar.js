import React from "react"
import {Link} from "react-router-dom"

export default class Navbar extends React.Component{
    
    
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        window.location = "/login"
    }

    
    render(){
        return(
            <div className="navbar navbar-expand-lg bg-dark navbar-dark">
                <a className="navbar-brand"> 
                &nbsp; <b>Laundry.in</b>
                </a>

            {/* show and hide menu */}
            <button className="navbar-toggler " data-toggle="collapse "
            data-target="#menu">
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* menu */}
            <div id="menu" className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto"> 
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                           Dashboard 
                        </Link>
                    </li>

                  
                    <li className="nav-item">
                        <Link to="/transaksi" className="nav-link">
                            Transaksi
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" onClick={() => this.Logout()}>
                            <b>Logout</b>
                        </Link>
                    </li>
                </ul>

            </div>

            </div>
        )
    }
}
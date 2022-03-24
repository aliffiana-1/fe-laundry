import React from "react"
import {Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
// import "js/jquery-1.11.2.min.js"

export default class NavbarLogged extends React.Component{
    
    
    // Logout = () => {
    //     localStorage.removeItem("token")
    //     localStorage.removeItem("admin")
    //     window.location = "/login"
    // }

    
    render(){
        
        return(
            <div>
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
                    

                    <CDropdown className="d-flex">
                        <CDropdownToggle color="dark">Logged As</CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem href="/loginOwner">Owner</CDropdownItem>
                                <CDropdownItem href="/loginAdmin">Admin</CDropdownItem>
                            </CDropdownMenu>
                    </CDropdown>
                    
                    <li className="nav-item my-2 my-sm-0">
                        <Link to="/loggedAs" className="nav-link">
                            <b>Cek Resi</b>
                        </Link>
                    </li>
                    

                                        
                </ul>

            </div>

            </div>
            </div>
        )
    }
}
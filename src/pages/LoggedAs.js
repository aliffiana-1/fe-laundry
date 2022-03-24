import React from "react"
import NavbarLogged from "../components/NavbarLogged"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import axios from "axios"
import { base_url } from "../Config"

export default class LoggedAs extends React.Component{
    constructor(){
        super()
        this.state = {
            transaksi: [],
            resi: "",

        }  
    }

    findResi = (event) => {
        let url = base_url + '/transaksi/cekresi'
        if (event.keyCode === 99) {
        //   menampung data keyword pencarian
          let form = {
            find: this.state.resi
          }
          // mengakses api untuk mengambil data pegawai
          // berdasarkan keyword
          axios.post(url, form)
          .then(response => {
            // mengisikan data dari respon API ke array pegawai
            this.setState({transaksi: response.data.transaksi});
          })
          .catch(error => {
            console.log(error);
          });
        }
    }
    
    render(){
        return(
            <div >
                <NavbarLogged />
                <div className="container d-flex h-100 justify-content-center align-items-center">
                <div className="col-sm-5 card my-5">
                    <div className="card-header bg-secondary text-white text-center">
                        <h4>Laundry.in</h4>
                        <strong className="text-white">RESI</strong>
                    </div>
                    <div className="card-body">
                        
                        <form onSubmit={ev => this.findResi(ev)}>
                        Masukan Resi
                            <input type="text" className="form-control mb-1"  />
                        
 
                            <button className="btn btn-block btn-secondary mb-1" type="submit">
                                Find RESI
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

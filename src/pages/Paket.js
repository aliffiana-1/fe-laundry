import React from "react"
import Navbar from "../components/Navbar"
import PaketList from "../components/PetugasList"
import { authorization, base_url } from "../Config.js";
import $ from "jquery"
import axios from "axios" 
import {Modal} from "bootstrap"
import Swal from "sweetalert2";


export default class Paket extends React.Component{
    constructor(){
        super()
        this.state = {
            paket: [],
            id_paket: "",
            jenis: "",
            harga: "",
            action: "",
            visible: true
        }
    }

    tambahPaket() {
        this.modalPaket = new Modal(document.getElementById('modal-paket'))
        this.modalPaket.show()

        this.setState({
            jenis: "",
            harga: "",
            action: "tambah"
        })
    }

    simpanPaket(event) {
        event.preventDefault()

        this.modalPaket.hide()

        if(this.state.action === "tambah") {
            let endpoint = base_url + '/paket'
            let body = new FormData()
            body.append("jenis", this.state.jenis)
            body.append("harga", this.state.harga)
            let newPaket = {
                jenis: this.state.jenis,
                harga: this.state.harga

            }
            // console.log(newPaket);

            axios.post(endpoint, newPaket, authorization)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))
        
        } else if (this.state.action === 'ubah') {
            let endpoint = base_url + '/paket/'
            let body = new FormData()
            body.append("jenis", this.state.jenis)
            body.append("harga", this.state.harga)
            let newPaket = {
                id_paket: this.state.id_paket,
                jenis: this.state.jenis,
                harga: this.state.harga
            }

            axios.put(endpoint, newPaket, authorization)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))

            this.modalPaket.hide()
        }

    }

    ubahPaket(id_paket) {
        this.modalPaket = new Modal(document.getElementById("modal-paket")) // this "modal-paket"
        this.modalPaket.show() //Menampilkan modal paket

        //mencari index posisi dari data paket yg akan diubah
        let index = this.state.paket.findIndex(
            paket => paket.id_paket === id_paket
        )

        this.setState({
            action: "ubah",
            id_paket: this.state.paket[index].id_paket,
            jenis: this.state.paket[index].jenis,
            harga: this.state.paket[index].harga,
        })
    }

    hapusPaket(id_paket) {
        if (window.confirm('Apakah anda yakin ingin menghapus data ini ?')) {

            let endpoint = base_url + '/paket/' + id_paket

            axios.delete(endpoint, authorization)
                .then(response => {
                   
                    
                      
                    this.getData()
                })
                .catch(error => console.log(error))

        }
    }

    getData() {
        let endpoint = base_url + '/paket'
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ paket: response.data })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        // fungsi ini di jalankan setelah fungsi render berjalan
        this.getData()
        let petugas = JSON.parse(localStorage.getItem("petugas"))
        //Cara Pertama
        this.setState({
            role: petugas.role
        })

        // Cara kedua
        if (petugas.role === 'petugas') {
            this.setState({
                visible: true
            })
        } else (
            this.setState({
                visible: false
            })
        )
    }

    showAddButton() {
        if (this.state.role === 'petugas') {
            return (
                <button type='button' className='btn btn-secondary'
                    onClick={() => this.tambahPaket()}>
                    Tambah
                </button>
            )
        }
    }


    render(){
        return(
            
            <div>
                <Navbar />
                <div className="card">
                <div className="container">
                        <h4 className="text-bold text-info mt-2">List Daftar Paket</h4>
                    </div>

                <div className="card-body">

                    <div className="col-lg-3">
                        {this.showAddButton()}
                    </div>
                    

                    <ul className="list-group">
                        {this.state.paket.map(paket => (
                            <li className="list-group-item">
                                <div className="row">

                                    {/** BAGIAN JENIS PAKET */}
                                    <div className="col-lg-5">
                                        <small className="text-info">Paket</small> <br />
                                        {paket.jenis}
                                    </div>

                                    {/** BAGIAN HARGA PAKET */}
                                    <div className="col-lg-4">
                                        <small className="text-info">Harga</small> <br />
                                        {paket.harga}
                                    </div>

                                    {/**BUTTON */}
                                    {/* <button className="btn btn-sm col-sm-1 btn-success mx-1"
                                        onClick={() => this.ubahPaket(paket.id_paket)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-sm col-sm-1 btn-danger mx-1"
                                        onClick={() => this.hapusPaket(paket.id_paket)}>
                                        Delete
                                    </button> */}

                                    <button className={`btn btn-sm col-sm-1 btn-primary m-1 ${this.state.visible ? `` : `d-none`}`}
                                        onClick={() => this.ubahPaket(paket.id_paket)}>
                                        Edit
                                    </button>

                                    <button small className={`btn btn-sm col-sm-1 btn-danger m-1 ${this.state.visible ? `` : `d-none`}`}
                                        onClick={() => this.hapusPaket(paket.id_paket)}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))} <br />


                    </ul>

                    {/** FORM MODAL PAKET */}
                    <div className="modal" id="modal-paket">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header bg-success">
                                    <h4 className="text-white">
                                        Form Paket
                                    </h4>
                                </div>

                                <div className="modal-body">
                                    <form onSubmit={ev => this.simpanPaket(ev)}>
                                        Jenis Paket
                                        <input type="text" className="form-control mb-2"
                                            value={this.state.jenis}
                                            onChange={ev => this.setState({ jenis: ev.target.value })}
                                            required
                                        />

                                        Harga
                                        <input type='text' className="form-control mb-2"
                                            value={this.state.harga}
                                            onChange={ev => this.setState({ harga: ev.target.value })}
                                            required
                                        />

                                        <button className="btn btn-success btn-sm" type="submit">
                                            Save
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

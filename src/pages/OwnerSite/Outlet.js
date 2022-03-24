import React from "react"
import Navbar from "../../components/Navbar"
import { authorization, base_url } from "../../Config.js";
import $ from "jquery"
import axios from "axios"
import { Modal } from "bootstrap"
import Swal from "sweetalert2";
import NavbarOwner from "../../components/NavbarOwner";


export default class Outlet extends React.Component {
    constructor() {
        super()
        this.state = {
            outlet: [],
            id_outlet: "",
            id_petugas: "",
            nama_outlet: "",
            alamat: "",
            action: "",
            visible: true
        }
    }

    tambahOutlet() {
        this.modalOutlet = new Modal(document.getElementById('modal-outlet'))
        this.modalOutlet.show()

        this.setState({
            id_petugas: "",
            nama_outlet: "",
            alamat: "",
            action: "tambah"
        })
    }

    simpanOutlet(event) {
        event.preventDefault()

        this.modalOutlet.hide()

        if (this.state.action === "tambah") {
            let endpoint = base_url + '/outlet'
            let body = new FormData()
            body.append("id_outlet", this.state.id_outlet)
            body.append("id_petugas", this.state.id_petugas)
            body.append("nama_outlet", this.state.nama_outlet)
            body.append("alamat", this.state.alamat)
            let newOutlet = {
                id_outlet: this.state.id_outlet,
                id_petugas: this.state.id_petugas,
                nama_outlet: this.state.nama_outlet,
                alamat: this.state.alamat
            }
            // console.log(newOutlet);

            axios.post(endpoint, newOutlet, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

        } else if (this.state.action === 'ubah') {
            let endpoint = base_url + '/outlet'
            let body = new FormData()
            body.append("id_outlet", this.state.id_outlet)
            body.append("id_petugas", this.state.id_petugas)
            body.append("nama_outlet", this.state.nama_outlet)
            body.append("alamat", this.state.alamat)
            let newOutlet = {
                id_outlet: this.state.id_outlet,
                id_petugas: this.state.id_petugas,
                nama_outlet: this.state.nama_outlet,
                alamat: this.state.alamat,
            }

            axios.put(endpoint, newOutlet, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

            this.modalOutlet.hide()
        }

    }

    ubahOutlet(id_outlet) {
        this.modalOutlet = new Modal(document.getElementById("modal-outlet")) // this "modal-outlet"
        this.modalOutlet.show() //Menampilkan modal outlet

        //mencari index posisi dari data outlet yg akan diubah
        let index = this.state.outlet.findIndex(
            outlet => outlet.id_outlet === id_outlet
        )

        this.setState({
            action: "ubah",
            id_outlet: this.state.outlet[index].id_outlet,
            id_petugas: this.state.outlet[index].id_petugas,
            nama_outlet: this.state.outlet[index].nama_outlet,
            alamat: this.state.outlet[index].alamat,
        })
    }

    hapusOutlet(id_outlet) {


        if (window.confirm('Apakah anda yakin ingin menghapus data ini ?')) {

            let endpoint = base_url + '/outlet/' + id_outlet

            axios.delete(endpoint, authorization)
                .then(response => {



                    this.getData()
                })
                .catch(error => console.log(error))

        }
    }

    getData() {
        let endpoint = base_url + '/outlet'
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ outlet: response.data })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        // fungsi ini di jalankan setelah fungsi render berjalan
        this.getData()
        let petugas = JSON.parse(localStorage.getItem("owner"))
        //Cara Pertama
        this.setState({
            role: petugas.role
        })

        // Cara kedua
        if (petugas.role === 'owner') {
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
        if (this.state.role === 'owner') {
            return (
                <button type='button' className='btn btn-secondary'
                    onClick={() => this.tambahOutlet()}>
                    Tambah
                </button>
            )
        }
    }


    render() {
        return (

            <div>
                <NavbarOwner />
                <div className="card">
                    <div className="container">
                        <h4 className="text-bold text-info mt-2">List Daftar Outlet</h4>
                    </div>

                    <div className="card-body">

                        <div className="col-lg-3">
                            {this.showAddButton()}
                        </div>


                        <ul className="list-group">
                            {this.state.outlet.map(outlet => (
                                <li className="list-group-item">
                                    <div className="row">

                                        {/** BAGIAN JENIS PAKET */}
                                        <div className="col-lg-3">
                                            <small className="text-info">Nama Outlet</small> <br />
                                            {outlet.nama_outlet}
                                        </div>

                                        {/** BAGIAN HARGA PAKET */}
                                        <div className="col-lg-3">
                                            <small className="text-info">Alamat</small> <br />
                                            {outlet.alamat}
                                        </div>

                                        <div className="col-lg-3">
                                            <small className="text-info">ID Petugas</small> <br />
                                            {outlet.id_petugas}
                                        </div>


                                        {/**BUTTON */}
                                        {/* <button className="btn btn-sm col-sm-1 btn-success mx-1"
                                        onClick={() => this.ubahOutlet(outlet.id_outlet)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-sm col-sm-1 btn-danger mx-1"
                                        onClick={() => this.hapusOutlet(outlet.id_outlet)}>
                                        Delete
                                    </button> */}

                                        <button className={`btn btn-sm col-sm-1 btn-primary m-1 ${this.state.visible ? `` : `d-none`}`}
                                            onClick={() => this.ubahOutlet(outlet.id_outlet)}>
                                            Edit
                                        </button>

                                        <button small className={`btn btn-sm col-sm-1 btn-danger m-1 ${this.state.visible ? `` : `d-none`}`}
                                            onClick={() => this.hapusOutlet(outlet.id_outlet)}>
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))} <br />


                        </ul>

                        {/** FORM MODAL PAKET */}
                        <div className="modal" id="modal-outlet">
                            <div className="modal-dialog modal-md">
                                <div className="modal-content">
                                    <div className="modal-header bg-success">
                                        <h4 className="text-white">
                                            Form Outlet
                                        </h4>
                                    </div>

                                    <div className="modal-body">
                                        <form onSubmit={ev => this.simpanOutlet(ev)}>
                                            Nama Outlet
                                            <input type="text" className="form-control mb-2"
                                                value={this.state.nama_outlet}
                                                onChange={ev => this.setState({ nama_outlet: ev.target.value })}
                                                required
                                            />

                                            Alamat
                                            <input type='text' className="form-control mb-2"
                                                value={this.state.alamat}
                                                onChange={ev => this.setState({ alamat: ev.target.value })}
                                                required
                                            />

                                            ID Petugas
                                            <input type='text' className="form-control mb-2"
                                                value={this.state.id_petugas}
                                                onChange={ev => this.setState({ id_petugas: ev.target.value })}
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

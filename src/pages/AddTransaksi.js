import React from "react"
import Navbar from "../components/Navbar"
import { base_url, authorization } from "../Config" 
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'

import TransaksiList from "../components/TransaksiList"

export default class AddTransaksi extends React.Component{
    constructor(){
        super()
        this.state = {
            token   : "",
            transaksi: [],
            id_petugas: "",
            id_outlet: "",
            resi: "",
            nama_customer: "",
            tgl: "tgl",
            batas_waktu: "",
            tgl_bayar: "",
            status: "",
            dibayar: "",
            id_paket: "",
            qty: "",
            detail_transaksi: [],
            paket: [],
            petugas: [],

            selectedItem: null
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/loginAdmin"
        }


    }

    getData = () => {
        let url = base_url + "/transaksi"
 
        axios.get(url, authorization)
        .then(response => {
            // this.setState({transaksi: response.data})
            // let dataTransaksi = response.data


            this.setState({transaksi: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/loginAdmin")
                }
            }else{
                console.log(error);
            }
        })
    }

    getPaket() {
        let url = base_url + "/paket"
        axios.get(url, authorization)
            .then(response => {
                this.setState({
                    paket: response.data
                })
            })
            .catch(error => console.log(error))
    }

    componentDidMount(){
        this.getData()
        this.getPaket()

        let petugas = JSON.parse(localStorage.getItem("petugas"))
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

    tambahPaket(e) {
        e.preventDefault()
        this.modal.hide()
        // digunakan untuk menyimpan data paket yang dipilih 
        // beserta jumlahnya kedalam array detail_transaksi
        let idPaket = this.state.id_paket
        let SelectedPaket = this.state.paket.find(
            paket => paket.id_paket == idPaket
        )
        let newPaket = {
            id_paket: this.state.id_paket,
            qty: this.state.qty,
            jenis: SelectedPaket.jenis,
            harga: SelectedPaket.harga,
        }

        //ambil array detail transaksi
        let temp = this.state.detail_transaksi
        temp.push(newPaket)
        this.setState({ detail_transaksi: temp })
        console.log({ temp })
    }

    addPaket() {
        // menampilkan form modal untuk memilih paket
        this.modal = new Modal(document.getElementById('modal-paket'))
        this.modal.show()
        console.log(this.state.paket)
        // kosongkan form nya
        this.setState({
            id_paket: "",
            qty: "",
            jenis: "",
            harga: 0
        })
    }


    render(){
        return(
            <div>
                <div className="container">
                <div className="card">
                    <div className="card-header bg-primary">
                        <h4 className="text-white">
                            Form Transaksi
                        </h4>
                    </div>

                    <div className="card-body">
                        Nama Customer
                        <select className="form-control mb-2"
                            value={this.state.nama_customer}
                            onChange={(e => this.setState({ nama_customer: e.target.value }))}>
                            {this.state.transaksi.map(member => (
                                <option value={transaksi.nama_customer}>
                                    {transaksi.nama_customer}
                                </option>
                            ))}
                        </select>

                        {/* Tanggal Transaksi
                        <input type="date" className="form-control mb-2"
                            value={this.state.tgl}
                            onChange={e => this.setState({ tgl: e.target.value })} />

                        Batas Waktu
                        <input type="date" className="form-control mb-2"
                            value={this.state.batas_waktu}
                            onChange={e => this.setState({ batas_waktu: e.target.value })} />

                        Tanggal Bayar
                        <input type="date" className="form-control mb-2"
                            value={this.state.tgl_bayar}
                            onChange={e => this.setState({ tgl_bayar: e.target.value })} />

                        Status Bayar
                        <select className="form-control mb-2"
                            value={this.state.dibayar}
                            onChange={e => this.setState({ dibayar: e.target.value })}>
                            <option value={true}>Sudah Dibayar</option>
                            <option value={false}>Belum Dibayar</option>
                        </select> */}

                        {/* <button className="btn btn-success"
                            onClick={() => this.addPaket()}>
                            Tambah Paket
                        </button> */}

                        {/** Tampilkan isi detail */}
                        {/* <h5 className="text-warning">
                            Detail Transaksi
                        </h5> */}

                        {this.state.detail_transaksi.map(detail => (
                            <div className="row">
                                {/** area Nama Paket */}
                                <div className="col-lg-3">
                                    {/* {detail.jenis_paket} */}
                                </div>
                                {/** area Quantity */}
                                <div className="col-lg-2">
                                    Qty :  
                                    {/* {detail.qty} */}
                                </div>
                                {/** area Harga Paket */}
                                <div className="col-lg-3">
                                    @ Rp 
                                    {/* {formatNumber(detail.harga)} */}
                                </div>
                                {/** area Harga Total */}
                                <div className="col-lg-4">
                                    Total Harga : Rp
                                     {/* {formatNumber(detail.harga * detail.qty)} */}
                                </div>
                                <div className="col-lg-3">
                                    <button className='btn btn-sm btn-danger mx-1'
                                        // onClick={() => this.hapusPaket(detail.id_paket)}
                                        >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button className="btn btn-outline-info"
                        // onClick={() => this.SimpanTransaksi()}
                        >
                            Simpan Transaksi
                        </button>

                        {/** Modal Untuk pilihan paket */}
                        <div className="modal" id="modal-paket">
                            <div className="modal-dialog modal-md">
                                <div className="modal-content">
                                    <div className="modal-header bg-danger">
                                        <h4 className="text-white">
                                            Pilih Paket
                                        </h4>
                                    </div>

                                    <div className="modal-body">
                                        <form onSubmit={(e) => this.tambahPaket(e)}>
                                            Pilih Paket
                                            <select className="form-control mb-2"
                                                value={this.state.id_paket}
                                                onChange={e => this.setState({ id_paket: e.target.value })}>
                                                    <option value="">Pilih Paket</option>
                                                {this.state.paket.map(paket => ( 
                                                    <option value={paket.id_paket}>
                                                        {paket.jenis}
                                                    </option>
                                                ))}
                                            </select>

                                            Jumlah (Qty)
                                            <input type="number" className="form-control mb-2"
                                                value={this.state.qty}
                                                onChange={e => this.setState({ qty: e.target.value })} />

                                            <button className="btn btn-success" type="submit">
                                                Tambah
                                            </button>
                                        </form>
                                    </div>
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

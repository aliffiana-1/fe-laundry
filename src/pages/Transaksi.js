import React from "react"
import Navbar from "../components/Navbar"
import { base_url, authorization } from "../Config"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import { Modal } from "bootstrap";
import TransaksiList from "../components/TransaksiList"

export default class Transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
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


                this.setState({ transaksi: response.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/loginAdmin")
                    }
                } else {
                    console.log(error);
                }
            })
    }

    HapusTransaksi = (id_transaksi) => {
        if (window.confirm(`Apakah anda yakin ingin menghapus data ini ?`)) {

            let url = base_url + "/transaksi/" + id_transaksi


            axios.delete(url, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.onRefresh()
                })

                .catch(error => console.log(error))
        }
    }

    Add() {
        this.modalTransaksi = new Modal(document.getElementById('modal-transaksi'))
        this.modalTransaksi.show()

        this.setState({
            id_petugas: "",
            nama_customer : "",
            tgl_bayar: "",
            action: "tambah"
        })
    }

  


    componentDidMount() {
        this.getData()

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

    showAddButton() {
        if (this.state.role === 'petugas') {
            return (
                <div>
                    <button type='button' className='btn btn-secondary'
                        onClick={() => this.tambahPaket()}>
                        Tambah
                    </button>

                    <button className="btn btn-primary"
                        onClick={() => this.addPaket()}>
                        Tambah
                        <i class="bi bi-person-fill"></i>
                    </button>
                </div>
            )
        }
    }

    tambahPaket(e) {
        e.preventDefault()
        this.modal.hide()
        // digunakan untuk menyimpan data paket yang dipilih 
        // beserta jumlahnya kedalam array detail_transaksi
        let idPaket = this.state.id_paket
        let SelectedPaket = this.state.paket.find(
            paket => paket.id_paket === idPaket
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

    // addPaket() {
    //     // menampilkan form modal untuk memilih paket
    //     this.modalPetugas = new Modal(document.getElementById('modal-transaksi'))
    //     this.modalPetugas.show()
    //     // kosongkan form nya
    //     this.setState({
    //         id_paket: "",
    //         qty: "",
    //         jenis: "",
    //         harga: 0
    //     })
    // }

    Add = () => {
        this.modalPetugas = new Modal(document.getElementById('modal-petugas'))
        this.modalPetugas.show()

        this.setState({
            action: "insert",
            id_petugas: "",
            nama: "",
            username: "",
            password: "",
            image: null,
            role: "",
            fillPassword: true,
            uploadFile: true
        })
    }


    render() {
        return (
            <div>
                <Navbar />
                <div className="card">
                    <div className="container">
                        {/* <h2 className="text-bold bg-info mr-5 ml-5 mt-5 text-white text-center">List Transaksi</h2> */}
                        <h3 className="mr-5 p-3 ml-5 mt-5 bg-info text-center">List Transaksi</h3>
                        {/* <div class="p-3 mb-2 bg-success text-white text-center">
                                Data Baru
                                <CDropdown className="d-flex col-2">
                                    <CDropdownToggle color="light">Data Transaksi</CDropdownToggle>
                                        <CDropdownMenu>
                                            <CDropdownItem href="/loginOwner">Baru</CDropdownItem>
                                            <CDropdownItem href="/loginAdmin">Proses</CDropdownItem>
                                            <CDropdownItem href="/loginAdmin">Selesai</CDropdownItem>
                                        </CDropdownMenu>
                                </CDropdown>

                            </div> */}

                    </div>


                    <div className="container">
                        {/* <h1 className="mr-5 ml-5 mt-5 text-info text-center">List Transaksi</h1> */}
                        <div className="container mb-5 mt-5 text-left">
                            <button className="bg-primary mb-2 ">
                                <button  className="btn btn-primary"
                                    onClick={() => this.addPaket()}>
                                    Tambah
                                    <i class="bi bi-person-fill"></i>
                                </button>

                                <div className="col-lg-3">
                        {this.showAddButton()}
                    </div>

                                {/* <Link class="nav-link text-white" 
                                        //  to={'/adduser'}
                                        >
                                        <span>Add</span>
                                        <i class="bi bi-person-fill"></i>
                                        {/* <i class="fas fa-user"></i> 
                                    </Link> */}

                            </button>

                            <div>
                                <div className="container">
                                    {/* <TransaksiList /> */}
                                    {this.state.transaksi.map(item => (
                                        <TransaksiList
                                            id_transaksi={item.id_transaksi}
                                            key={item.id_transaksi}
                                            nama_customer={item.nama_customer}
                                            resi={item.resi}
                                            status={item.status}
                                            dibayar={item.dibayar}
                                            tgl_bayar={item.tgl_bayar}
                                            tgl={item.tgl}
                                            detail={item.detail_transaksi}
                                            onEdit={() => this.Edit(item)}
                                            onDrop={() => this.HapusTransaksi(item)}
                                            onRefresh={() => this.getData(item)}
                                        // products = {item.detail_transaksi}
                                        />
                                    ))}
                                </div>
                            </div>



                            {/* <table class="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                        <th>Nama Customer</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.data.map((result) => {
                                            return (
                                        
                                                <tr>
                                                <td>{result.id}</td>
                                                <td>{result.email}</td>
                                                <td>{result.username}</td>
                                                <td>
                                                    <button className="bg-info"> <i class="fas fa-eye"></i> </button>
                                                    <button className="bg-warning"> <i class="fas fa-edit"></i> </button>
                                                    <button className="bg-danger"> <i class="fas fa-trash"></i> </button>
                                                </td>
                                                </tr>
                                            
                                            )
                                        })}
                                    
                                        
                                    </tbody>
                                </table> */}







                            <div className="card-body">
                                <ul className="list-group">
                                    <div ></div>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

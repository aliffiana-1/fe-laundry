import React from "react"
import { authorization, base_url, image_url } from "../../Config.js";
import $ from "jquery"
import axios from "axios"
import bootstrap from "bootstrap";
import { Modal } from "bootstrap"
import Swal from "sweetalert2";
import NavbarOwner from "../../components/NavbarOwner";
import PetugasList from "../../components/PetugasList.js";


export default class OwnerAdmin extends React.Component {
    constructor() {
        super()
        this.state = {
            petugas: [],
            id_petugas: "",
            nama: "",
            image: null,
            username: "",
            password: "",
            role: "",
            action: "",
            uploadFile: true,
            fillPassword: true,
            visible: true
        }
    }

    getPetugas() {
        let url = base_url + '/petugas'
        axios.get(url, authorization)
            .then(response => {
                this.setState({ petugas: response.data })
            })

            .catch(error => console.log(error))
    }

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


    Edit = selectedItem => {
        this.modalPetugas = new Modal(document.getElementById("modal-petugas")) // this "modal-petugas"
        this.modalPetugas.show() //Menampilkan modal petugas

        this.setState({
            action: "update",
            id_petugas: selectedItem.id_petugas,
            nama: selectedItem.nama,
            username: selectedItem.username,
            password: "",
            image: null,
            role: selectedItem.role,
            uploadFile: false,
            fillPassword: false,
        })
    }

    ubahPetugas(id_petugas) {
        this.modalPaket = new Modal(document.getElementById("modal-petugas")) // this "modal-petugas"
        this.modalPaket.show() //Menampilkan modal petugas

        //mencari index posisi dari data petugas yg akan diubah
        let index = this.state.petugas.findIndex(
            petugas => petugas.id_petugas === id_petugas
        )

        this.setState({
            action: "update",
            id_petugas: this.state.petugas[index].id_petugas,
            nama: this.state.petugas[index].nama,
            username: this.state.petugas[index].username,
            password: this.state.petugas[index].password,
            role: this.state.petugas[index].role,
            image: this.state.petugas[index].image
        })
    }



    savePetugas = event => {
        event.preventDefault()
        this.modalPetugas.hide()
        let form = new FormData()
        form.append("id_petugas", this.state.id_petugas)
        form.append("nama", this.state.nama)
        form.append("username", this.state.username)
        form.append("role", this.state.role)

        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }

        if (this.state.fillPassword) {
            form.append("password", this.state.password)
        }

        let newPetugas = {
            nama: this.state.nama,
            username: this.state.username,
            role: this.state.role,
            image: this.state.image,
            password: this.state.password
        }
        
        let url = base_url + "/petugas"
        if (this.state.action === "insert") {
            
            axios.post(url, form, authorization)
                .then(response => {
                                                                                                                                                                                                 window.alert(response.data.message)
                    this.getPetugas()
                })
                .catch(error => console.log(error))

        } else if (this.state.action === "update") {
            axios.put(url, form, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getPetugas()
                })
                .catch(error => console.log(error))

            this.modalPetugas.hide()
        }
    }

    dropPetugas = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/petugas/" + selectedItem.id_petugas
            axios.delete(url, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getPetugas()
                })
                .catch(error => console.log(error))
        }
    }




    componentDidMount() {
        this.getPetugas()
    }



    // simpanPetugas(event) {
    //     event.preventDefault()

    //     this.modalPetugas.hide()

    //     if (this.state.action === "tambah") {
    //         let endpoint = base_url + '/petugas'
    //         let body = new FormData()
    //         body.append("id_petugas", this.state.id_petugas)
    //         body.append("nama", this.state.nama)
    //         body.append("username", this.state.username)
    //         body.append("role", this.state.role)
    //         if(this.state.uploadFile) {
    //             body.append("image", this.state.image)
    //         }

    //         if(this.state.fillPassword) {
    //             body.append("password", this.state.password)
    //         }

    //         if(this.state.action === "tambah") {
    //             axios.post(endpoint, body, authorization)
    //             .then(response => {
    //                 window.alert(response.data.message)
    //                 this.getData()
    //             })
    //             .catch(error => console.log(error))

    //         }
    //         }
    //         // let newPetugas = {
    //         //     id_petugas: this.state.id_petugas,
    //         //     nama: this.state.nama,
    //         //     password: this.state.password,
    //         //     username: this.state.username,
    //         //     role: this.state.role
    //         // }
    //         // console.log(newPetugas);

    //          else if (this.state.action === 'ubah') {
    //             axios.put(url, body, authorization())
    //         .then(response => {
    //             window.alert(response.data.message)
    //             this.getCustomers()
    //         })
    //         .catch(error => console.log(error))
    //     }

    //             // let endpoint = base_url + '/petugas'
    //         // let body = new FormData()
    //         // body.append("id_petugas", this.state.id_petugas)
    //         // body.append("nama", this.state.nama)
    //         // body.append("username", this.state.username)
    //         // body.append("password", this.state.password)
    //         // body.append("role", this.state.role)
    //         // let newPetugas = {
    //         //     id_petugas: this.state.id_petugas,
    //         //     nama: this.state.nama,
    //         //     password: this.state.password,
    //         //     username: this.state.username,
    //         //     role: this.state.role,
    //         // }

    //         // axios.put(endpoint, newPetugas, authorization)
    //         //     .then(response => {
    //         //         window.alert(response.data.message)
    //         //         this.getData()
    //         //     })
    //         //     .catch(error => console.log(error))

    //         this.modalPetugas.hide()
    //     }

    // }

    // Edit = selectedItem => {
    //     $("#modal_customer").modal("show")
    //     this.setState({
    //         action: "ubah",
    //         id_petugas: selectedItem.id_petugas,
    //         nama: selectedItem.nama,
    //         username: selectedItem.username,
    //         password: "selectedItem.password",
    //         image: null,
    //         uploadFile: false,
    //         fillPassword: false,
    //     })
    // }


    // hapusPetugas(id_petugas) {


    //     if (window.confirm('Apakah anda yakin ingin menghapus data ini ?')) {

    //         let endpoint = base_url + '/petugas/' + id_petugas

    //         axios.delete(endpoint, authorization)
    //             .then(response => {



    //                 this.getData()
    //             })
    //             .catch(error => console.log(error))

    //     }
    // }



    // componentDidMount() {
    //     // fungsi ini di jalankan setelah fungsi render berjalan
    //     this.getData()
    //     let petugas = JSON.parse(localStorage.getItem("owner"))
    //     //Cara Pertama
    //     this.setState({
    //         role: petugas.role
    //     })

    //     // Cara kedua
    //     if (petugas.role === 'owner') {
    //         this.setState({
    //             visible: true
    //         })
    //     } else (
    //         this.setState({
    //             visible: false
    //         })
    //     )
    // }

    // showAddButton() {
    //     if (this.state.role === 'owner') {
    //         return (
    //             <button type='button' className='btn btn-secondary'
    //                 onClick={() => this.tambahPetugas()}>
    //                 Tambah
    //             </button>
    //         )
    //     }
    // }


    render() {
        return (

            <div>
                <NavbarOwner />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Petugas List</h3>
                    <div className="row">
                        {this.state.petugas.map(item => (
                            <PetugasList
                                key={item.id_petugas}
                                nama={item.nama}
                                username={item.username}
                                image={image_url + "/" + item.image}
                                role={item.role}
                                onEdit={() => this.Edit(item)}
                                onDrop={() => this.dropPetugas(item)}
                            />
                        ))}
                    </div>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Tambah Petugas
                    </button>
                </div>

                {/* modal petugas  */}
                <div className="modal fade" id="modal-petugas">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h4>Form Petugas</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.savePetugas(ev)}>
                                    Nama Petugas
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.nama}
                                        onChange={ev => this.setState({ nama: ev.target.value })}
                                        required
                                    />
                                    Username
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.username}
                                        onChange={ev => this.setState({ username: ev.target.value })}
                                        required
                                    />
                                    Role
                                    <select className="form-control mb2"
                                        value={this.state.role}
                                        onChange={ev => this.setState({ role: ev.target.value })}>
                                        <option value="DEFAULT" disabled>Choose a salutation ...</option>
                                        <option value="owner">Owner</option>
                                        <option value="petugas">Petugas</option>
                                    </select>

                                    {this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-dark mb-1 btn-block"
                                            onClick={() => this.setState({ uploadFile: true })}>
                                            Change Petugas Image
                                        </button>
                                    ) : (
                                        <div>
                                            Petugas Image
                                            <input type="file" className="form-control mb-1"
                                                onChange={ev => this.setState({ image: ev.target.files[0] })}
                                                required
                                            />
                                        </div>
                                    )}

                                    {this.state.action === "update" && this.state.fillPassword === false ? (
                                        <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                            onClick={() => this.setState({ fillPassword: true })}>
                                            Change Password
                                        </button>
                                    ) : (
                                        <div>
                                            Password
                                            <input type="password" className="form-control mb-1"
                                                value={this.state.password}
                                                onChange={ev => this.setState({ password: ev.target.value })}
                                                required
                                            />
                                        </div>
                                    )}
                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

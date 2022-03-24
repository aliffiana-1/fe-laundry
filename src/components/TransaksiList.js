import React from "react";
import { Modal } from "bootstrap";
import { get } from "jquery";
import { base_url, authorization } from "../Config";
import axios from "axios";

export default class TransaksiList extends React.Component {
    constructor() {
        super()
        this.state = {
            transaksi: [],
            id_transaksi: "",
            status: "",
            dibayar: "",
            resi: " ",
            action: "",
            visible: true
            // token: ""
        }
    }

    // getAmount = products => {
    //     let total = 0
    //     products.map(it => {
    //         total += Number(it.price) * Number(it.qty)
    //     })
    //     return total


    convertTime = tgl => {
        let date = new Date(tgl)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    getData = () => {
        let url = base_url + "/transaksi"

        axios.get(url, authorization)
            .then(response => {
                // this.setState({transaksimodaltransaksi: response.data})
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

    ubahTransaksi(id_transaksi) {
        this.modaltransaksi = new Modal(document.getElementById("modal-transaksimodaltransaksi")) // this "modal-transaksimodaltransaksi"
        this.modaltransaksi.show() //Menampilkan modal transaksimodaltransaksi

        //mencari index posisi dari data transaksimodaltransaksi yg akan diubah
        let index = this.state.transaksi.findIndex(
            trans => trans.id_transaksi === id_transaksi
        )

        this.setState({
            action: "ubah",
            id_transaksi: this.state.transaksimodaltransaksi[index].id_transaksi,
            status: this.state.transaksimodaltransaksi[index].status,
            dibayar: this.state.transaksimodaltransaksi[index].dibayar,
            tgl_bayar: this.state.transaksimodaltransaksi[index].tgl_bayar
        })
    }






    render() {
        return (
            <div className="container">


                <div className="card col-sm-14 my-1">

                    <div className="card-body row">

                        <div className="col-lg-2 col-sm-14">
                            <small className="text-info">Nama Customer</small>
                            <h6>{this.props.nama_customer}</h6>
                        </div>
                        <div className="col-lg-2 col-sm-14">
                            <small className="text-info">Resi</small>
                            <h6>{this.props.resi}</h6>
                        </div>
                        <div className="col-lg-1 col-sm-14">
                            <small className="text-info">Status</small>
                            <h6 className="badge bg-warning">{this.props.status}</h6>
                        </div>
                        <div className="col-lg-1 col-sm-14">
                            <small className="text-info text-center">Dibayar</small>
                            <h6 className="badge bg-secondary">
                                {this.props.dibayar}</h6>
                        </div>
                        <div className="col-lg-2 col-sm-14">
                            <small className="text-info ">Tanggal Bayar</small>
                            <h6>{this.convertTime(this.props.tgl_bayar)}</h6>
                        </div>



                        <div className="col-lg-2 col-sm-14">
                            <small className="text-bold text-info">
                                Time: <small className="text-bold text-dark">{this.convertTime(this.props.tgl)}</small></small>
                            <h6></h6>
                            <button className="btn btn-sm btn-block btn-success" data-toggle="modal"
                                data-target={`#modalDetail${this.props.resi}`}
                            >
                                Details
                            </button>
                        </div>



                        <div className="col-sm-2">
                            <small className="text-info">Opsi</small>
                            <h6>
                                {/* action */}
                                <button className="btn btn-sm btn-primary btn-block"
                                    onClick={this.props.onEdit}>
                                    Edit
                                </button>

                                <button className="btn btn-sm btn-danger btn-block"
                                    onClick={this.props.onDrop}>
                                    Delete
                                </button>
                            </h6>
                        </div>


                    </div>


                </div>

                {/* modal component */}
                <div className="modal fade"
                    id={`modalDetail${this.props.resi}`}
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5>Detail of Transaction</h5>
                            </div>
                            <div className="modal-body">
                                <h5>Customer:
                                    {this.props.nama_customer}
                                </h5>
                                <h6>Time:
                                    {this.convertTime(this.props.tgl)}
                                </h6>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>

                                    {/* <tbody>
                                        { this.props.transaksimodaltransaksi.map((item, index) => (
                                            <tr key={item.id_detail_transaksimodaltransaksi}>
                                                <td>{`${index + 1}`}</td>
                                                <td>{item.transaksimodaltransaksi.nama_customer}</td>
                                                <td>Rp {item.jenis}</td>
                                                <td>{item.qty}</td>
                                                <td className="text-right">Rp 
                                                {item.price * item.qty}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="4" className="text-danger text-bold">
                                                <h4>Total</h4>
                                            </td>
                                            <td className="text-right text-danger text-bold">
                                                <h4>
                                                Rp { this.getAmount(this.props.products) }
                                                </h4>
                                            </td>
                                        </tr>
                                    </tbody> */}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


import React, {Component} from 'react';
import axios from 'axios';
import $, { event } from 'jquery';
import Modal from "../Component/Modal";
import Toast from "../Component/Toast";

class Pelanggaran extends Component {
    constructor() {
        super();
        this.state = {
            pelanggaran: [],
            id_pelanggaran: "",
            nama_pelanggaran: "",
            poin: "",
            action: "",
            find: "",
            message: ""
        }

        if(!localStorage.getItem("Token")){
            window.location = "/login";
        }
    }
    bind = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }
    Add = () => {
        $("#modal_pelanggaran").modal("show");
        this.setState({
            action: "insert",
            id_pelanggaran: "",
            nama_pelanggaran: "",
            poin: ""
        });
    }
    Edit = (item) => {
        $("#pelanggaran").modal("show");
        this.setState({
            action: "update",
            id_pelanggaran: item.id_pelanggaran,
            nama_pelanggaran: item.nama_pelanggaran,
            poin: item.poin
        });
    }
    get_pelanggaran = () => {
       $("#loading").toast("show") ;
       let url = "http://localhost/pelanggaran_siswa/public/pelanggaran";
       axios.get(url)
       .then(response => {
           this.setState({pelanggaran: response.data.pelanggaran});
           $("#loading").toast("hide");
       })
       .catch(error => {
           console.log(error);
       });
    }
    Drop = (id) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/pelanggaran_siswa/public/pelanggaran/drop/" + id;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.get_pelanggaran();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    componentDidMount = () => {
        
    }
    Save = (event) => {
        event.preventDefault();
        $("#loading").toast("show");
        $("#modal_pelanggaran").toast("hide");
        let url = "http://localhost/pelanggaran_siswa/public/pelanggaran/save";
        let form = new FormData();
        form.append("id_pelanggaran", this.state.id_pelanggaran);
        form.append("nama_pelanggaran", this.state.nama_pelanggaran);
        form.append("poin", this.state.poin);
        form.append("action", this.state.action);
        axios.post(url, form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({message: response.data.message});
            $("#message").toast("show");
            this.get_pelanggaran();
        })
        .catch(error => {
            console.log(error);
        });
    }
    search = (event) => {
        if (event.keyCode === 13) {
            $("#loading").toast("show");
            let url = "http://localhost/pelanggaran_siswa/public/pelanggaran";
            let form = new FormData();
            form.append("find", this.state.find);
            axios,post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({pelanggaran: response.data.pelanggaran});
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    render(){
        return (  
	      <div className="container">  
	        <div className="card mt-2">  
	          {/* header card */}  
	          <div className="card-header bg-success">  
	            <div className="row">  
	              <div className="col-sm-8">  
	                <h4 className="text-white">Data Pelanggaran</h4>  
	              </div>  
	              <div className="col-sm-4">  
	                <input type="text" className="form-control" name="find"  
	                  onChange={this.bind} value={this.state.find} onKeyUp={this.search}  
	                  placeholder="Pencarian..." />  
	              </div>  
	            </div>  
	  
	          </div>  
	          {/* content card */}  
	          <div className="card-body">  
	            <Toast id="message" autohide="true" title="Informasi">  
	              {this.state.message}  
	            </Toast>  
	            <Toast id="loading" autohide="false" title="Informasi">  
	              <span className="fa fa-spin fa-spinner"></span> Sedang Memuat  
	            </Toast>  
	            <table className="table">  
	              <thead>  
	                <tr>  
	                  <th>Nama Pelanggaran</th> 
	                  <th>Poin</th>  
	                  <th>Option</th>  
	                </tr>  
	              </thead>  
	              <tbody>  
	                { this.state.siswa.map((item) => {  
	                  return(  
	                    <tr key={item.id_pelanggaran}>
	                      <td>{item.nama_pelanggaran}</td>
	                      <td>{item.poin}</td>  
	                      <td>  
	                        <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>  
	                          <span className="fa fa-edit"></span>  
	                        </button>  
	                        <button className="m-1 btn btn-sm btn-danger"  
	                          onClick={() => this.Drop(item.id_pelanggaran)}>  
	                          <span className="fa fa-trash"></span>  
	                        </button>  
	                      </td>  
	                    </tr>  
	                  );  
	                })}  
	              </tbody>  
	            </table>  
	  
	            {/* tombol tambah */}  
	            <button className="btn btn-success my-2" onClick={this.Add}>  
            <span className="fa fa-plus"></span> Tambah Data  
	            </button>  
	  
	            {/* form modal pelanggaran*/}  
	            <Modal id="modal_pelanggaran" title="Form Pelanggaran" bg_header="success" text_header="white">  
	              <form onSubmit={this.Save}>  
	                Nama Pelanggaran
	                <input type="text" className="form-control" name="nama_pelanggaran"  
	                  value={this.state.nama_pelanggaran} onChange={this.bind} required />  
	                Poin  
	                <input type="number" className="form-control" name="poin" value={this.state.poin}  
	                  onChange={this.bind} required />  
	                <button type="submit" className="btn btn-info pull-right m-2">  
	                  <span className="fa fa-check"></span> Simpan  
	                </button>  
	              </form>  
	            </Modal>  
	          </div>  
	        </div>  
	      </div>  
	    );            
    }
}
export default Pelanggaran;
import React, {Component} from 'react';
import axios from 'axios';
import Toast from "../Component/Toast";
import $ from 'jquery';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            message: ""
        }
    }

    bind = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    Login = (event) => {
        event.preventDefault();
        let url = "http://localhost/pelanggaran_sekolah/public/user/auth";
        let form = new FormData();
        form.append("username", this.state.username);
        form.append("password", this.state.password);
        axios.post(url, form)
        .then(response => {
            let logged = response.data.status;
            if (logged) {
                this.setState({message: "Login Berhasil"});
                // simpan data token pada local storage
                localStorage.setItem("Token", response.data.token);
                // simpan data login user ke local storage
                localStorage.setItem("user", JSON.stringify(response.data.user));
                // direct ke halaman data siswa
                window.location = "/siswa";
            } else {
                this.setState({message: "Login Gagal"});
            }
            $("message").toast("show");
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        return(
            <div className="container" style={{width: "50%"}}>
                <div className="card my-2">
                    <div className="card-header bg-success">
                        <h5 className="text-white">Login User</h5>
                    </div>
                    <div className="card-body">
                        <Toast id="message" autohide="false" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <form onSubmit={this.Login}>
                            <input type="text" className="form-control m-1" name="username" value={this.state.username} onChange={this.bind} required placeholder="Masukkan Username" />
                            <input type="password" className="form-control m-1" name="password" value={this.state.password} onChange={this.bind} required placeholder="Masukkan Password" />
                            <button className="mt-2 btn btn-block btn-success" type="submit">
                                <span className="fa fa-sign-in"></span> Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
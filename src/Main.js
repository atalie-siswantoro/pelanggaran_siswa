const { Component } = require("react")

import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";

// load navbar
import Navbar from "./Component/Navbar";
// load halaman
import Siswa from "./Page/Siswa";
import Pelanggaran from "./Page/Pelanggaran";
import User from "./Page/User";
import PelanggaranSiswa from "./Page/PelanggaranSiswa";
import Login from "./Page/Login";

class Main extends Component {
    render = () => {
        return(
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/siswa">
                    <Navbar />
                    <Siswa />
                </Route>
                <Route path="/pelanggaran">
                    <Navbar />
                    <Pelanggaran />
                </Route>
                <Route path="/user">
                    <Navbar />
                    <User />
                </Route>
                <Route path="/pelanggaran_siswa">
                    <Navbar />
                    <PelanggaranSiswa />
                </Route>
            </Switch>
        );
    }
}
export default Main;
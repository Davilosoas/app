import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Adm from "../pages/Adm";
import ChangeUser from "../pages/ChangeUser";
import CreateUser from "../pages/CreateUser";
import Login from "../pages/Login";
import Main from "../pages/Main";

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<CreateUser />} />
            <Route path='/change' element={<ChangeUser />} />
            <Route path='/main' element={<Main />} />
            <Route path='/adm' element={<Adm />} />
            <Route path='/*' element={<Login />} />
        </Routes>
    </BrowserRouter>
)

export default Router
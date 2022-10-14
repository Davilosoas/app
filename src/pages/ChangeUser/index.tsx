import React, { useState, FormEvent, useEffect, ChangeEvent } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import Header from "../../components/Header";
import { Input, Text } from "../../globalStyles";
import api from "../../services/api";

function Form() {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [account, setAccount] = useState<string>('')
    const [administrator, setAdmin] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [validate, setValidate] = useState<string>('')
    const [checkboxAdm, setCheckboxAdm] = useState<boolean>(false)
    const history = useNavigate()
    const location = useLocation()


    useEffect(() => {
        try {
            api.get(`/user/${location.state.id}`).then((result) => {
                setName(result.data.name);
                setEmail(result.data.email);
                setAccount(result.data.account)
                setAdmin(result.data.administrator)
                setPhone(result.data.phone)
                setValidate(result.data.validate)
                setCheckboxAdm(result.data.administrator !== "Eu sou administrador" ? false : true)
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    function SaveData() {
        const data = { name, email, account, administrator, phone, validate }
        try {
            api
                .put(`/user/${location.state.id}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                })
                .then((result) => {
                    history("/adm");
                });
        } catch (error) {

        }
    }
    const handleCheckbox = () => {
        if (checkboxAdm === false) {
            setCheckboxAdm(true)
            setAdmin("Eu sou administrador")
        }
        else {
            setCheckboxAdm(false)
            setAdmin("N")
        }
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Header />
            <Text>Nome</Text>
            <Input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} value={name} />
            <Text>E-mail</Text>
            <Input type="email" onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} value={email} />
            <Text>Número da Conta</Text>
            <Input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setAccount(e.target.value)} value={account} />
            <Text>Telefone</Text>
            <Input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)} value={phone} />
            <Text>Validade</Text>
            <Input type="date" onChange={(e: ChangeEvent<HTMLInputElement>) => setValidate(e.target.value)} value={validate} />
            <div>
                <input
                    type="checkbox" style={{ width: '20px', height: '20px' }}
                    checked={checkboxAdm}
                    onChange={handleCheckbox}
                />
                <span>Usuário administrador</span>
            </div>
            <div>
                <button onClick={() => history("/adm")}>Voltar</button>
                <button onClick={SaveData}>Salvar</button>
            </div>
        </div>
    )
}

export default Form
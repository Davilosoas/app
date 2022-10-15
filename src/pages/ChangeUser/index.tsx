import React, { useState, FormEvent, useEffect, ChangeEvent } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import Header from "../../components/Header";
import { toastSuccess } from "../../components/Toast";
import { Input, Text } from "../../globalStyles";
import api from "../../services/api";

function Form() {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [account, setAccount] = useState<string>('')
    const [administrator, setAdmin] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [validateInsider, setValidateInsider] = useState<string>('')
    const [ativated, setAtivated] = useState<string>('')
    const [multpInsider, setMultpInsider] = useState<number>()
    const [multpExplicitus, setMultpExplicitus] = useState<number>()
    const [validateExplicitus, setValidateExplicitus] = useState<string>('')
    const [multpPoupDobrada, setMultpPoupDobrada] = useState<number>()
    const [validatePoupDobrada, setValidatePoupDobrada] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [passBroker, setPassBroken] = useState<string>('')
    const [broker, setBroken] = useState<string>('')

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
                setValidateInsider(result.data.validateInsider)
                setCheckboxAdm(result.data.administrator !== "Eu sou administrador" ? false : true)
                setAtivated(result.data.ativated)
                setMultpInsider(result.data.multpInsider)
                setMultpExplicitus(result.data.multpExplicitus)
                setValidateExplicitus(result.data.validateExplicitus)
                setMultpPoupDobrada(result.data.multpPoupDobrada)
                setValidatePoupDobrada(result.data.validatePoupDobrada)
                setDescription(result.data.description)
                setPassBroken(result.data.passBroker)
                setBroken(result.data.broker)
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    function SaveData() {
        const data = {
            name,
            email,
            account,
            administrator,
            phone,
            validateInsider,
            ativated,
            multpInsider,
            multpExplicitus,
            validateExplicitus,
            multpPoupDobrada,
            validatePoupDobrada,
            description,
            passBroker,
            broker
        }
        try {
            api
                .put(`/user/${location.state.id}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                })
                .then((result) => {
                    toastSuccess("Alteração realizada com sucesso!")

                }).then(() => setTimeout(() => history("/adm"), 4000))
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
            <ToastContainer />
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', marginRight: '50px' }}>
                    <Text>Nome</Text>
                    <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} value={name} />
                    <Text>E-mail</Text>
                    <input type="email" onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} value={email} />
                    <Text>Telefone</Text>
                    <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)} value={phone} />
                    <Text>Corretora</Text>
                    <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setBroken(e.target.value)} value={broker} />
                    <Text>Número da Conta</Text>
                    <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setAccount(e.target.value)} value={account} />
                    <Text>Senha corretora</Text>
                    <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setPassBroken(e.target.value)} value={passBroker} />

                    <div>
                        <input
                            type="checkbox" style={{ width: '20px', height: '20px' }}
                            checked={checkboxAdm}
                            onChange={handleCheckbox}
                        />
                        <span>Usuário administrador</span>
                    </div>
                </div>
                <div>
                    <fieldset>
                        <legend>Insider</legend>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                <Text>Validade</Text>
                                <Input type="date" onChange={(e: ChangeEvent<HTMLInputElement>) => setValidateInsider(e.target.value)} value={validateInsider} />
                            </div>
                            <div>
                                <Text>Mult.lote</Text>
                                <Input type="number" onChange={(e: ChangeEvent<HTMLInputElement>) => setMultpInsider(Number(e.target.value))} value={multpInsider} />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Explicitus</legend>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                <Text>Validade</Text>
                                <Input type="date" onChange={(e: ChangeEvent<HTMLInputElement>) => setValidateExplicitus(e.target.value)} value={validateExplicitus} />
                            </div>
                            <div>
                                <Text>Mult.lote</Text>
                                <Input type="number" onChange={(e: ChangeEvent<HTMLInputElement>) => setMultpExplicitus(Number(e.target.value))} value={multpExplicitus} />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Poupança Dobrada</legend>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div>
                                <Text>Validade</Text>
                                <Input type="date" onChange={(e: ChangeEvent<HTMLInputElement>) => setValidatePoupDobrada(e.target.value)} value={validatePoupDobrada} />
                            </div>
                            <div>
                                <Text>Mult.lote</Text>
                                <Input type="number" onChange={(e: ChangeEvent<HTMLInputElement>) => setMultpPoupDobrada(Number(e.target.value))} value={multpPoupDobrada} />
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
            <div>
                <button onClick={() => history("/adm")}>Voltar</button>
                <button onClick={SaveData}>Salvar</button>
            </div>
        </div>
    )
}

export default Form
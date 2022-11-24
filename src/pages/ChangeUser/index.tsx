import React, { useState, useEffect, ChangeEvent } from "react";
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
    const [checkboxTester, setCheckboxTester] = useState<boolean>(false)
    const history = useNavigate()
    const location = useLocation()


    useEffect(() => {
        try {
            api.get(`/user/${location.state.id}`).then((result) => {
                setName(result.data.customer.name);
                setEmail(result.data.customer.email);
                setAccount(result.data.customer.account)
                setAdmin(result.data.customer.administrator)
                setPhone(result.data.customer.phone)
                setValidateInsider(result.data.customer.validateInsider)
                setCheckboxAdm(result.data.customer.administrator !== "Eu sou administrador" ? false : true)
                setCheckboxTester(result.data.customer.administrator !== "Tester" ? false : true)
                setAtivated(result.data.customer.ativated)
                setMultpInsider(result.data.customer.multpInsider)
                setMultpExplicitus(result.data.customer.multpExplicitus)
                setValidateExplicitus(result.data.customer.validateExplicitus)
                setMultpPoupDobrada(result.data.customer.multpPoupDobrada)
                setValidatePoupDobrada(result.data.customer.validatePoupDobrada)
                setDescription(result.data.customer.description)
                setPassBroken(result.data.customer.passBroker)
                setBroken(result.data.customer.broker)
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
            setCheckboxTester(false)
            setAdmin("Eu sou administrador")
        }
        else {
            setCheckboxAdm(false)
            setAdmin("N")
        }
    }
    const handleCheckboxTester = () => {
        if (checkboxTester === false) {
            setCheckboxAdm(false)
            setCheckboxTester(true)
            setAdmin("Tester")
        }
        else {
            setCheckboxTester(false)
            setAdmin("N")
        }
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Header />
            <ToastContainer />
            <h1>Alterar usuário</h1>
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
                    <Text>Observação</Text>
                    <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} value={description} />

                    <div>
                        <input
                            type="checkbox" style={{ width: '20px', height: '20px' }}
                            checked={checkboxAdm}
                            onChange={handleCheckbox}
                        />
                        <span>Usuário administrador</span>
                    </div>
                    <div>
                        <input
                            type="checkbox" style={{ width: '20px', height: '20px' }}
                            checked={checkboxTester}
                            onChange={handleCheckboxTester}
                        />
                        <span>Conta teste</span>
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
                <button style={{backgroundColor:'#F84F31', margin:'30px'}} onClick={() => history("/adm")}>Voltar</button>
                <button onClick={SaveData}>Salvar</button>
            </div>
        </div>
    )
}

export default Form
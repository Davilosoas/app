import React, { useState, FormEvent } from "react";
import api from "../../services/api";
import { useNavigate } from 'react-router-dom'
import { dataUser } from "../../utils/variableGlobal";
import Header from "../../components/Header";
import { Input, Text } from "../../globalStyles";
import { ToastContainer } from "react-toastify";
import { toastSuccess } from "../../components/Toast";
function CreateUser() {
    const history = useNavigate()

    const initalState = dataUser.reduce(
        (acc, next) => ({ ...acc, [next.field]: next.initalValue }),
        {}
    );

    const [dataForm, setDataForm] = useState(initalState)

    const handleChange = (value: string, field: string) => {
        setDataForm({
            ...dataForm,
            [field]: value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        try {
            api.post("/user", dataForm, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }).then((result) => {
                toastSuccess("Usuário criado com sucesso")
            }).then(() => setTimeout(() => history("/adm"), 2000))
        } catch (error) {

        }
    };



    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Header />
            <ToastContainer />
            <h1>Criar usuário</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '30px' }}>
                    <div style={{ margin: '10px 50px' }}>
                        {dataUser.map((dataUsers, index) => (
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', textAlign: 'left', alignItems: 'center' }}>
                                <span>{dataUsers.nameField}</span>
                                <input
                                    key={index}
                                    name={dataUsers.nameField}
                                    type={dataUsers.type}
                                    onChange={(e) => handleChange(e.target.value, dataUsers.field)}
                                />
                            </div>
                        ))

                        }
                    </div>
                    <div>
                        <fieldset>
                            <legend>Insider</legend>
                             <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div>
                                    <Text>Validade</Text>
                                    <Input type="date" onChange={(e) => handleChange(e.target.value, "validateInsider")}/>
                                </div>
                                <div>
                                    <Text>Mult.lote</Text>
                                    <Input type="number" onChange={(e) => handleChange(e.target.value, "multpInsider")}/>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Explicitus</legend>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div>
                                    <Text>Validade</Text>
                                    <Input type="date" onChange={(e) => handleChange(e.target.value, "validateExplicitus")}/>
                                </div>
                                <div>
                                    <Text>Mult.lote</Text>
                                    <Input type="number" onChange={(e) => handleChange(e.target.value, "multpExplicitus")}/>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Poupança Dobrada</legend>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div>
                                    <Text>Validade</Text>
                                    <Input type="date" onChange={(e) => handleChange(e.target.value,"validatePoupDobrada" )}/>
                                </div>
                                <div>
                                    <Text>Mult.lote</Text>
                                    <Input type="number" onChange={(e) => handleChange(e.target.value, "multpPoupDobrada")}/>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <button style={{backgroundColor:'red', margin:'30px'}} onClick={() => history('/adm')}>Voltar</button>
                <button type="submit">Salvar</button>
            </form>
        </div>
    )
}

export default CreateUser
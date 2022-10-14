import React, { useState, FormEvent } from "react";
import api from "../../services/api";
import { useNavigate } from 'react-router-dom'
import { dataUser } from "../../utils/variableGlobal";
import Header from "../../components/Header";

function CreateUser() {
    const history = useNavigate()

    const initalState = dataUser.reduce(
        (acc, next) => ({ ...acc, [next.nameField]: next.initalValue }),
        {}
    );

    const [dataForm, setDataForm] = useState(initalState)

    const handleChange = (value: string, nameField: string) => {
        setDataForm({
            ...dataForm,
            [nameField]: value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        try {
            api
                .post("/user", dataForm, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                })
                .then((result) => {
                    history("/admin");
                });
        } catch (error) {

        }
    };



    return (
        <div style={{ width:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <Header/>
            <form onSubmit={handleSubmit}>
                {dataUser.map((dataUsers, index) => (
                    <div style={{ width:'100%',  display: 'flex', flexDirection: 'column', textAlign: 'left', alignItems: 'center' }}>
                        <span>{dataUsers.nameField}</span>
                        <input
                            key={index}
                            name={dataUsers.nameField}
                            type={dataUsers.type}
                            onChange={(e) => handleChange(e.target.value, dataUsers.nameField)}
                        />
                    </div>
                ))

                }
                <button onClick={()=>history('/adm')}>Voltar</button>
                <button type="submit">Salvar</button>
            </form>
        </div>
    )
}

export default CreateUser
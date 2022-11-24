import { List, MiniDiv, Text } from "../../globalStyles"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import api from "../../services/api";
import { getAdminKey, getToken, logoutToken } from "../../services/auth";
import Header from "../../components/Header";
import moment from "moment";
import { ToastContainer } from "react-toastify";

interface IProfile {
    id: number
    name: string
    email: string
    account: number
    phone: string
    ativated: string
    validateInsider: string
    balance: number
    balanceToday: number
    broker: string
    validateExplicitus: string
    validatePoupDobrada: string
}

function Adm() {

    const history = useNavigate()
    const [dataValue, setDataValue] = useState<IProfile[]>([])
    const [updateList, setUpdateList] = useState<boolean>(false)

    const changeUser = (id: number) => {
        history("/change", { state: { id } });
    }
    const saldoUser = (id: number) => {
        history("/main", { state: { id } });
    }

    const adjustData = (e: string) => {
        const adjDate: Date = new Date(e)
        return e === null ? "Não assinante" :  moment(adjDate).format("DD/MM/YYYY")
    }
    const colorAdjustData = (e: string) => {
        const adjDate: Date = new Date(e)
        const today: Date = new Date()
        return e === null ? "white" : (adjDate < today ? "#F84F31" : "#23C552")
    }
    useEffect(() => {
        if (getAdminKey() !== "Eu sou administrador") {
            history("/");
        }
        api.get('/user', {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        }).then(result => {
            setDataValue(result.data)
            setUpdateList(false)
        }).catch(error => {

            logoutToken()
            history("/");
        })
    }, [updateList])

    return (
        <div>
            <Header />
            <ToastContainer />
            <div style={{ width: '100%', display: 'flex' }}>
                <button onClick={() => history('/create')}>Cadastrar</button>
            </div>
            <h1>Usuários cadastrados</h1>
            {dataValue && dataValue.map((dataValues, index) => (
                <List key={index}>
                    <MiniDiv>
                        <Text>{dataValues.name}</Text>
                        <Text>{dataValues.email}</Text>
                    </MiniDiv>
                    <MiniDiv>
                        <Text>{dataValues.broker}</Text>
                        <Text>{dataValues.account}</Text>
                    </MiniDiv>
                    <MiniDiv>
                        <Text>Telefone</Text>
                        <Text>{dataValues.phone}</Text>
                    </MiniDiv>
                    <MiniDiv>
                        <Text>Insider</Text>
                        <Text style={{color:`${colorAdjustData(dataValues.validateInsider)}`}}>{adjustData(dataValues.validateInsider)}</Text>
                    </MiniDiv>
                    <MiniDiv>
                        <Text>Explicitus</Text>
                        <Text style={{color:`${colorAdjustData(dataValues.validateExplicitus)}`}}>{adjustData(dataValues.validateExplicitus)}</Text>
                    </MiniDiv>
                    <MiniDiv>
                        <Text>Poup.Dobrada</Text>
                        <Text style={{color:`${colorAdjustData(dataValues.validatePoupDobrada)}`}}>{adjustData(dataValues.validatePoupDobrada)}</Text>
                    </MiniDiv>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', margin:'20px' }}>
                        <button onClick={() => {
                            changeUser(dataValues.id);
                        }}>Perfil</button>
                        <button onClick={() => {
                            saldoUser(dataValues.id);
                        }}>Saldo</button>
                </div>
                </List>
    ))
}
        </div >
    )
}

export default Adm
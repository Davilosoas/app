import { List, MiniDiv, Text } from "../../globalStyles"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import api from "../../services/api";
import { getAdminKey, getToken, logoutToken } from "../../services/auth";
import { dataUser } from "../../utils/variableGlobal";
import Header from "../../components/Header";
import moment from "moment";
import { toastError, toastSuccess } from "../../components/Toast";
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

    const initalState = dataUser.reduce(
        (acc, next) => ({ ...acc, [next.nameField]: next.initalValue }),
        {}
    );

    const changeUser = (id: number) => {
        history("/change", { state: { id } });
    }
    const deleteUser = (e: number) => {
        try {
            api.delete(`/user/${e}`).then(result => {
                setUpdateList(true)
                toastSuccess("Usuário deletado com sucesso")
            })
        } catch (error) {
            toastError("Erro ao deletar usuário")
        }
    }

    const adjustData = (e: string) => {
        const adjDate: Date = new Date(e)
        const today: Date = new Date()
        return e === null ? "não assinante" : (adjDate < today ? "Assinatura vencida" : moment(adjDate).format("DD/MM/YYYY"))
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
            console.log(result.data)
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
                        <Text>{adjustData(dataValues.validateInsider)}</Text>
                    </MiniDiv>
                    <MiniDiv>
                        <Text>Explicitus</Text>
                        <Text>{adjustData(dataValues.validateExplicitus)}</Text>
                    </MiniDiv>
                    <MiniDiv>
                        <Text>Poup.Dobrada</Text>
                        <Text>{adjustData(dataValues.validatePoupDobrada)}</Text>
                    </MiniDiv>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', margin:'20px' }}>
                        <button onClick={() => {
                            changeUser(dataValues.id);
                        }}>Perfil</button>
                        {/*<button onClick={() => {
                            deleteUser(dataValues.id);
                        }} style={{ backgroundColor: `${dataValues.ativated==="N"?'red':'blue'}` }} >{dataValues.ativated==="N"?'Inativo':'Ativo'}</button>*/}
                </div>
                </List>
    ))
}
        </div >
    )
}

export default Adm
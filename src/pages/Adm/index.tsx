import { List, MiniDiv, Text } from "../../globalStyles"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import api from "../../services/api";
import { getAdminKey, getToken, logoutToken } from "../../services/auth";
import { dataUser } from "../../utils/variableGlobal";
import Header from "../../components/Header";
import moment from "moment";

interface IProfile {
    id: number
    name: string
    email: string
    account: number
    phone: string
    ativated: string
    validate: string
    balance: number
    balanceToday: number
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

            })
        } catch (error) {
            console.log('Erro ao deletar')

        }
    }

    const adjustData = (e: string) =>{
        const adjDate:Date = new Date(e)
        
        return moment(adjDate).format("DD/MM/YYYY")
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
            <button onClick={() => history('/create')}>Cadastrar</button>
            {dataValue && dataValue.map((dataValues, index) => (
                <List key={index}>
                    <MiniDiv>
                        <Text>Nome</Text>
                        <Text>{dataValues.name}</Text>
                    </MiniDiv>
                    <MiniDiv>
                        <Text>Email</Text>
                        <Text>{dataValues.email}</Text>
                    </MiniDiv>
                    <MiniDiv>
                        <Text>Nº da Conta</Text>
                        <Text>{dataValues.account}</Text>
                    </MiniDiv>
                    <MiniDiv>
                        <Text>Telefone</Text>
                        <Text>{dataValues.phone}</Text>
                    </MiniDiv>
                    <MiniDiv>
                        <Text>Validade</Text>
                        <Text>{adjustData(dataValues.validate)}</Text>
                    </MiniDiv>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                        <button onClick={() => {
                            changeUser(dataValues.id);
                        }}>Perfil</button>
                        {/*<ButtonAction onClick={() => {
                        AddValueMonth(dataValues.id);
                    }}>Saldo</ButtonAction>*/}
                        <button onClick={() => {
                            deleteUser(dataValues.id);
                        }} style={{ backgroundColor: 'red' }} >Deletar</button>
                    </div>
                </List>
            ))}
        </div>
    )
}

export default Adm
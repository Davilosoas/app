import { Container, MainCards } from "../../globalStyles"
import { CardValues } from "../../components/CardValues"
import Header from "../../components/Header"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { getAdminKey, getID } from "../../services/auth"
import { CardEmpty } from "../../components/CardEmpty"
import { useLocation } from "react-router-dom"
interface IData {
    assignInsider: boolean
    assignExplicitus: boolean
    assignPoupDobrada: boolean
}
function Main() {
    const location = useLocation()
    const [data, setData] = useState<IData>({
        "assignInsider": true,
        "assignExplicitus": false,
        "assignPoupDobrada": false
    })

    useEffect(() => {

        api.get(`/user/${location.state == null ? getID() : location.state.id}`,).then(result => {
            setData(result.data.validate)
        })

    }, [])

    const validateCard = (e: boolean, name: string) => {

        return e === true ? <CardValues title={name} /> : <CardEmpty title={name} />
    }

    const adm = () => {
        return getAdminKey() !== "Tester" ? true : false
    }
    return (
        <Container style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Header />
            <h1>Visualize seus lucros</h1>
            <MainCards >
                {validateCard(data.assignInsider, "Insider")}
                {validateCard(data.assignExplicitus, "Explicitus")}
                {validateCard(data.assignPoupDobrada, "Poupança Dobrada")}
            </MainCards>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center', padding: '50px' }}>
                <h3 style={{ borderBottom: '2px solid #e2aa2b' }}>Este é o resumo da sua conta, a soma de todo o seu lucro conosco</h3>
                <CardValues title="Resumo da Conta" />
            </div>
            {adm() &&
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>Fale com o nosso suporte</span>
                    <a
                        href="https://wa.me/5551981758799"
                        className="whatsapp_float"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={require('../../assets/whatsapp.png')} alt="Logo do whatsatpp" style={{ width: '50px', height: '50px', cursor: 'pointer' }} />
                    </a>
                </div>
            }
        </Container>
    )
}

export default Main
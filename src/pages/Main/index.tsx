import { CardBot, Container } from "../../globalStyles"
import { ReactComponent as Logo } from '../../assets/logo-blue.svg'
import { CardValues } from "../../components/CardValues"
import newLogo from '../../assets/jonas_marchioro_logo_vertical.png'
import Header from "../../components/Header"
function Main() {

    return (
        <Container style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Header/>
            <img src={newLogo} alt="logo Jonas Marchioro" width={300} height={150} style={{marginBottom: '50px'}}/>
            {/*<Logo width={300} height={150} style={{ margin: '0', padding: '0' }} />*/}
            <div style={{ display: 'flex', flexDirection: 'row', width: '100vw', justifyContent: 'space-around' }}>
                <CardValues title="Insider" />
                <CardValues title="Explicitus" />
                <CardValues title="Poupança Dobrada" />
            </div>
        </Container>
    )
}

export default Main
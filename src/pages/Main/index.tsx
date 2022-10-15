import { Container } from "../../globalStyles"
import { CardValues } from "../../components/CardValues"
import Header from "../../components/Header"
function Main() {

    return (
        <Container style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Header/>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100vw', justifyContent: 'space-around' }}>
                <CardValues title="Insider" />
                <CardValues title="Explicitus" />
                <CardValues title="Poupança Dobrada" />
            </div>
        </Container>
    )
}

export default Main
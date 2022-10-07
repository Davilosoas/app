import { LineChart } from "../../components/Chart"
import { CardBot, Container } from "../../globalStyles"
import {ReactComponent as Logo} from '../../assets/logo-blue.svg'

function Main() {
    return (
        <Container style={{flexDirection:'column', alignItems:'center'}}>
            <Logo width={300} height={150} style={{margin:'0',padding:'0'}}/>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100vw', justifyContent: 'space-around' }}>
                <CardBot>
                    <h1>Insider</h1>
                    <LineChart title="Saldo Operação em Aberto" label="em R$" />
                    <LineChart title="" label="em %" />
                    <LineChart title="Saldo Ordens Encerradas" label="em R$" />
                    <LineChart title="" label="em %" />
                </CardBot>
                <CardBot>
                    <h1>Explicitus</h1>
                    <LineChart title="Saldo Operação em Aberto" label="em R$" />
                    <LineChart title="" label="em %" />
                    <LineChart title="Saldo Ordens Encerradas" label="em R$" />
                    <LineChart title="" label="em %" />
                </CardBot>
                <CardBot>
                    <h1>Poupança Dobrada</h1>
                    <LineChart title="Saldo Operação em Aberto" label="em R$" />
                    <LineChart title="" label="em %" />
                    <LineChart title="Saldo Ordens Encerradas" label="em R$" />
                    <LineChart title="" label="em %" />
                </CardBot>
            </div>
        </Container>
    )
}

export default Main
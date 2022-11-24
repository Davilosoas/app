import { FormEvent, useState } from 'react'
import { Button, Card, Container, H3, Input, P1 } from '../../globalStyles'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import logosk from '../../assets/logosk.jpeg'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { setAdminKey, setID, setName, setToken } from '../../services/auth'
import { ToastContainer } from 'react-toastify'
import { toastError, toastSuccess } from "../../components/Toast";

function Login() {
    const history = useNavigate()
    const [password, setPassword] = useState<String>()
    const [email, setEmail] = useState<String>()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        try {
            api.post('/login', { email, password }, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            }).then(result => {
                setToken(result.data.token)
                setID(result.data.user.id)
                setName(result.data.user.name)
                setAdminKey(result.data.user.administrator)
                toastSuccess("Bem-vindo de volta")
            }).then(() => setTimeout(() => history("/main"), 4000))

        } catch (error) {
            toastError("E-mail ou senha inválida")
        }
    }


    return (
        <Container>
            <div>
                <img src={logosk} alt="Logo" style={{ width: '300px', height: '100px', marginTop:'10%' }} />
                {/*<Logo width={300} height={150} />*/}
                <ToastContainer />
                <Card>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                        <H3>E-mail</H3>
                        <Input type={'email'} onChange={e => setEmail(e.target.value)} />
                        <H3>Senha</H3>
                        <Input type={'password'} onChange={e => setPassword(e.target.value)} />
                        {/*P1 style={{cursor:'pointer'}} onClick={() => history('/forgot')}>Esqueci minha senha</P1>*/}
                        <Button type='submit'>Acessar</Button>
                    </form>
                </Card>
            </div>
        </Container>
    )
}

export default Login
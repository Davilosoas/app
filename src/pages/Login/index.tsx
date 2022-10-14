import { FormEvent, useState } from 'react'
import { Button, Card, Container, H3, Input, P1 } from '../../globalStyles'
import { ReactComponent as Logo } from '../../assets/logo-blue.svg'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { setAdminKey, setID, setName, setToken } from '../../services/auth'

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
                history("/main");
            })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Container>
            <div>
                <Logo width={300} height={150} />
                <Card>
                    <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>
                        <H3>E-mail</H3>
                        <Input type={'email'} onChange={e => setEmail(e.target.value)} />
                        <H3>Senha</H3>
                        <Input type={'password'} onChange={e => setPassword(e.target.value)} />
                        <P1>Esqueci minha senha</P1>
                        <Button type='submit'>Acessar</Button>
                    </form>
                </Card>
            </div>
        </Container>
    )
}

export default Login
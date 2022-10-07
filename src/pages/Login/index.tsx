import React from 'react'
import { Button, Card, Container, H3, Input, P1 } from '../../globalStyles'
import { ReactComponent as Logo } from '../../assets/logo-blue.svg'

function Login() {
    return (
        <Container>
            <div>
                <Logo width={300} height={150} />
                <Card>
                    <H3>E-mail</H3>
                    <Input type={'email'} />
                    <H3>Senha</H3>
                    <Input type={'password'} />
                    <P1>Esqueci minha senha</P1>
                    <Button>Acessar</Button>
                </Card>
            </div>
        </Container>
    )
}

export default Login
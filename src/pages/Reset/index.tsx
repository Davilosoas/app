import { useState } from 'react'
import { Container } from '../../globalStyles';
import api from "../../services/api";
import { useParams, useNavigate } from 'react-router-dom';
import { toastError, toastSuccess } from '../../components/Toast';
import { ToastContainer } from 'react-toastify';
import { ReactComponent as Logo } from '../../assets/logo.svg'

export function ResetPass(props: any) {
    const [password, setPassword] = useState<String>('')
    const [confirmPassword, setConfirmPassword] = useState<String>('')
    const { token, email } = useParams()
    const history = useNavigate()

    const handleReset = () => {
        if (password === confirmPassword) {
            api.post('/reset-password', { email, token, password })
                .then(result => {

                    toastSuccess("Senha alterada com sucesso")
                })
                .then(() => setTimeout(() => history("/"), 4000))
                .catch(error => {
                    toastError("Senhas não são iguais")
                })
        } else {
            toastError("Senhas não são iguais")
        }
    }
    return (
        <Container style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
            <ToastContainer />
            <Logo width={300} height={150} />
            <h1>Alterar Senha</h1>
            <span>Insira sua senha</span>
            <input onChange={e => setPassword(e.target.value)} />
            <span>Repita sua senha</span>
            <input onChange={e => setConfirmPassword(e.target.value)} />
            <button onClick={handleReset}>Salvar</button>
        </Container>
    )
}
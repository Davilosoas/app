import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toastSuccess } from "../../components/Toast";
import { Container } from "../../globalStyles";
import { ReactComponent as Logo } from '../../assets/logo.svg'

export function SendChangePass() {
    const history = useNavigate()
    const [email, setEmail] = useState<String>("")

    function handleForgot() {
        api.post('/forgot-password', { email })
            .then(result => {
                toastSuccess("E-mail enviado com sucesso!")
            })
            .then(() => setTimeout(() => history("/"), 4000))
            .catch(error => {
                history("/");
            })
    }
    return (
        <Container style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <ToastContainer />
            <Logo width={300} height={150} />
            <h1>Insira o seu e-mail</h1>
            <p style={{color:'#FFF'}}>Será enviado um e-mail para você trocar sua senha.</p>
            <input onChange={e => setEmail(e.target.value)} />
            <button onClick={handleForgot}>Enviar</button>
        </Container>
    )
}
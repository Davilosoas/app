import React from "react";
import { getAdminKey, logoutToken } from "../../services/auth";
import { useNavigate } from 'react-router-dom'
import newLogo from '../../assets/robotic-logo.png'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import logosk from '../../assets/logosk.jpeg'
import 'react-toastify/dist/ReactToastify.css';

function Header() {

    const history = useNavigate()

    const adm = () => {
        return getAdminKey() !== "Eu sou administrador" ? false : true
    }


    return (
        <div style={{ width: '95%', height: '65px', display: 'flex', flexDirection: 'row', textAlign: 'right', marginBottom: '10px', padding: '30px 30px 0px 30px', justifyContent: 'space-between', borderBottom: '4px solid #e2aa2b' }}>

            <div onClick={() => history('/main')} style={{ cursor: 'pointer' }}>
                <img src={logosk} alt="Logo" style={{ width: '200px', height: '70px', marginTop: '-15px', marginLeft: '-30px' }} />
                {/*<Logo style={{ width: '200px', height: '100px',marginTop:'-30px',marginLeft:'-30px' }} />*/}
            </div>
            <div>
                {adm() && <span style={{ marginRight: '20px', cursor: 'pointer' }}
                    onClick={() => {
                        history('/adm')
                    }}>Administrador</span>}
                <span style={{ cursor: 'pointer' }} onClick={() => {
                    logoutToken()
                    history('/')
                }
                }>Sair</span>
            </div>
        </div>
    )
}

export default Header
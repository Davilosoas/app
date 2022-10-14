import React from "react";
import { getAdminKey, logoutToken } from "../../services/auth";
import { useNavigate } from 'react-router-dom'
import newLogo from '../../assets/robotic-logo.png'

function Header() {
    const history = useNavigate()

    const adm = () => {
        return getAdminKey() !== "Eu sou administrador" ? false : true
    }


    return (
        <div style={{ width: '95%', height: '65px', display: 'flex', flexDirection: 'row', textAlign: 'right', marginBottom: '10px', padding: '30px 30px 0px 30px', justifyContent: 'space-between', borderBottom: '4px solid #e2aa2b' }}>
            <div>
                <img src={newLogo} alt="logo Jonas Marchioro" onClick={() => history('/main')} style={{width:'300px', height:'169px',marginTop:'-60px', marginBottom: '50px', cursor: 'pointer' }} />
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
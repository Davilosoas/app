import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { CardBot } from "../../globalStyles"
import api from "../../services/api"
import { getID } from "../../services/auth"


interface IProps {
    title: string
}
export function CardValues(props: IProps) {
    const location = useLocation()
    const [valueOpen, setValueOpen] = useState<number>(0)
    const [valueClosed, setValueClosed] = useState<number>(0)

    const colors = (e: number) => {
        return e >= 0 ? '#7CFC00' : 'red'
    }

    useEffect(() => {
        try {
            api.get(`balance/${location.state == null ? getID() : location.state.id}`,).then(result => {
                if (props.title === 'Insider') {
                    setValueClosed(result.data[0].closedOrdersInsider)
                    setValueOpen(result.data[0].openOrdersInsider)
                }
                if (props.title === 'Explicitus') {
                    setValueClosed(result.data[0].closedOrdersExplicitus)
                    setValueOpen(result.data[0].openOrdersExplicitus)
                }
                if (props.title === 'Poupança Dobrada') {
                    setValueClosed(result.data[0].closedOrdersPoupDobrada)
                    setValueOpen(result.data[0].openOrdersPoupDobrada)
                }
                if (props.title === 'Resumo da Conta') {
                    const totalClose = result.data[0].closedOrdersPoupDobrada + result.data[0].closedOrdersExplicitus + result.data[0].closedOrdersInsider
                    const totalOpen = result.data[0].openOrdersExplicitus + result.data[0].openOrdersInsider + result.data[0].openOrdersPoupDobrada
                    setValueClosed(totalClose)
                    setValueOpen(totalOpen)
                }
            })

        } catch (error) {

        }
    }, [])
    return (
        <div>
            <CardBot>
                <h1 style={{ borderBottom: '3px solid #e2aa2b' }}>{props.title}</h1>
                <h3>Saldo operações em aberto</h3>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <span>Valor</span>
                    <span style={{ fontSize: '24px', color: colors(valueOpen) }}>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(valueOpen)}</span>
                </div>

                <h3>Saldo operações encerradas</h3>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <span>Valor</span>
                    <span style={{ fontSize: '24px', color: colors(valueClosed) }}>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(valueClosed)}</span>
                </div>
            </CardBot>
        </div>
    )
}

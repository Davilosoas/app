import { useEffect, useState } from "react"
import { CardBot } from "../../globalStyles"
import api from "../../services/api"
import { getID } from "../../services/auth"


interface IProps {
    title: string
}
export function CardValues(props: IProps) {

    const [valueOpen, setValueOpen] = useState("0,00")
    const [percOpen, setPercOpen] = useState("0,00")
    const [valueClosed, setValueClosed] = useState("0,00")
    const [percClosed, setPercClosed] = useState("0,00")

    const colors = (e: number) => {
        return e >= 0 ? '#7CFC00' : 'red'
    }

    useEffect(() => {
        try {
            api.get(`balance/${getID()}`,).then(result => {
                console.log(result.data[0])
                setPercClosed((result.data[0].percClosedOrders).toFixed(2))
                setPercOpen((result.data[0].percOpenOrders).toFixed(2))
                setValueClosed(result.data[0].closedOrders)
                setValueOpen(result.data[0].openOrders)
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
                    <span>Percentual</span>
                    <span style={{ fontSize: '24px', color: colors(parseFloat(percOpen)) }}>{percOpen}%</span>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <span>Valor</span>
                    <span style={{ fontSize: '24px', color: colors(parseFloat(valueOpen)) }}>R${valueOpen}</span>
                </div>

                <h3>Saldo operações encerradas</h3>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <span>Percentual</span>
                    <span style={{ fontSize: '24px', color: colors(parseFloat(percClosed)) }}>{percClosed}%</span>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <span>Valor</span>
                    <span style={{ fontSize: '24px', color: colors(parseFloat(valueClosed)) }}>R${valueClosed}</span>
                </div>
            </CardBot>
        </div>
    )
}

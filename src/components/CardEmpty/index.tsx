import { CardBot } from "../../globalStyles"

interface IProps {
    title: string
}
export function CardEmpty(props: IProps) {

    return (
        <div>
            <CardBot>
                <h1 style={{ borderBottom: '3px solid #e2aa2b' }}>{props.title}</h1>
                <h3>Assine e lucre com nosso robô</h3>
           

                <h3>Fale com nosso suporte e saiba mais</h3>
       
            </CardBot>
        </div>
    )
}

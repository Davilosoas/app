import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface IProps {
    title: string
    label: string
}

export const mes = ['Janeiro', 'Fevereiro', 'Março', 'Abril']
export const valor = [290, 543, 902, 1]

export function LineChart(props:IProps) {
    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
            title: {
                display: false,
                text: props.title
            }
        },
        scales: {
            x: {
                grid: {
                    drawBorder: true,
                    color: '#c3c3c3'
                }
            },
            y: {
                grid: {
                    drawBorder: true,
                    color: '#c3c3c3'
                }
            }
        }
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <h4>{props.title}</h4>
            <Line options={options} data={
                {
                    labels: mes,
                    datasets: [
                        {
                            label: props.label,
                            data: valor,
                            borderColor: '#efb810',
                            backgroundColor: '#efb810',
                            tension: 0.1
                        }],

                }
            } />
        </div>
    )
}


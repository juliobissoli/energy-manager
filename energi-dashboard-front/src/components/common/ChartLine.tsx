import { Invoice } from "@/interfaces/invoices";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";


export interface EntitiesToChartLine {
    name: 'consumeAmountInKwh' | 'consumeUnitValue' | 'consumeTotalValue' | 'invoiceValue' | 'publicTaxValue' | 'fullConsumedEnergy' | 'compensatedEnergy' | 'economyGD' | 'valueWithoutGD' | 'energyCompensated'
    label: string
    color: string
}

export interface ChartLineProps {
    data: Array<Invoice>
    title: string
    entities: Array<EntitiesToChartLine>
}

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    },
    elements: {
        line: {
            tension: 0.4 // Suaviza as curvas do gráfico
        },
        point: {
            radius: 2 // Define o raio dos marcadores para 1px
        }
    }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const defaultData = {
    labels,
    datasets: [],
};



export default function ChartLine({ data, title, entities }: ChartLineProps) {
    const [chartData, setChartData] = useState(defaultData)

    useEffect(() => {
        prepareData(data);
    }, [data]);


    const prepareData = (data: Array<Invoice>) => {
        const mapAcc: Map<string, any> = new Map()

        data.forEach((invoice) => {
            const currentData: any = {}
            
            entities.forEach((entity) => {
                currentData[entity.name] = invoice[entity.name]
            })

            const dataAccumulated = mapAcc.get(invoice.invoiceDateRef)
            if (!dataAccumulated) {
                mapAcc.set(invoice.invoiceDateRef, currentData)
            } else {
                const newData = {
                    ...dataAccumulated,
                }
                entities.forEach((entity) => {
                    newData[entity.name] = dataAccumulated[entity.name] + currentData[entity.name]
                })
                mapAcc.set(invoice.invoiceDateRef, newData)
            }
        })

        mountChartData(mapAcc)

    }


    const mountChartData = (mapAcc: Map<string, any>) => {


        const data = {
            labels: Array.from(mapAcc.keys()),
            datasets: entities.map((entity) => ({
                label: entity.label,
                data: Array.from(mapAcc.values()).map((value) => value[entity.name]),
                borderColor: entity.color,
                backgroundColor: entity.color,
            })),
        }

        setChartData(data)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <Line options={options} data={chartData} />
            </CardContent>
        </Card>
    )
}


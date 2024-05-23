import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Invoice } from "@/interfaces/invoices";
import api from "@/serve/api"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"


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
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const defaultData = {
    labels,
    datasets: [],
};


export default function Dashboard() {


    const [chartData, setChartData] = useState<any>(defaultData)
    const [chartDataPayman, setChartDataPayman] = useState<any>(defaultData)

    useEffect(() => {
        api.get('/invoices').then((response) => {
            console.log(response.data)
            prepareData(response.data)
        })

    }, [])


    const prepareData = (data: Array<Invoice>) => {
        const mapAcc: Map<string, any> = new Map()

        data.forEach((invoice) => {
            const currentData = {
                consumeAmountInKwh: invoice.consumeAmountInKwh,
                consumeUnitValue: invoice.consumeUnitValue,
                consumeTotalValue: invoice.consumeTotalValue,
                invoiceValue: invoice.invoiceValue,
                publicTaxValue: invoice.publicTaxValue,
            }

            const dataAccumulated = mapAcc.get(invoice.invoiceDateRef)
            if (!dataAccumulated) {
                mapAcc.set(invoice.invoiceDateRef, currentData)
            } else {
                mapAcc.set(invoice.invoiceDateRef, {
                    ...dataAccumulated,
                    consumeAmountInKwh: dataAccumulated.consumeAmountInKwh + currentData.consumeAmountInKwh,
                    consumeUnitValue: dataAccumulated.consumeUnitValue + currentData.consumeUnitValue,
                    consumeTotalValue: dataAccumulated.consumeTotalValue + currentData.consumeTotalValue,
                    invoiceValue: dataAccumulated.invoiceValue + currentData.invoiceValue,
                    publicTaxValue: dataAccumulated.publicTaxValue + currentData.publicTaxValue,
                })
            }
        })

        mountChartData(mapAcc)

    }


    const mountChartData = (mapAcc: Map<string, any>) => {


        const entitiesConsume = [
            { name: 'consumeAmountInKwh', label: 'Consumo em KwH', color: '#84cc16' },
            { name: 'consumeUnitValue', label: 'Consumo por Unidade', color: '#3b82f6' },
            { name: 'consumeTotalValue', label: 'Consumo Total', color: '#ef4444' },
        ]

        const dataConsume = {
            labels: Array.from(mapAcc.keys()),
            datasets: entitiesConsume.map((entity) => ({
                label: entity.label,
                data: Array.from(mapAcc.values()).map((value) => value[entity.name]),
                borderColor: entity.color,
                backgroundColor: entity.color,
            })),
        }


        const entitiesPaymant = [
            { name: 'invoiceValue', label: 'Valor da Fatura', color: '#f97316' },
            { name: 'publicTaxValue', label: 'Valor da Taxa Publica', color: '#d946ef' },
        ]

        const dataPaymant = {
            labels: Array.from(mapAcc.keys()),
            datasets: entitiesPaymant.map((entity) => ({
                label: entity.label,
                data: Array.from(mapAcc.values()).map((value) => value[entity.name]),
                borderColor: entity.color,
                backgroundColor: entity.color,
            })),
        }

        setChartData(dataConsume)
        setChartDataPayman(dataPaymant)
    }


    return (
        <AppLayout>
            <div className="w-full ">
                <Card>
                    <CardHeader>
                        <CardTitle>Acumulado Mensal de Consumo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Line options={options} data={chartData} />
                    </CardContent>
                </Card>

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Acumulado Mensal de Fatura</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Line options={options} data={chartDataPayman} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}


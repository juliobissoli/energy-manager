import { Invoice } from "@/interfaces/invoices"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useEffect, useState } from "react"


export interface ChartLineProps {
    data: Array<Invoice>
    title: string
    prefix?: string
    entity: 'consumeAmountInKwh' | 'consumeUnitValue' | 'consumeTotalValue' | 'invoiceValue' | 'publicTaxValue' | 'fullConsumedEnergy' | 'compensatedEnergy' | 'economyGD' | 'valueWithoutGD' | 'energyCompensated'
}


export const TotalizerCard = ({ data, title, prefix, entity }: ChartLineProps) => {

    const [totalizerValue, setTotalizerValue] = useState(0)

    useEffect(() => {
        const totalizer = data.reduce((acc, curr) => {
            return acc + curr[entity]
        }, 0)
        setTotalizerValue(totalizer)
    }, [data, entity])
    return (
        <Card>
            <CardHeader>
                <p className="">
                    <span className="text-zinc-500 text-xxs mr-2">
                        {prefix}
                    </span>
                    <span className="text-4xl font-semibold">
                        {totalizerValue.toFixed(2)}
                    </span>
                </p>
            </CardHeader>
            <CardContent>
                <span>{title}</span>
            </CardContent>
        </Card>
    )
}


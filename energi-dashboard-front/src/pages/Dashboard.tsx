import AppLayout from "@/components/AppLayout";
import { BtnFilterDate } from "@/components/common/BtnFilterDate";
import ChartLine, { EntitiesToChartLine } from "@/components/common/ChartLine";
import { TotalizerCard } from "@/components/common/TotalizerCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast";
import { Invoice } from "@/interfaces/invoices";
import api from "@/serve/api"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Dashboard() {

    const navigate = useNavigate(

    );
    const queryString = new URLSearchParams(window.location.search);
    const dateInit = queryString.get('dateInit') || `${new Date().getFullYear() - 1}-01-01`;
    const dateEnd = queryString.get('dateEnd') || `${new Date().getFullYear() - 1}-12-01`;

    const [invoices, setInvoices] = useState<Array<Invoice>>([])

    const { toast } = useToast()
    useEffect(() => {
        api.get(`/invoices?dateInit=${dateInit}&dateEnd=${dateEnd}`).then((response) => {
            setInvoices(response.data)
        }
        ).catch((error) => {
            toast({
                title: "Erro ao buscar as faturas",
                description: error.message,
                variant: "destructive",
            })
        })

    }, [dateInit, dateEnd])

    function handleFilterDate(data: { dataInit: Date, dateEnd: Date }) {
        const newDateInit = data.dataInit.toISOString().split('T')[0];
        const newDateEnd = data.dateEnd.toISOString().split('T')[0];
        navigate(`?dateInit=${newDateInit}&dateEnd=${newDateEnd}`);
    }

    const entitiesConsume: EntitiesToChartLine[] = [
        { name: 'consumeAmountInKwh', label: 'Consumo em KwH', color: '#84cc16' },
        { name: 'fullConsumedEnergy', label: 'Energia total consumida', color: '#3b82f6' },
        { name: 'economyGD', label: 'Economia com GD', color: '#ef4444' },
        { name: 'compensatedEnergy', label: 'Energia compensada', color: '#cccccc' },
    ]
    const entitiesPaymant: EntitiesToChartLine[] = [
        { name: 'invoiceValue', label: 'Valor da Fatura', color: '#f97316' },
        { name: 'consumeTotalValue', label: 'Valor total do consumo', color: '#d946ef' },
    ]





    return (
        <AppLayout>

            <header className="flex flex-col md:flex-row justify-between md:items-end mt-8 border-b py-4">
                <div>
                    <p className="md:text-6xl text-5xl"> Visão Geral</p>
                </div>
                <BtnFilterDate dataInit={dateInit} dateEnd={dateEnd} functionApply={handleFilterDate} />

            </header>

            <p className="text-zinc-500">Aqui estao apresentado os dadas intalacoes referente ao periodo selecionado</p>

            <section className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    <TotalizerCard data={invoices} prefix="kwh"   title="Gasto energético total" entity="consumeAmountInKwh" />
                    <TotalizerCard data={invoices} prefix="kwh"  title="Economia de energia total" entity="economyGD" />
                    <TotalizerCard data={invoices} prefix="R$" title="Valor da fatura total" entity="invoiceValue" />
                    <TotalizerCard data={invoices} prefix="R$" title="Valor total do consumo" entity="consumeTotalValue" />
                </div>
                <div className="w-full ">
                    <ChartLine data={invoices} title="Gasto energético" entities={entitiesConsume} />
                    <ChartLine data={invoices} title="Valores pagos" entities={entitiesPaymant} />
                </div>
            </section>
        </AppLayout>
    )
}


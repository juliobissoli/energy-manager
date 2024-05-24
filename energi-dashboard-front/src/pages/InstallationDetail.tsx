import AppLayout from "@/components/AppLayout";
import BackButton from "@/components/BackButton";
import { BtnFilterDate } from "@/components/common/BtnFilterDate";
import { InvoiceCard } from "@/components/invoice/InvoiceCard";
import { Installation } from "@/interfaces/installations";
import { useEffect, useState } from "react";
import api from "@/serve/api";
import { Invoice } from "@/interfaces/invoices";
import { useNavigate, useParams } from "react-router-dom";
import ChartLine, { EntitiesToChartLine } from "@/components/common/ChartLine";
import { TotalizerCard } from "@/components/common/TotalizerCard";

export function InstallationDetail() {
    const [installation, setInstallation] = useState<Installation>({
        id: "",
        number: "",
        clientName: "",
        clientNumber: "",
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    const [invoices, setInvoices] = useState<Invoice[]>([])

    const { id } = useParams<{ id: string }>();
    const queryString = new URLSearchParams(window.location.search);
    const dateInit = queryString.get('dateInit') || `${new Date().getFullYear() - 1}-01-01`;
    const dateEnd = queryString.get('dateEnd') || `${new Date().getFullYear() - 1}-12-01`;
    useEffect(() => {

        api.get(`/installations/${id}`).then((response) => {
            setInstallation(response.data)
        })

        const url = `/invoices?installationId=${id}&dateInit=${dateInit}&dateEnd=${dateEnd}`

        api.get(url).then((response) => {
            setInvoices(response.data)
        })
    }, [id, dateInit, dateEnd])


    const navigate = useNavigate();
    function handleFilterDate(data: { dataInit: Date, dateEnd: Date }) {
        const newDateInit = data.dataInit.toISOString().split('T')[0];
        const newDateEnd = data.dateEnd.toISOString().split('T')[0];
        navigate(`/installations/${id}?dateInit=${newDateInit}&dateEnd=${newDateEnd}`);
    }


    const entitiesConsume: EntitiesToChartLine[] = [
        { name: 'consumeAmountInKwh', label: 'Consumo em KwH', color: '#84cc16' },
        { name: 'fullConsumedEnergy', label: 'Energia total consumida', color: '#3b82f6' },
        { name: 'economyGD', label: 'Economia com GD', color: '#ef4444' },
        { name: 'compensatedEnergy', label: 'Energia compensada', color: '#cccccc' },
    ]


    const entitiesPayment: EntitiesToChartLine[] = [
        { name: 'invoiceValue', label: 'Valor da fatura', color: '#84cc16' },
        { name: 'publicTaxValue', label: 'Valor da taxa pblica', color: '#3b82f6' },
        { name: 'valueWithoutGD', label: 'Valor sem GD', color: '#ef4444' },
    ]



    return (
        <AppLayout>

            <BackButton />

            <header className="flex flex-col md:flex-row justify-between md:items-end mt-8 border-b py-4">
                <div>
                    <p className="text-xxs text-zinc-500">Nmero da instalação</p>
                    <p className="md:text-6xl text-5xl"> {installation.number}</p>
                </div>
                <BtnFilterDate dataInit={dateInit} dateEnd={dateEnd} functionApply={handleFilterDate} />

            </header>

            <section className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    <TotalizerCard data={invoices} prefix="kwh" title="Gasto energético total" entity="consumeAmountInKwh" />
                    <TotalizerCard data={invoices} prefix="kwh" title="Economia de energia total" entity="economyGD" />
                    <TotalizerCard data={invoices} prefix="R$" title="Valor da fatura total" entity="invoiceValue" />
                    <TotalizerCard data={invoices} prefix="R$" title="Valor total do consumo" entity="consumeTotalValue" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <ChartLine data={invoices} title="Gasto energético" entities={entitiesConsume} />
                    <ChartLine data={invoices} title="Valores pagos" entities={entitiesPayment} />
                </div>
            </section>

            <section className="mt-10">
                <h2 className="text-2xl">Faturas</h2>

                <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 ">
                    {
                        invoices.map((invoice) => (
                            <li key={invoice.id}>
                                <InvoiceCard invoice={invoice} />
                            </li>
                        ))
                    }

                </ul>
            </section>

        </AppLayout>
    )
}


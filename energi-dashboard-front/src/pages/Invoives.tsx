import AppLayout from "@/components/AppLayout"
import { BtnFilterDate } from "@/components/common/BtnFilterDate"
import { InvoiceCard } from "@/components/invoice/InvoiceCard"
import { Invoice } from "@/interfaces/invoices"
import api from "@/serve/api"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Invoices() {

    const [invoices, setInvoices] = useState<Invoice[]>([])

    const queryString = new URLSearchParams(window.location.search);
    const dateInit = queryString.get('dateInit') || `${new Date().getFullYear() - 1}-01-01`;
    const dateEnd = queryString.get('dateEnd') || `${new Date().getFullYear() - 1}-12-01`;


    useEffect(() => {

        const url = `/invoices?dateInit=${dateInit}&dateEnd=${dateEnd}`

        api.get(url).then((response) => {
            setInvoices(response.data)
        })
    }, [dateInit, dateEnd])

    const navigate = useNavigate();
    function handleFilterDate(data: { dataInit: Date, dateEnd: Date }) {
        const newDateInit = data.dataInit.toISOString().split('T')[0];
        const newDateEnd = data.dateEnd.toISOString().split('T')[0];
        navigate(`/installations?dateInit=${newDateInit}&dateEnd=${newDateEnd}`);
    }


    return (
        <AppLayout>


            <header className="flex flex-col md:flex-row justify-between md:items-end mt-8 border-b py-4">
                <div>
                    <p className="md:text-6xl text-5xl"> Faturas</p>
                </div>
                <BtnFilterDate dataInit={dateInit} dateEnd={dateEnd} functionApply={handleFilterDate} />

            </header>

            <section className="mt-10">
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


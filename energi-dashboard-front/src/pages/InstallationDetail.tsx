import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Installation } from "@/interfaces/installations";
import { Invoice } from "@/interfaces/invoices";
import api from "@/serve/api";
import { Download, FileText, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    useEffect(() => {
        api.get(`/installations/${id}`).then((response) => {
            setInstallation(response.data)
        })

        api.get(`/invoices?installation_id=${id}`).then((response) => {
            console.log(response.data)
            setInvoices(response.data)
        })
    }, [id])



    function downloadInvoice(invoiceId: string) {
        console.log("download")
        api.get(`/invoices/${invoiceId}/download`, { responseType: 'blob' }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `fatura-${invoiceId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link?.parentNode?.removeChild(link);
        })
    }

    return (
        <AppLayout>
            <h1 className="text-4xl font-bold">Detalhes da instalação {installation.number}</h1>


            <section className="mt-10">
                <h2 className="text-2xl border-b">Faturas</h2>

                <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 ">
                    {
                        invoices.map((invoice) => (
                            <li key={invoice.id}>
                                <Card className="">
                                    <CardHeader>
                                        <FileText size={32} />
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <p className="text-semibold text-2xl">{invoice.invoiceDateRef}</p>
                                        <p className="text-zinc-500 mt-4 text-sm">Venc.:{invoice.invoiceDueDate}</p>
                                        <p className="w-full  truncate">Valor R${invoice.consumeTotalValue}</p>
                                    </CardContent>
                                    <CardFooter className="flex justify-end">
                                        <Button onClick={() => downloadInvoice(invoice.id)} variant={"outline"} size={"icon"}>
                                            <Download size={14} />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </li>
                        ))
                    }
                    
                </ul>
            </section>

        </AppLayout>
    )
}


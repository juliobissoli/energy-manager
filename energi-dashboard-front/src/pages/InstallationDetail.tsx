import AppLayout from "@/components/AppLayout";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Installation } from "@/interfaces/installations";
import { Invoice } from "@/interfaces/invoices";
import api from "@/serve/api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Calendar, Download, FileText, UserCog } from "lucide-react";
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

        api.get(`/invoices?installationId=${id}`).then((response) => {
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

            <BackButton />

            <header className="flex justify-between items-end mt-8 border-b py-4">
                <div>
                    <p className="text-xxs text-zinc-500">Nmero da instalação</p>
                    <h1 className="text-6xl "> {installation.number}</h1>
                </div>
                <div className="gap-2 text-right cursor-pointer">
                    <p className="text-xxs text-zinc-500">Referencia</p>
                    <p className="text-xl font-light flex items-center gap-2">DEZ/2022 a MAR/2023
                        <Calendar size={18} />
                    </p>
                </div>


            </header>


            <section className="mt-10">
                <h2 className="text-2xl">Faturas</h2>



                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Button variant="link">@nextjs</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                            teste
                        </div>
                    </HoverCardContent>
                </HoverCard>

                <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 ">
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


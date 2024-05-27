import { Download, FileText, Loader2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import api from "@/serve/api";
import { Invoice } from "@/interfaces/invoices";
import { useState } from "react";
import { useToast } from "../ui/use-toast";


export function InvoiceCard({ invoice }: { invoice: Invoice }) {

    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast()


    async function downloadInvoice() {

        setIsLoading(true)
        api.get(`/invoices/${invoice.id}/download`, { responseType: 'blob' }).then((response) => {
            setIsLoading(false)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${invoice.installNumber}-${invoice.invoiceDateRef.replace(/\//g, '-')}.pdf`);
            document.body.appendChild(link);
            link.click();
            link?.parentNode?.removeChild(link);
        },
            (error) => {
                setIsLoading(false)
                toast({
                    title: "Erro ao buscar as faturas",
                    description: error.message,
                    variant: "destructive",
                })
            }
        )
    }


    return (
        <Card className="">
            <CardHeader>
                <FileText size={32} />
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-semibold text-2xl">{invoice.invoiceDateRef}</p>
                <p className="text-zinc-500 mt-4 text-sm">Venc. {invoice.invoiceDueDate}</p>
                <p className="w-full  truncate">Valor R${invoice.consumeTotalValue}</p>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button disabled={isLoading} onClick={downloadInvoice} variant={"outline"} size={"icon"}>
                    {isLoading ? <Loader2 size={14} className="animate-spin " /> : <Download size={14} />}
                </Button>
            </CardFooter>
        </Card>
    )
}


import { Button } from "@/components/ui/button"
import moment from "moment"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Calendar } from "lucide-react"
import { useEffect, useState } from "react"

interface BtnFilterDateProps {
    dataInit: string;
    dateEnd: string;
    functionApply: (data: {
        dataInit: Date;
        dateEnd: Date;
    }) => void;
}

export function BtnFilterDate({ dataInit, dateEnd, functionApply }: BtnFilterDateProps) {

    const months = ['--', 'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']


    const [initMonth, setInitMonth] = useState(new Date().getMonth())
    const [initYear, setInitYear] = useState(new Date().getFullYear())

    const [endMonth, setEndMonth] = useState(new Date().getMonth())
    const [endYear, setEndYear] = useState(new Date().getFullYear())

    useEffect(() => {
        setInitMonth(moment(dataInit).month() + 1)
        setInitYear( moment(dataInit).year())


        setEndMonth(moment(dateEnd).month() + 1)
        setEndYear( moment(dateEnd).year())
    }, [dataInit, dateEnd])



    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="gap-2 text-right cursor-pointer hover:bg-foreground/10 p-2 rounded-md">
                    <p className="text-xxs text-zinc-500">Referência</p>
                    <p className="text-xl font-light flex justify-end items-center gap-2 ">
                        <span className="uppercase">{months[initMonth]}/{initYear}</span>
                        a
                        <span className="uppercase">{months[endMonth]}/{endYear}</span>
                        <Calendar size={18} />
                    </p>
                </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Alterar referencias</SheetTitle>
                    <SheetDescription>
                        Escola os periodos de inicio e fim da referencia
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                    <p className="text-xs text-zinc-500"> {initMonth}-{initYear}</p>
                    <div className="flex items-center gap-4">
                        <select className="w-1/2 bg-transparent px-4 py-2 border border-border rounded-xl"
                            value={initMonth}
                            onChange={(e) => setInitMonth(Number(e.target.value))}
                        >
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                                    <option key={item} className="bg-background rounded-md px-4 py-2" value={item}>{
                                        months[item]
                                    }</option>
                                ))
                            }
                        </select>
                        <select
                            value={initYear}
                            onChange={(e) => setInitYear(Number(e.target.value))}
                            className="w-1/2 bg-transparent px-4 py-2 border border-border rounded-xl">
                            {
                                [6, 5, 4, 3, 2, 1, 0].map((item) => (
                                    <option key={item} className="bg-background rounded-md px-4 py-2" value={new Date().getFullYear() - item}>
                                        {new Date().getFullYear() - item}
                                    </option>
                                ))
                            }
                        </select>
                    </div>


                    <p className="text-xs text-zinc-500 mt-8">Fim</p>
                    <div className="flex items-center gap-4">
                        <select
                            value={endMonth}
                            onChange={(e) => setEndMonth(Number(e.target.value))}
                            className="w-1/2 bg-transparent px-4 py-2 border border-border rounded-xl">
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                                    <option key={item} className="bg-background rounded-md px-4 py-2" value={item}>{
                                        months[item]
                                    }</option>
                                ))
                            }
                        </select>
                        <select
                            value={endYear}
                            onChange={(e) => setEndYear(Number(e.target.value))}
                            className="w-1/2 bg-transparent px-4 py-2 border border-border rounded-xl">
                            {
                                [6, 5, 4, 3, 2, 1, 0].map((item) => (
                                    <option key={item} className="bg-background rounded-md px-4 py-2" value={new Date().getFullYear() - item}>
                                        {new Date().getFullYear() - item}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" onClick={() => {
                            functionApply({
                                dataInit: new Date(`${initYear}-${initMonth}-01`),
                                dateEnd: new Date(endYear, endMonth, 1)
                            })
                        }}>Aplicar</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

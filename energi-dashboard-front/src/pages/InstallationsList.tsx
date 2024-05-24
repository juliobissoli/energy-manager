import AppLayout from "@/components/AppLayout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Installation } from "@/interfaces/installations"
import api from "@/serve/api"
import { UserCog } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function InstallationsList() {

    useEffect(() => {
        api.get('/installations')
            .then(response => {
                setInstallations(response.data)
            })
    }, [])


    const [installations, setInstallations] = useState<Installation[]>([])

    return (
        <AppLayout>
            <h1 className="text-4xl py-2 border-b">Instalacoes</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {installations.map((installation: Installation) => (
                    <div key={installation.id} className="">
                        <Link to={`/installations/${installation.id}`}>
                            <Card className="hover:bg-foreground/10 hover:shadow-md cursor-pointer">
                                <CardHeader>
                                    <UserCog size={32} />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-semibold text-2xl">{installation.number}</p>
                                    <p className="text-zinc-500 mt-4 text-sm">Titular</p>
                                    <p className="w-full  truncate">{installation.clientName}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        </AppLayout>
    )
}


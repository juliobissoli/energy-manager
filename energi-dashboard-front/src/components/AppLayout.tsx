import { FileText, Plug, Rocket, SquareActivity } from "lucide-react";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

const AppLayout = ({ children }: { children: ReactNode }) => {
    const { pathname } = useLocation();
    const routers = [
        { name: "Dashboard", path: "/", icon: <Rocket size={14} /> },
        { name: "Instalaçes", path: "/installations", icon: <SquareActivity size={14} /> },
        { name: "Faturas", path: "/invoices", icon: <FileText size={14} /> },
    ]
    return (
        <>
            <div className="w-full max-w-6xl mx-auto px-4">
                <div className="sticky bg-background/10 backdrop-blur-sm top-0 left-0 right-0 z-50">

                    <nav className="flex items-center justify-between py-4  ">
                        <Link to="/">
                            <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                                <Plug className="h-6 w-6" />
                            </div>
                        </Link>
                        <div className="flex gap-4">
                            <ul className='flex items-center space-x-4'>
                                {
                                    routers.map((router) => (
                                        <li key={router.name}>
                                            <Link to={router.path}>
                                                <Button variant="ghost" className={pathname === router.path ? "text-purple-500" : ""}>{
                                                    router.icon}
                                                    <span className="ml-1 hidden md:inline">
                                                        {router.name}
                                                    </span>
                                                </Button>
                                            </Link>
                                        </li>
                                    ))
                                }
                                {/* <li> <Link to="/"><Button variant="ghost" className={pathname === "/" ? "text-purple-500" : ""}>Dashboard</Button></Link></li>
                                <li> <Link to="/installations"><Button variant="ghost" className={pathname === "/installations" ? "text-purple-500" : ""}>Instalações</Button></Link></li>
                                <li> <Link to="/invoices"><Button variant="ghost" className={pathname === "/invoices" ? "text-purple-500" : ""}>Faturas</Button></Link></li> */}
                            </ul>
                        </div>
                        <ThemeToggle />
                    </nav>
                </div>
                <main className="py-4">
                    {children}
                </main>
            </div>
        </>
    )
}


export default AppLayout;


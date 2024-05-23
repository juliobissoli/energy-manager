import { SquareActivity } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const AppLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="w-full max-w-6xl mx-auto px-4">
                <nav className="flex items-center justify-between py-4">
                    <div className="logo">
                        <SquareActivity className="h-[2rem] w-[2rem]" />
                    </div>
                    <div className="flex gap-4">
                        <ul className='flex items-center space-x-4'>
                            <li> <Link to="/">Dashboard</Link></li>
                            <li> <Link to="/installations">Instalacoes</Link></li>
                        </ul>
                        <ThemeToggle />
                    </div>
                </nav>
                <main className="py-4">
                    {children}
                </main>
            </div>
        </>
    )
}


export default AppLayout;


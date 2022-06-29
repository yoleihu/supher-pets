import { Navbar } from "../components/Navbar";

export function Home() {
  return(
    <div className="flex flex-col min-h-screen items-center">
        <div className="w-4/5">
            <Navbar/>

        </div>
    </div>
  )
}
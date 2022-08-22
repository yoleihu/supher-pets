import { Footer } from "../components/Footer";
import { UserForm } from "../components/UserForm";
import { Navbar } from "../components/Navbar";

export function Register() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <section className="lg:mt-20 mt-20 mb-1">
        <UserForm isRegister />
      </section>
      <footer className="mt-6">
        <Footer />
      </footer>
    </>
  )
}
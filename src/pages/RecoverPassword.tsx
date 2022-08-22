import { Footer } from "../components/Footer";
import { UserForm } from "../components/UserForm";
import { Navbar } from "../components/Navbar";

export function RecoverPassword() {
  return (
    <>
      <Navbar />
      <section className="lg:mt-32 mt-44">
        <UserForm isRecoverPassword />
      </section>
      <footer className="bottom-0 w-full absolute">
        <Footer />
      </footer>
    </>
  )
}
import { Footer } from "../components/Footer";
import { FormInput } from "../components/FormInput";
import { Navbar } from "../components/Navbar";

export function Register() {
  return (
    <>
      <Navbar />
      <section className="lg:mt-28 mt-20 mb-3 lg:mb-0">
        <FormInput isRegister />
      </section>
      <footer className="mt-5">
        <Footer />
      </footer>
    </>
  )
}
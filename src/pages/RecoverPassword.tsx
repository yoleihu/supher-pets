import { Footer } from "../components/Footer";
import { FormInput } from "../components/FormInput";
import { Navbar } from "../components/Navbar";

export function RecoverPassword() {
  return (
    <>
      <Navbar />
      <section className="lg:mt-52 mt-32">
        <FormInput isRecoverPassword />
      </section>
      <footer className="absolute bottom-0 w-full">
        <Footer />
      </footer>
    </>
  )
}
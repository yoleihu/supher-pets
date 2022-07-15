import { Footer } from "../components/Footer";
import { FormInput } from "../components/FormInput";
import { Navbar } from "../components/Navbar";

export function Register() {
  return (
    <>
      <Navbar />
      <section className="mt-32 ">
        <FormInput />
      </section>
      <footer className="absolute bottom-0 w-full">
        <Footer />
      </footer>
    </>
  )
}
import { Footer } from "../components/Footer";
import { FormInput } from "../components/FormInput";
import { Navbar } from "../components/Navbar";

export function Login() {
  return (
    <>
      <Navbar />
      <section className="lg:mt-52 mt-32 flex items-center justify-center">
        <FormInput />
      </section>
      <footer className="absolute bottom-0 w-full">
        <Footer />
      </footer>
    </>
  )
}
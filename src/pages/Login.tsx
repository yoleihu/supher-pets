import { Footer } from "../components/Footer";
import { UserForm } from "../components/UserForm";
import { Navbar } from "../components/Navbar";

export function Login() {
  return (
    <>
      <Navbar />
      <section className="lg:mt-[5.5rem] mt-32">
        <UserForm isLogin />
      </section>
      <footer className="bottom-0 w-full absolute">
        <Footer />
      </footer>
    </>
  )
}
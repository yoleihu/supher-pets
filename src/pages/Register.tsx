import { Footer } from "../components/Footer";
import { UserForm } from "../components/Forms/UserForm";
import { Navbar } from "../components/Navbar";

export function Register() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <section className="lg:mt-28 mt-24 mb-6">
        <UserForm isRegister />
      </section>
      <Footer />
    </>
  );
}

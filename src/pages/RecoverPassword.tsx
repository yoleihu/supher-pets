import { Footer } from "../components/Footer";
import { UserForm } from "../components/UserForm";
import { Navbar } from "../components/Navbar";

export function RecoverPassword() {
  return (
    <>
      <Navbar />
      <section className="lg:mt-32 sm:mt-20 mt-44 mb-6">
        <UserForm isRecoverPassword />
      </section>
      <Footer />
    </>
  );
}

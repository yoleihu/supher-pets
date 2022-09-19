import { Footer } from "../components/Footer";
import { UserForm } from "../components/Forms/UserForm";
import { Navbar } from "../components/Navbar";

export function Login() {
  return (
    <>
      <Navbar />
      <section className="lg:mt-28 mt-24 mb-6">
        <UserForm isLogin />
      </section>
      <Footer />
    </>
  );
}

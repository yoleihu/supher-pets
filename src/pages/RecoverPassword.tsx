import { Footer } from "../components/Footer";
import { UserForm } from "../components/UserForm";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";

export function RecoverPassword() {
  const [hasScroolbar, setHasScroolbar] = useState<boolean>();

  useEffect(() => {
    const updateWindow = () => {
      if (document.documentElement.offsetHeight + 61 > window.innerHeight) {
        setHasScroolbar(true);
      } else {
        setHasScroolbar(false);
      }
    };
    updateWindow();
    window.addEventListener("resize", updateWindow);
    return () => window.removeEventListener("resize", updateWindow);
  }, []);

  return (
    <>
      <Navbar />
      <section className="lg:mt-32 sm:mt-20 mt-44 mb-6">
        <UserForm isRecoverPassword />
      </section>
      <footer
        className={`w-full ${hasScroolbar ? "static" : "bottom-0 absolute"}`}
      >
        <Footer />
      </footer>
    </>
  );
}

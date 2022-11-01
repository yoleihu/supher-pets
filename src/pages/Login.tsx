import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { UserForm } from "../components/Forms/UserForm";
import { Navbar } from "../components/Navbar";
import { UserContext } from "../context/UserContext";

export function Login() {
  const { authenticatedGuardian, authenticatedBloodCenter } = useContext(UserContext);

  console.log('authenticatedGuardian', authenticatedGuardian)
  console.log('authenticatedBloodCenter', authenticatedBloodCenter)

  if (authenticatedGuardian) {
    return <Navigate to={`/guardian/${localStorage.getItem("USERINFO_ID")}`} />
  } else if (authenticatedBloodCenter) {
    return <Navigate to={`/blood-center/${localStorage.getItem("USERINFO_ID")}`} />
  } else {
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
}

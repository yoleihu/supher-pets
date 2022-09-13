import { ButtonNavbar } from "../components/ButtonNavbar";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export function Guardian() {
  return (
    <>
      <Navbar>
        <div className='py-2 items-end bottom-0 flex lg:flex-row flex-col lg:gap-8 w-full lg:w-fit'>
          <ButtonNavbar type="button" label="Sair" path="/" role='secondary' />
        </div>
      </Navbar>
      <div>

      </div>
      <Footer />
    </>
  )
}
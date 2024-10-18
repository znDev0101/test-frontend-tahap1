import { Outlet } from "react-router-dom";
import Navbar from "../components/layouts/navbar";
import Footer from "../components/layouts/footer";

export default function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

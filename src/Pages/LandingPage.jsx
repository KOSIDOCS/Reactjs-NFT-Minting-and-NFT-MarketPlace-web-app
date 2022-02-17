import { Navbar, Welcome, Footer, Transactions } from "../components";

const LandingPage = () => (
    <>
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    <Transactions />
    <Footer />
    </>
);

export default LandingPage;

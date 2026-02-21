import "./App.css";
import Header from "./components/Header";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import CallToAction from "./sections/CallToAction";
import Footer from "./sections/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Hero />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}

export default App;

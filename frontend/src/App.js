import "materialize-css/dist/css/materialize.min.css";
import { PaymentForm } from "./components/PaymentForm";
import { useEffect } from "react";
import { Nav } from "./components/Nav";

function App() {
  useEffect(() => {
    document.querySelector("body").style.backgroundColor = "#c5cae9";
  }, []);
  return (
    <>
      <div className="App">
        <Nav />
        <div>
          <PaymentForm />
        </div>
      </div>
    </>
  );
}

export default App;

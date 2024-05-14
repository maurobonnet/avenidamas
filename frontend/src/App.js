import "materialize-css/dist/css/materialize.min.css";
import { Main } from "./components/Main";
import { MyShopping } from "./components/MyShopping";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/payments" element={<MyShopping />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

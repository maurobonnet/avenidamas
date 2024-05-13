import { useEffect } from "react";
import { PaymentForm } from "./PaymentForm";
import { Nav } from "./Nav";
export const Main = () => {
    useEffect(() => {
        document.querySelector("body").style.backgroundColor = "#c5cae9";
    }, []);
    return (
        <>
            <div className="App" style={{marginLeft: '10px', marginRight: '10px'}}>
                <Nav />
                <div>
                    <PaymentForm />
                </div>
            </div>
        </>
    );
}
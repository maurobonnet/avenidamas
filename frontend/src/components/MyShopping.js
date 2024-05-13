import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
export const MyShopping = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getPayments();
        document.querySelector("body").style.backgroundColor = "#c5cae9";
    }, []);
    const getPayments = async () => {
        const res = await axios.get("/getAll");
        setData(res.data.result);
    };

    return (
        <>
            <div className="container">
                <h4>Mis compras</h4>
                <table className="grey lighten-5">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Tarjeta</th>
                            <th>Estado</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td>{moment(item.date).format("DD/MM/YYYY")}</td>
                                        <td>{item.card_brand}</td>
                                        <td className={item.status === "approved" ? "green lighten-3" : "red darken-3"}>
                                            {item.status === "approved" ? "Aprobado" : "Rechazado"}
                                        </td>
                                        <td>{"$" + item.amount}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>

        </>
    );
}
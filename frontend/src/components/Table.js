import { PaymentForm } from "./PaymentForm";
export const Table = ({ children }) => {
    return (<>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    </>
    );
}
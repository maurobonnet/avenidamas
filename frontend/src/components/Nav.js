import { Link } from "react-router-dom";
export const Nav = () => {
    return (
        <>
            <nav>
                <div className="nav-wrapper indigo lighten-1">
                    <Link to="/payments" className="brand-logo center">Payway</Link>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li>
                            <Link to="/payments">Mis compras</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
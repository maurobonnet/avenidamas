export const Nav = () => {
    return (
        <nav>
            <div className="nav-wrapper indigo lighten-1">
                <a href="#" className="brand-logo center">Payway</a>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><a href="/payments">Mis compras</a></li>
                </ul>
            </div>
        </nav>
    );
}
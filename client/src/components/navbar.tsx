import { useNavigate } from "react-router-dom";


export default function myHeader(): JSX.Element {

    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar navbar-expand-md bg-body-secondary">
                <div className="container-fluid">
                    <a href="#" className="navbar-brand">NAMMA BUS</a>

                    <div className="navbar-collapse collapse navbar-justified">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="#" className="nav-link">Home</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">About</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">Contact</a>
                            </li>

                            {sessionStorage.getItem("logged") === "true" &&
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                        <ul className="dropdown-menu">
                                            <li><button className="dropdown-item btn" onClick={() => {
                                                sessionStorage.clear();
                                                sessionStorage.setItem("logged", "false");
                                                navigate("/");
                                            }}>Logout</button></li>
                                        </ul>
                                    </a>
                                </li>
                            }

                        </ul>
                    </div>

                </div>
            </nav >
        </>
    );
}

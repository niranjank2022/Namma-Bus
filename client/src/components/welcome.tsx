import { useNavigate } from "react-router-dom";

export default function welcome() {
    const navigate = useNavigate();
    sessionStorage.setItem("logged", "false");
    return (
        <>

            <div className="container">
                <h1>NAMMA BUS</h1>
                <a href="#" onClick={() => navigate("/login")}>
                    <span>Get Started</span>
                </a>
            </div>

        </>
    );
}
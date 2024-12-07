import { useNavigate } from "react-router-dom";

export default function welcome() {
    const navigate = useNavigate();
    return (
        <>

            <div className="container">
                <h1>NAMMA BUS</h1>
                <a href="#" onClick={() => navigate("/login")}>
                    <h2>Get Started</h2>
                </a>
            </div>

        </>
    );
}
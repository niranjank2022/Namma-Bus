import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISeatsLayout, ITrip } from "../../components/interfaces";

export default function UserSearch() {
    const navigate = useNavigate();
    const [departureLocation, setDepartureLocation] = useState("");
    const [arrivalLocation, setArrivalLocation] = useState("");
    const [journeyDate, setJourneyDate] = useState("");

    const handleSearch = async () => {

        var queries = {};
        if (departureLocation !== "")
            queries = { ...queries, "departureLocation": departureLocation };
        if (arrivalLocation !== "")
            queries = { ...queries, "arrivalLocation": arrivalLocation };
        if (journeyDate !== "")
            queries = { ...queries, "journeyDate": journeyDate };

        const query = new URLSearchParams(queries).toString()
        const res = await fetch("http://localhost:3000/user/trips/search?" + query, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("JWT"),
            }
        });

        if (res.ok) {
            const resObj: { trips: ITrip[], layouts: ISeatsLayout[] } = await res.json();
            const { trips, layouts } = resObj;
            navigate("/buses/search?" + query, { state: { trips, layouts } });
        }
        else {
            navigate("/buses/search?" + query, { state: { trips: [], layouts: [] } });
        }
    };

    return (
        <div
            className="container bg-white shadow-lg rounded-3 p-4"
            style={{
                maxWidth: "800px",
                margin: "50px auto",
            }}
        >
            <div className="row g-3">
                <div className="col-md-4">
                    <label htmlFor="departureLocation" className="form-label">
                        From
                    </label>
                    <input
                        type="text"
                        id="departureLocation"
                        className="form-control"
                        placeholder="Enter Departure City"
                        value={departureLocation}
                        onChange={(e) => setDepartureLocation(e.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <label htmlFor="arrivalLocation" className="form-label">
                        To
                    </label>
                    <input
                        type="text"
                        id="arrivalLocation"
                        className="form-control"
                        placeholder="Enter Destination City"
                        value={arrivalLocation}
                        onChange={(e) => setArrivalLocation(e.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <label htmlFor="journeyDate" className="form-label">
                        Journey Date
                    </label>
                    <input
                        type="date"
                        id="journeyDate"
                        className="form-control"
                        value={journeyDate}
                        onChange={(e) => setJourneyDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="d-flex justify-content-center mt-4">
                <button
                    className="btn btn-danger px-4 py-2"
                    style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        borderRadius: "25px",
                    }}
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </div>
    );
}

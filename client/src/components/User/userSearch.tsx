import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ISeatsLayout, ITrip } from "../interfaces";


export interface SearchData {
    trip: ITrip,
    busName: string,
    tagSeries: string,
    layout: ISeatsLayout,
    price: number,
    seatsAvailable: number,
    duration: number
}

export default function UserSearch() {
    const navigate = useNavigate();
    const [departureLocation, setDepartureLocation] = useState(sessionStorage.getItem("departureLocation") || "");
    const [arrivalLocation, setArrivalLocation] = useState(sessionStorage.getItem("arrivalLocation") || "");
    const [journeyDate, setJourneyDate] = useState(sessionStorage.getItem("journeyDate") || "");

    const handleSearch = async () => {

        if (departureLocation === "" || arrivalLocation === "" || journeyDate === "")
            return;

        const queries = { departureLocation, arrivalLocation, journeyDate };
        const query = new URLSearchParams(queries).toString(); console.log(query);
        navigate("/buses/search?" + query);
    };

    useEffect(() => {
        sessionStorage.setItem("departureLocation", departureLocation);
        sessionStorage.setItem("arrivalLocation", arrivalLocation);
        sessionStorage.setItem("journeyDate", journeyDate);
    }, [departureLocation, arrivalLocation, journeyDate]);

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

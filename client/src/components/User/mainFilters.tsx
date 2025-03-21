import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export default function MainFilters() {

    const navigate = useNavigate();
    const [departureLocation, setDepartureLocation] = useState(sessionStorage.getItem("departureLocation") || "");
    const [arrivalLocation, setArrivalLocation] = useState(sessionStorage.getItem("arrivalLocation") || "");
    const [journeyDate, setJourneyDate] = useState(sessionStorage.getItem("journeyDate") || "");
    const [applyingFilters, setApplyingFilters] = useState(false);


    const handleSearch = async () => {

        if (departureLocation === "" || arrivalLocation === "" || journeyDate === "")
            return;

        const queries = { departureLocation, arrivalLocation, journeyDate };
        const query = new URLSearchParams(queries).toString();
        setApplyingFilters(false);
        navigate("/buses/search?" + query);
    };

    useEffect(() => {
        sessionStorage.setItem("departureLocation", departureLocation);
        sessionStorage.setItem("arrivalLocation", arrivalLocation);
        sessionStorage.setItem("journeyDate", journeyDate);
    }, [departureLocation, arrivalLocation, journeyDate]);

    return (
        (applyingFilters) ?
            <div className="container pb-5">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <input
                            type="text"
                            id="departureLocation"
                            className="form-control"
                            placeholder="Enter Departure City"
                            value={departureLocation}
                            onChange={(e) => setDepartureLocation(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <input
                            type="text"
                            id="arrivalLocation"
                            className="form-control"
                            placeholder="Enter Arrival City"
                            value={arrivalLocation}
                            onChange={(e) => setArrivalLocation(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <input
                            type="date"
                            id="journeyDate"
                            className="form-control"
                            placeholder="Enter Date of Journey"
                            value={journeyDate}
                            onChange={(e) => setJourneyDate(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary" onClick={() => { handleSearch(); }}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            :

            <div className="container">
                <div className="row align-items-center justify-content-start">

                    <div className="col-auto">
                        <span>{departureLocation}</span>
                    </div>
                    <div className="col-auto">
                        <span>{arrivalLocation}</span>
                    </div>
                    <div className="col-auto">
                        <span>{journeyDate}</span>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary" onClick={() => { setApplyingFilters(true); }}>
                            Modify
                        </button>
                    </div>
                </div>
            </div>
    );
}
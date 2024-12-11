
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Bus, ViewBusResponse } from "./interfaces";

export default function adminHome() {

    const navigate = useNavigate();
    const [buses, setBuses] = useState<Bus[]>([]);

    const componentLoad = async () => {

        const res = await fetch("http://localhost:3000/admin/buses", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("JWT")
            }
        });
        const resObj: ViewBusResponse = await res.json();

        if (res.ok) {
            setBuses(resObj.buses);
        }
        else {
            alert(resObj.message);
        }
    };

    useEffect(() => {
        componentLoad();
    }, []);


    return (
        <>

            <div className="container">


                <div className="container text-center">
                    <button className="btn btn-primary" onClick={() => {navigate("/admin/add-bus")}}>Add Bus</button>
                </div>
                <div className="container text-center">

                    <div className="row">
                        <div className="col">Bus No</div>
                        <div className="col">Bus Name</div>
                        <div className="col">Departure Location</div>
                        <div className="col">Departure Time</div>
                        <div className="col">Arrival Location</div>
                        <div className="col">Arrival Time</div>
                        <div className="col">Travel Duration</div>
                        <div className="col">Seats</div>
                    </div>

                    {Array.isArray(buses) && buses.length > 0 && buses.map((bus) => (
                        <div className="row" key={bus._id}>
                            <div className="col">{bus.busNo}</div>
                            <div className="col">{bus.busName}</div>
                            <div className="col">{bus.departureLocation}</div>
                            <div className="col">{bus.departureTime}</div>
                            <div className="col">{bus.arrivalTime}</div>
                            <div className="col">{bus.arrivalLocation}</div>
                            <div className="col">{bus.travelDuration}</div>
                            <div className="col"><button className="btn btn-secondary">View</button></div>
                        </div>
                    ))}

                </div>
            </div>

        </>
    );
}
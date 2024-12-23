import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ITrip, ViewTripsResponse } from "../interfaces";
import ViewSeats from "./viewSeats";
import React from "react";


export default function ViewTrips() {
    const { busId } = useParams();
    const [trips, setTrips] = useState<ITrip[]>([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { seatsLayout = {} } = location.state || {}; // Default empty object to prevent crashes

    const componentLoad = async () => {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/admin/buses/${busId}/trips`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("JWT")}`,
            },
        });
        if (res.ok) {
            const resObj: ViewTripsResponse = await res.json();
            setTrips(resObj.trips);
        } else {
            console.error("Couldn't fetch data.");
        }
        setLoading(false);
    };

    const handleReset = async (tripIndex: number) => {
        const tripId = trips[tripIndex]._id;
        const res = await fetch(`http://localhost:3000/admin/buses/reset-trip/${tripId}`, {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("JWT"),
            }
        });

        if (!res.ok) {
            res.json().then((data) => { console.log("Hello", data) });
            return;
        }
        window.location.reload();
    };

    useEffect(() => {
        componentLoad();
    }, [location]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Departure Location</th>
                            <th>Departure Time</th>
                            <th>Arrival Location</th>
                            <th>Arrival Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.length > 0 &&
                            trips.map((trip, i) => (
                                <React.Fragment key={i}>
                                    <tr>
                                        <th>{i + 1}</th>
                                        <td>{trip.departureLocation}</td>
                                        <td>{trip.departureDateTime.slice(0, 10)} {trip.departureDateTime.slice(11, 16)}</td>
                                        <td>{trip.arrivalLocation}</td>
                                        <td>{trip.arrivalDateTime.slice(0, 10)} {trip.arrivalDateTime.slice(11, 16)}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-primary me-2"
                                                data-bs-toggle="modal"
                                                data-bs-target={`#seats${i}`}
                                            >
                                                View Seats
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-warning"
                                                onClick={() => handleReset(i)}
                                            >
                                                Reset
                                            </button>

                                            <div
                                                className="modal fade"
                                                id={`seats${i}`}
                                                tabIndex={-1}
                                                aria-labelledby={`modalLabel${i}`}
                                                aria-hidden="true"
                                            >
                                                <div className="modal-dialog modal-xl modal-dialog-centered">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id={`modalLabel${i}`}>
                                                                Seats Booked
                                                            </h5>
                                                            <button
                                                                type="button"
                                                                className="btn-close"
                                                                data-bs-dismiss="modal"
                                                            ></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <ViewSeats seatsLayout={seatsLayout} seats={trip.seats} />
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button
                                                                type="button"
                                                                className="btn btn-secondary"
                                                                data-bs-dismiss="modal"
                                                            >
                                                                Close
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

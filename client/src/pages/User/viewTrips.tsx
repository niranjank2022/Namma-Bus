import { useLocation } from "react-router-dom";
import ViewSeats from "./viewSeats";

export default function ticketBooking() {

    const location = useLocation();
    const { trips, layouts } = location.state;
    console.log(trips, layouts);

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
                            <th>Seats</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(trips) && trips.map((trip, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{trip.departureLocation}</td>
                                    <td>{trip.departureTime}</td>
                                    <td>{trip.arrivalLocation}</td>
                                    <td>{trip.arrivalTime}</td>
                                    <td><button
                                        type="button"
                                        className="btn btn-primary me-2"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#seats${i}`}
                                    >
                                        View Seats
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
                                                            Seats Available
                                                        </h5>
                                                        <button
                                                            type="button"
                                                            className="btn-close"
                                                            data-bs-dismiss="modal"
                                                        ></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <ViewSeats seatsLayout={layouts[i]} seats={trip.seats} />
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
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}
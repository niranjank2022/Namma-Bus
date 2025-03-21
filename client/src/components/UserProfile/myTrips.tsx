import { TripData } from ".";


export default function MyTrips(props: { trips: TripData[] }) {
    const { trips } = props;
    const formatDateTime = (dateTime: string) =>
        `${dateTime.slice(0, 10)} ${dateTime.slice(11, 16)}`;

    const handleCancel = async (tripId: string, ticketId: string) => {
        const res = await fetch(`http://localhost:3000/user/trips/booked-tickets/${tripId}/cancel-ticket/${ticketId}`, {
            method: "PATCH",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("JWT")
            }
        });
        if (res.ok) {
            alert("Ticket cancelled successfully");
            window.location.reload();
        }
    }

    return (
        <div>
            <h4>My Trips</h4>
            {trips.length === 0 ? (
                <p className="text-muted">You have no trips booked yet.</p>
            ) : (
                <div>
                    <h5>Upcoming Trips</h5>

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ticket No</th>
                                <th>Booked at</th>
                                <th>
                                    <span data-key="departure" data-value="Departure Location" >
                                        Departure Location
                                    </span>
                                </th>
                                <th>
                                    <span data-key="departure" data-value="Departure Time" >
                                        Departure Time
                                    </span>
                                </th>
                                <th>
                                    <span data-key="arrival" data-value="Arrival Location" >
                                        Arrival Location
                                    </span>
                                </th>
                                <th>
                                    <span data-key="arrival" data-value="Arrival Time" >
                                        Arrival Time
                                    </span>
                                </th>
                                <th>
                                    <span data-key="seatsAvailable" data-value="Seats Available" >
                                        Seats Tag
                                    </span>
                                </th>
                                <th>Cancel Ticket</th>
                            </tr>
                        </thead>

                        <tbody>
                            {trips.map((item, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td><strong>{item.ticketNo}</strong></td>
                                    <td>{formatDateTime(item.createdAt)}</td>
                                    <td>{item.departureLocation}</td>
                                    <td>{formatDateTime(item.departureDateTime)}</td>
                                    <td>{item.arrivalLocation}</td>
                                    <td>{formatDateTime(item.arrivalDateTime)}</td>
                                    <td>{item.seatTag}</td>
                                    <td>
                                        <button onClick={() => { handleCancel(item.tripId, item.ticketId) }}>
                                            Cancel
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    );
}

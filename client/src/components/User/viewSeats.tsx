import { useState } from "react";
import { ISeatsLayout, ISeat } from "../interfaces";
import SeatsGrid from "./seatsGrid";
import { useNavigate } from "react-router-dom";

interface ViewSeatsProps {
    seatsLayout: ISeatsLayout;
    seats: ISeat[];
    i: number;
    price: number;
    tripId: string;
}

export default function ViewSeats(props: ViewSeatsProps) {
    const navigate = useNavigate();
    const { seatsLayout, seats, i, price, tripId } = props;
    const topLeft = [seatsLayout.topLeftRow, seatsLayout.topLeftCol];
    const topRight = [seatsLayout.topRightRow, seatsLayout.topRightCol];
    const bottom = [seatsLayout.bottomRow, seatsLayout.bottomCol];
    const [bookedSeats, setBookedSeats] = useState<ISeat[]>([]);

    const handleBookingTicket = async () => {
        if (!sessionStorage.getItem("logged")) {
            alert("Kindly login to your account");
            return;
        }

        for (const seat of bookedSeats) {
            const res = await fetch(`http://localhost:3000/user/trips/book-ticket/${tripId}`, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("JWT"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: sessionStorage.getItem("userId"),
                    seatId: seat._id
                })
            });

            if (!res.ok) {
                console.log(res);
                return;
            }
        }
        alert("Booked successfully");
        navigate("/");
    };

    return (

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
                        onClick={() => { setBookedSeats([]) }}
                    >

                    </button>
                </div>
                <div className="modal-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row m-0 pb-4">
                                    <div className="col-auto pe-5 m-0">
                                        <SeatsGrid
                                            rowCol={topLeft}
                                            startIndex={0}
                                            seats={seats}
                                            bookedSeats={bookedSeats}
                                            setBookedSeats={setBookedSeats}
                                        />
                                    </div>
                                    <div className="col-auto ps-5 m-0">
                                        <SeatsGrid
                                            rowCol={topRight}
                                            startIndex={topLeft[0] * topLeft[1]}
                                            seats={seats}
                                            bookedSeats={bookedSeats}
                                            setBookedSeats={setBookedSeats}
                                        />
                                    </div>
                                </div>

                                <div className="row m-0 pt-0">
                                    <div className="col m-0">
                                        <SeatsGrid
                                            rowCol={bottom}
                                            startIndex={topLeft[0] * topLeft[1] + topRight[0] * topRight[1]}
                                            seats={seats}
                                            bookedSeats={bookedSeats}
                                            setBookedSeats={setBookedSeats}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">

                                {bookedSeats.length > 0 ?
                                    (<div className="p-4 border bg-light text-center">
                                        <h5>Seats Booked</h5>
                                        <div className="" style={{}}>
                                            <div className="row">
                                                {bookedSeats.map((item, _) => item.tag).join(" , ")}
                                            </div>
                                        </div><hr />

                                        <h5>Fare Details</h5>
                                        <div className="">
                                            <div>
                                                <span>Total Price: {bookedSeats.length} x {price} = </span>
                                                <strong>Rs. {bookedSeats.length * price}</strong>
                                            </div>
                                        </div><hr />

                                        <button className="btn btn-primary mb-2" onClick={handleBookingTicket}>Proceed to booking</button>
                                    </div>)
                                    :
                                    (<div className="container">

                                        <strong>SEATS LEGEND</strong>

                                        <div>
                                            <h6>Unavailable</h6>
                                            <div
                                                className="col-auto position-relative"
                                                key={1}
                                                style={{
                                                    backgroundColor: "red",
                                                    width: "25px",
                                                    height: "25px",
                                                    border: "1px solid black",
                                                }}
                                            >
                                            </div>
                                        </div>

                                        <div>
                                            <h6>Available</h6>
                                            <div
                                                className="col-auto position-relative"
                                                key={2}
                                                style={{
                                                    backgroundColor: "yellow",
                                                    width: "25px",
                                                    height: "25px",
                                                    border: "1px solid black",
                                                }}
                                            >
                                            </div>
                                        </div>

                                        <div>
                                            <h6>Booked by you</h6>
                                            <div
                                                className="col-auto position-relative"
                                                key={3}
                                                style={{
                                                    backgroundColor: "green",
                                                    width: "25px",
                                                    height: "25px",
                                                    border: "1px solid black",
                                                }}
                                            >
                                            </div>
                                        </div>

                                    </div>)}

                            </div>
                        </div>
                    </div>

                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={() => { setBookedSeats([]) }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>

    );
}

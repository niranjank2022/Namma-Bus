import { useState } from "react";
import { ISeatsLayout, ISeat } from "../../components/interfaces";
import SeatsGrid from "./seatsGrid";

interface ViewSeatsProps {
    seatsLayout: ISeatsLayout;
    seats: ISeat[];
}

export default function ViewSeats(props: ViewSeatsProps) {
    const { seatsLayout, seats } = props;
    const topLeft = [seatsLayout.topLeftRow, seatsLayout.topLeftCol];
    const topRight = [seatsLayout.topRightRow, seatsLayout.topRightCol];
    const bottom = [seatsLayout.bottomRow, seatsLayout.bottomCol];

    const [bookedSeats, setBookedSeats] = useState<ISeat[]>([]);

    return (
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
                    <div className="p-3 border bg-light">
                        <h4>Seats Booked</h4>
                        <div className="grid text-center" style={{}}>
                            <div className="row">
                                {bookedSeats.map((seat, _) => (
                                    <div className="row">
                                        <span>{seat.tag}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="btn btn-primary mb-2">Action 1</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { ISeat } from "../interfaces";

interface SeatsGridProps {
    seats: ISeat[];
    rowCol: number[];
    startIndex: number;
    bookedSeats: ISeat[];
    setBookedSeats: React.Dispatch<React.SetStateAction<ISeat[]>>;
}

export default function SeatsGrid(props: SeatsGridProps) {
    const { seats, rowCol, startIndex, bookedSeats, setBookedSeats } = props;

    const handleSeatClick = (seatIndex: number) => {
        const seat = seats[seatIndex];

        if (seat.assignee === null || seat.assignee === undefined) {
            if (bookedSeats.includes(seat)) {
                setBookedSeats(prevBookedSeats =>
                    prevBookedSeats.filter(s => s !== seat)
                );
            } else {
                setBookedSeats(prevBookedSeats => [...prevBookedSeats, seat]);
            }
        }
    };

    return (
        <div className="container p-0">
            {Array.from({ length: rowCol[0] }).map((_, i) => (
                <div className="row" key={i}>
                    {Array.from({ length: rowCol[1] }).map((_, j) => {
                        const seatIndex = startIndex + i * rowCol[1] + j;
                        const seat = seats[seatIndex] || {};

                        const isBooked = bookedSeats.includes(seat);

                        return (
                            <div
                                className="col-auto position-relative"
                                key={j}
                                style={{
                                    backgroundColor: isBooked
                                        ? "green"
                                        : seat.assignee === undefined || seat.assignee === null
                                        ? "yellow"
                                        : "red",
                                    width: "25px",
                                    height: "25px",
                                    border: "1px solid black",
                                }}
                                onClick={() => handleSeatClick(seatIndex)}
                            ></div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

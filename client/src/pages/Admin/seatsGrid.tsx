import { useState } from "react";
import { ISeat } from "./../../components/interfaces";

interface SeatsGridProps {
    seats: ISeat[];
    rowCol: number[]; // [rows, cols]
    startIndex: number; // Starting index for the seats array
}

export default function SeatsGrid(props: SeatsGridProps) {
    const { seats, rowCol, startIndex } = props;

    // State to manage the selected seat for the popup
    const [selectedSeat, setSelectedSeat] = useState<ISeat | null>(null);

    return (
        <>
            <div className="container p-0">
                {/* Grid Rows */}
                {Array.from({ length: rowCol[0] }).map((_, i) => (
                    <div className="row" key={i}>
                        {/* Grid Columns */}
                        {Array.from({ length: rowCol[1] }).map((_, j) => {
                            const seatIndex = startIndex + i * rowCol[1] + j;
                            const seat = seats[seatIndex] || {}; // Safeguard against undefined seats

                            return (
                                <div
                                    className="col-auto position-relative"
                                    key={j}
                                    style={{
                                        backgroundColor: seat.assignee === undefined || seat.assignee === null ? "yellow" : "red",
                                        width: "25px",
                                        height: "25px",
                                        border: "1px solid black",
                                    }}
                                    onClick={() => setSelectedSeat(seat)}
                                ></div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Popup for Selected Seat */}
            {selectedSeat && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "white",
                        border: "1px solid black",
                        borderRadius: "10px",
                        padding: "20px",
                        zIndex: 1000,
                    }}
                >
                    <h5>Seat Details</h5>
                    <p><strong>Username:</strong> {selectedSeat.assignee?.username || "N/A"}</p>
                    <p><strong>Email:</strong> {selectedSeat.assignee?.email || "N/A"}</p>
                    <button className="btn btn-secondary" onClick={() => setSelectedSeat(null)}>
                        Close
                    </button>
                </div>
            )}

            {/* Background Overlay */}
            {selectedSeat && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 999,
                    }}
                    onClick={() => setSelectedSeat(null)}
                ></div>
            )}
        </>
    );
}

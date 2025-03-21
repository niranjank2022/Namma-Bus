import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ViewSeats from "./viewSeats";
import MainFilters from "./mainFilters";
import OtherFilters from "./otherFilters";
import { SearchData } from "./userSearch";

export default function ViewTrips() {
    const location = useLocation();
    const [data, setData] = useState<SearchData[]>([]);
    const [displayedData, setDisplayedData] = useState<SearchData[]>([]);
    const formatDateTime = (dateTime: string) => `${dateTime.slice(0, 10)} ${dateTime.slice(11, 16)}`;

    const [spanElement, setSpanElement] = useState<HTMLSpanElement | null>(null);
    const [isAsc, setIsAsc] = useState<boolean>(true);

    const handleSortToggle = (event: React.MouseEvent<HTMLSpanElement>) => {
        const newSpan = event.target as HTMLSpanElement;
        var isCurrentlyAsc = isAsc;
        setIsAsc(!isCurrentlyAsc);

        if (spanElement && spanElement !== newSpan) {
            // Reset the old span
            spanElement.innerHTML = spanElement.getAttribute("data-value") || "";
            spanElement.style.color = "black";
            isCurrentlyAsc = true;
        }

        newSpan.style.color = "red";
        if (isCurrentlyAsc) {
            newSpan.innerHTML = (newSpan.getAttribute("data-value") || "") + ` <i class="fa fa-arrow-down"></i>`;
        } else {
            newSpan.innerHTML = (newSpan.getAttribute("data-value") || "") + ` <i class="fa fa-arrow-up"></i>`;
        }

        setSpanElement(newSpan);
        handleSort(newSpan.getAttribute("data-key") || "", !isCurrentlyAsc);
    };

    const handleSort = (criteria: string, isAsc: boolean) => {
        const sorted = [...displayedData].sort((a, b) => {
            if (!isAsc) {
                [a, b] = [b, a]; // Swap values if descending
            }

            if (criteria === "price") {
                return a.price - b.price;
            } else if (criteria === "departure") {
                return new Date(a.trip.departureDateTime).getTime() - new Date(b.trip.departureDateTime).getTime();
            } else if (criteria === "arrival") {
                return new Date(a.trip.arrivalDateTime).getTime() - new Date(b.trip.arrivalDateTime).getTime();
            } else if (criteria === "duration") {
                return a.duration - b.duration;
            } else if (criteria === "seatsAvailable") {
                return a.seatsAvailable - b.seatsAvailable;
            }
            return 0;
        });
        setDisplayedData(sorted);
    };

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams(location.search).toString();
            const res = await fetch("http://localhost:3000/search?" + params, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("JWT"),
                }
            });

            if (res.ok) {
                const resData = (await res.json()) as { data: SearchData[] };
                setData(resData.data);
            } else {
                setData([]);
            }
        };
        fetchData();
    }, [location.search]);

    useEffect(() => {
        setDisplayedData(data);
    }, [data]);

    return (
        <div className="container mx-0">
            <div className="row my-4">
                <h3>
                    Buses from {sessionStorage.getItem("departureLocation")} to {sessionStorage.getItem("arrivalLocation")} on {sessionStorage.getItem("journeyDate")}
                </h3>
            </div>

            <div className="row mb-3">
                <MainFilters />
            </div>

            <div className="row">
                <div className="col-md-2">
                    <OtherFilters setFilteredData={setDisplayedData} data={data} />
                </div>

                <div className="col">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Bus</th>
                                <th>
                                    <span data-key="departure" data-value="Departure Time" onClick={handleSortToggle}>
                                        Departure Time
                                    </span>
                                </th>
                                <th>
                                    <span data-key="duration" data-value="Travel Duration" onClick={handleSortToggle}>
                                        Travel Duration
                                    </span>
                                </th>
                                <th>
                                    <span data-key="arrival" data-value="Arrival Time" onClick={handleSortToggle}>
                                        Arrival Time
                                    </span>
                                </th>
                                <th>
                                    <span data-key="price" data-value="Price" onClick={handleSortToggle}>
                                        Price
                                    </span>
                                </th>
                                <th>
                                    <span data-key="seatsAvailable" data-value="Seats Available" onClick={handleSortToggle}>
                                        Seats Available
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(displayedData) &&
                                displayedData.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td><strong>{item.busName}</strong></td>
                                        <td>{formatDateTime(item.trip.departureDateTime)}</td>
                                        <td>{item.duration} hrs</td>
                                        <td>{formatDateTime(item.trip.arrivalDateTime)}</td>
                                        <td>Rs. {item.price}</td>
                                        <td>{item.seatsAvailable}</td>
                                        <td>
                                            <button
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
                                                <ViewSeats
                                                    seats={item.trip.seats}
                                                    seatsLayout={item.layout}
                                                    i={i}
                                                    price={item.price}
                                                    tripId={item.trip._id}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

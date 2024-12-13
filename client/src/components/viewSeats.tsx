import { useState } from "react";
import { ISeatsLayout, ISeat } from "./interfaces";
import SeatsGrid from "./seatsGrid";

interface ViewSeatsProps {
    seatsLayout: ISeatsLayout;
    seats: ISeat[];
}

export default function ViewSeats(props: ViewSeatsProps) {
    const { seatsLayout, seats } = props;
    const [topLeft, setTopLeft] = useState<[number, number]>([seatsLayout.topLeftRow, seatsLayout.topLeftCol]);
    const [topRight, setTopRight] = useState<[number, number]>([seatsLayout.topRightRow, seatsLayout.topRightCol]);
    const [bottom, setBottom] = useState<[number, number]>([seatsLayout.bottomRow, seatsLayout.bottomCol]);
    return (
        <>

            <div className="container">
                <div className="container">
                    {/* Top row with 2 columns: Left and Right */}
                    <div className="row m-0 pb-4">
                        {/* Top Left Section */}
                        <div className="col-auto pe-5 m-0">
                            <SeatsGrid rowCol={topLeft} startIndex={0} seats={seats} />
                        </div>

                        {/* Top Right Section */}
                        <div className="col-auto ps-5 m-0">
                            <SeatsGrid rowCol={topRight} startIndex={topLeft[0] * topLeft[1]} seats={seats} />
                        </div>
                    </div>

                    {/* Bottom row with 1 column */}
                    <div className="row m-0 pt-0">
                        <div className="col m-0">
                            <SeatsGrid rowCol={bottom} startIndex={topLeft[0] * topLeft[1] + topRight[0] * topRight[1]} seats={seats} />
                        </div>
                    </div>


                </div>

            </div>

        </>
    );
}
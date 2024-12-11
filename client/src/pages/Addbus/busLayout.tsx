import SeatsGrid from "./seatsGrid";
import Counter from "./counter";

interface BusLayoutProps {
    prevStep: () => void;
    nextStep: () => void;
    topLeft: { row: number, col: number };
    topRight: { row: number, col: number };
    bottom: { row: number, col: number };
    setTopLeft: React.Dispatch<React.SetStateAction<{
        row: number,
        col: number
    }>>;
    setTopRight: React.Dispatch<React.SetStateAction<{
        row: number,
        col: number
    }>>;
    setBottom: React.Dispatch<React.SetStateAction<{
        row: number,
        col: number
    }>>;
}

export default function BusLayout(props: BusLayoutProps) {

    const { prevStep, nextStep, topLeft, topRight, bottom, setTopLeft, setTopRight, setBottom } = props;


    return (
        <>
            <div className="container">
                <h1>Set your bus layout</h1>

                <div className="container">
                    {/* Top row with 2 columns: Left and Right */}
                    <div className="row m-0 pb-4">
                        {/* Top Left Section */}
                        <div className="col-auto pe-5 m-0">
                            <SeatsGrid rowCol={topLeft} />
                        </div>

                        {/* Top Right Section */}
                        <div className="col-auto ps-5 m-0">
                            <SeatsGrid rowCol={topRight} />
                        </div>
                    </div>

                    {/* Bottom row with 1 column */}
                    <div className="row m-0 pt-0">
                        <div className="col m-0">
                            <SeatsGrid rowCol={bottom} />
                        </div>
                    </div>

                    <div className="row pt-5">
                        <div className="col mb-3">
                            <Counter title={"Front Left"} rowCol={topLeft} setRowCol={setTopLeft} />
                        </div>
                        <div className="col mb-3">
                            <Counter title={"Front Right"} rowCol={topRight} setRowCol={setTopRight} />
                        </div>
                        <div className="col mb-3">
                            <Counter title={"Back Row"} rowCol={bottom} setRowCol={setBottom} />
                        </div>
                    </div>
                </div>




                <div className="mt-3">
                    <button onClick={prevStep} className="btn btn-secondary me-2">
                        Previous
                    </button>
                    <button onClick={nextStep} className="btn btn-primary">
                        Next
                    </button>
                </div>
            </div>
        </>

    );
}

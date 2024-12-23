interface SeatsGridProps {
    rowCol: {
        row: number;
        col: number;
    };
}

export default function SeatsGrid(props: SeatsGridProps) {
    const { rowCol } = props;

    return (
        <>
            <div className="container p-0">

                {Array.from({ length: rowCol.row }).map((_, i) => (
                    <div className="row" key={i}>
                        {Array.from({ length: rowCol.col }).map((_, j) => (
                            <div
                                className="col-auto"
                                key={j}
                                style={{
                                    backgroundColor: "red",
                                    width: "25px",
                                    height: "25px",
                                    border: "1px solid black", // Add borders around boxes
                                }}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}

import { FaPlus, FaMinus } from "react-icons/fa"; // Import Font Awesome icons

interface CounterProps {
    title: string,
    rowCol: {
        row: number,
        col: number
    },
    setRowCol: React.Dispatch<React.SetStateAction<{
        row: number,
        col: number
    }>>;
}

export default function Counter(props: CounterProps) {
    const { title, rowCol, setRowCol } = props;

    const incrementRow = () => {
        if (rowCol.row < 10) {
            setRowCol({ row: rowCol.row + 1, col: rowCol.col });
        }
    };

    const decrementRow = () => {
        if (rowCol.row > 1) {
            setRowCol({ row: rowCol.row - 1, col: rowCol.col });
        }
    };

    const incrementCol = () => {
        if (rowCol.col < 10) {
            setRowCol({ row: rowCol.row, col: rowCol.col + 1 });
        }
    };

    const decrementCol = () => {
        if (rowCol.col > 1) {
            setRowCol({ row: rowCol.row, col: rowCol.col - 1 });
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", fontSize: "0.8rem" }}>

            <h4>{title}</h4>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                <FaMinus
                    onClick={decrementRow}
                    className="me-2 text-danger"
                    style={{
                        cursor: "pointer",
                        fontSize: "1rem",
                        padding: "2px",
                        borderRadius: "50%",
                        border: "1px solid #ccc",
                        width: "20px",
                        height: "20px",
                        textAlign: "center"
                    }}
                />
                <span style={{ fontSize: "1rem", fontWeight: "bold", width: "30px", textAlign: "center" }}>
                    {rowCol.row}
                </span>
                <FaPlus
                    onClick={incrementRow}
                    className="text-success"
                    style={{
                        cursor: "pointer",
                        fontSize: "1rem",
                        padding: "2px",
                        borderRadius: "50%",
                        border: "1px solid #ccc",
                        width: "20px",
                        height: "20px",
                        textAlign: "center"
                    }}
                />
            </div>

            {/* Column Counter */}
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
                <FaMinus
                    onClick={decrementCol}
                    className="me-2 text-danger"
                    style={{
                        cursor: "pointer",
                        fontSize: "1rem",
                        padding: "2px",
                        borderRadius: "50%",
                        border: "1px solid #ccc",
                        width: "20px",
                        height: "20px",
                        textAlign: "center"
                    }}
                />
                <span style={{ fontSize: "1rem", fontWeight: "bold", width: "30px", textAlign: "center" }}>
                    {rowCol.col}
                </span>
                <FaPlus
                    onClick={incrementCol}
                    className="text-success"
                    style={{
                        cursor: "pointer",
                        fontSize: "1rem",
                        padding: "2px",
                        borderRadius: "50%",
                        border: "1px solid #ccc",
                        width: "20px",
                        height: "20px",
                        textAlign: "center"
                    }}
                />
            </div>
        </div>
    );
}

const departments = [
    "내과",
    "외과",
    "정형외과",
    "피부과",
    "이비인후과",
    "소아과",
    "산부인과",
    "신경과",
    "정신의학과",
    "안과",
    "치과",
    "한의원",
];

export default function DepartmentSelectList({ onSelect }) {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
            }}
        >
            <button
                key="전체"
                onClick={() => onSelect("전체")}
                style={{
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    background: "#fff",
                    fontWeight: 700,
                }}
            >
                전체
            </button>
            {departments.map((dept) => (
                <button
                    key={dept}
                    onClick={() => onSelect(dept)}
                    style={{
                        padding: "12px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        background: "#fff",
                    }}
                >
                    {dept}
                </button>
            ))}
        </div>
    );
}
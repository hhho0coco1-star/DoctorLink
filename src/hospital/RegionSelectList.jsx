const regions = [
    "강원", "경기",
    "경남", "경북",
    "광주", "대구",
    "대전", "부산",
    "서울", "세종",
    "울산", "인천",
    "전남", "전북",
    "제주", "충남",
    "충북",
];

export default function RegionSelectList({ onSelect }) {
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
            {regions.map((region) => (
                <button
                    key={region}
                    onClick={() => onSelect(region)}
                    style={{
                        padding: "12px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        background: "#fff",
                    }}
                >
                    {region}
                </button>
            ))}
        </div>
    );
}
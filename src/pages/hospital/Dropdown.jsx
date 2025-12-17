
import { useState, useRef, useEffect } from "react";

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("선택 안 함");
    const dropdownRef = useRef(null);

    const items = [
        "선택 안 함",
        "평일 야간",
        "주말 야간",
        "평일 24시간",
        "주말 24시간",
    ];
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)}>
                {selected}
            </button>
            {isOpen && (
                <ul>
                    {items.map((item) => (
                        <li
                            key={item}
                            className={selected === item ? "active" : ""}
                            onClick={() => {
                                setSelected(item);
                                setIsOpen(false);
                            }
                            }
                        >
                            <span>{item}</span>
                            {selected === item && <span>✔</span>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
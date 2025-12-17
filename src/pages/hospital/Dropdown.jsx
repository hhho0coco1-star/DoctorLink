
import { useState, useRef, useEffect } from "react";

export default function Dropdown({ items, defaultValue = "선택 안 함" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(defaultValue);
    const dropdownRef = useRef(null);

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
        <div ref={dropdownRef} className="dropdown">
            <button
                className="dropdown__button"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected}
            </button>

            {isOpen && (
                <ul className="dropdown__list">
                    {items.map((item) => (
                        <li
                            key={item}
                            className={`dropdown__item ${selected === item ? "active" : ""
                                }`}
                            onClick={() => {
                                setSelected(item);
                                setIsOpen(false);
                            }}
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
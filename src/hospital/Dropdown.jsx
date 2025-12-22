
import { useState, useRef, useEffect } from "react";

export default function Dropdown({
    items,
    defaultValue = "선택 안 함",
    value,
    onChange,
    placeholder,
    nullValueItem = defaultValue,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const isControlled = value !== undefined;
    const selected = isControlled ? value : defaultValue;
    const buttonLabel =
        isControlled && (value === null || value === undefined)
            ? (placeholder ?? defaultValue)
            : (selected ?? placeholder ?? defaultValue);

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
                {buttonLabel}
            </button>

            {isOpen && (
                <ul className="dropdown__list">
                    {items.map((item) => (
                        <li
                            key={item}
                            className={`dropdown__item ${selected === item ? "active" : ""
                                }`}
                            onClick={() => {
                                if (onChange) {
                                    if (item === nullValueItem) onChange(null);
                                    else onChange(item);
                                }
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
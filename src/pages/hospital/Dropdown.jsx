
import { useState } from "react";

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
            >
                버튼
            </button>

            {isOpen && (
                <div>
                    목록입니다
                </div>
            )}
        </div>
    );
}
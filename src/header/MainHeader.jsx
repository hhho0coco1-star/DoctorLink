import React from "react"
import "./MainHeader.css";
import { FaUserCircle, FaBell, FaStethoscope } from 'react-icons/fa';

export default function MainHeader() {

    return (
        <div>
            <div className="main">
                {/* header */}
                <header>
                    <div className="header_1 header__logo">
                        <FaStethoscope className="logo-icon" size={24} />
                        DoctorLink</div>
                    <div className="header_2">
                        <h2>안녕하세요. 홍길동님</h2>
                        <p>오늘도 건강한 하루 되세요!</p>
                    </div>
                    <div className="header_3">
                        홍길동<br></br>
                        <span>환자번호:P-2025-1111</span>
                    </div>
                </header>

                {/* aside */}
                <aside>

                </aside>
            </div>
        </div>
    )
}
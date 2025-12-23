// css
import './StartPage.css';
import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function StartPage() {

    const navigate = useNavigate();

    return (
        <div className='startPage_Main'>
            {/* header */}
            <header className="startPage_HeaderBar">
                <h1>DoctorLink</h1>
                <p><Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>LogIn</Link></p>
            </header>
            {/* header */}

            {/* main */}
            <main>
                {/* section */}
                <section className='startPage_Section'>
                    <h2>데이터로 잇는 신뢰, 더 정확해지는 진료</h2>
                    <p>DoctorLink는 파편화된 개인 건강 기록(PHR)을 하나로 통합하여,<br></br>
                        환자에게는 체계적인 건강 관리를, 의료진에게는 정확한 데이터 기반의 검진 환경을 제공합니다.</p>
                </section>

                <div class="cta_container">
                    <button class="btn btn_user" onClick={() => navigate("/login")}>
                        <span class="btn_icon">👤</span>
                        환자로 시작하기
                    </button>
                    <button class="btn btn_doctor" onClick={() => navigate("/login_doctor")}>
                        <span class="btn_icon">🩺</span>
                        의료진으로 시작하기
                    </button>
                </div>
                {/* section */}
            </main>
            {/* main */}

        </div>
    )

}
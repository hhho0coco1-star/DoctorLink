import { useState } from "react";
import "./Mypage.css";

export default function MyPage() {
    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="mypage-container">
            <aside className="mypage-sidebar">
                <div className="profile-box">
                    <label className="profile-image-wrapper">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="프로필"
                                className="profile-image"
                            />
                        ) : (
                            <div className="profile-placeholder">👤</div>
                        )}

                        {/* 숨겨진 파일 input */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            hidden
                        />
                    </label>

                    <h3>홍길동</h3>
                    <p className="patient-id">환자번호: P-2024-1234</p>
                </div>

                <nav className="menu">
                    <button className="menu-item active">개인정보</button>
                    <button className="menu-item">비밀번호 변경</button>
                    <button className="menu-item">알림 설정</button>
                    <button className="menu-item logout">로그아웃</button>
                </nav>
            </aside >

            {/* Content */}
            < main className="mypage-content" >
                <h2>개인정보</h2>

                <div className="form-grid">
                    <div>
                        <label>이름</label>
                        <input value="홍길동" readOnly />
                    </div>
                    <div>
                        <label>생년월일</label>
                        <input value="1997.06.20" readOnly />
                    </div>
                    <div>
                        <label>휴대폰 번호</label>
                        <input value="010-1234-5678" readOnly />
                    </div>
                    <div>
                        <label>이메일</label>
                        <input value="Lyun@naver.com" readOnly />
                    </div>
                    <div className="full">
                        <label>주소</label>
                        <input value="충청남도 천안시 동남구 대흥로 215 7층" readOnly />
                    </div>
                    <div className="full">
                        <label>비상연락처</label>
                        <input value="1566-9564" readOnly />
                    </div>
                </div>

                <button className="primary-btn">정보 수정</button>

                <hr />

                <h3>건강 정보</h3>
                <div className="health-grid">
                    <div className="health-card">
                        <span>혈액형</span>
                        <strong>B Rh-</strong>
                    </div>
                    <div className="health-card">
                        <span>신장 / 체중</span>
                        <strong>175cm / 70kg</strong>
                    </div>
                    <div className="health-card">
                        <span>알레르기</span>
                        <strong>페니실린</strong>
                    </div>
                    <div className="health-card">
                        <span>만성질환</span>
                        <strong>고혈압</strong>
                    </div>
                </div>
            </main>
        </div >
    );
}
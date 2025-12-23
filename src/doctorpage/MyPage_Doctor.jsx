import React, { useState } from "react";
import Header from "../mainHeader/DL01_Header.jsx";
import SideBar from "../mainHeader/DL02_SideBar.jsx";
import SurveyModal from "../mainHeader/surveyModel/SurveyModel.jsx";
import "./MyPage_Doctor.css";
import MainHeader from "./MainHeader_Doctor";

export default function MyPage_Doctor() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    return (

        <MainHeader>
                {/* ⬇️ 여기부터가 오른쪽 콘텐츠 */}
                <div className="mypage-content">
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
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                hidden
                            />
                        </label>

                        <h3>허륜</h3>
                        <p className="patient-id">의사번호 : 1-123456</p>
                    </div>

                    <h2>개인정보</h2>

                    <div className="form-grid">
                        <div>
                            <label>이름</label>
                            <input value="허륜" readOnly />
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
                            <input value="1234-5678" readOnly />
                        </div>
                    </div>

                    <button className="primary-btn">정보 수정</button>
                    <hr />

                    <h3>건강 정보</h3>
                    <div className="health-grid">
                        <div className="health-card">
                            <span>혈액형</span>
                            <strong>B Rh+</strong>
                        </div>
                        <div className="health-card">
                            <span>신장 / 체중</span>
                            <strong>178cm / 92kg</strong>
                        </div>
                        <div className="health-card">
                            <span>알레르기</span>
                            <strong>페니실린</strong>
                        </div>
                        <div className="health-card">
                            <span>만성질환</span>
                            <strong>통풍</strong>
                        </div>
                    </div>
                </div>
        </MainHeader>

    );
}
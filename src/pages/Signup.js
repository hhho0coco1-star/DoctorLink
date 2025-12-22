import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";; // App.css 대신

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [isDoctor, setIsDoctor] = useState(false);
    const [licenseFile, setLicenseFile] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirm) {
            alert("비밀번호가 일치하지 않습니다");
            return;
        }

        if (isDoctor && !licenseFile) {
            alert("의사 면허증을 등록해주세요");
            return;
        }

        if (isDoctor) {
            alert("의사 회원가입 완료 (관리자 승인 대기)");
        } else {
            alert("회원가입 완료");
        }

        navigate("/login");
    };

    return (
        <div className="auth-container">
            <form className="auth-box" onSubmit={handleSubmit}>
                <h2 className="auth-title">회원가입</h2>

                <input
                    className="auth-input"
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="auth-input"
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    className="auth-input"
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />

                {/* 의사 여부 체크 */}
                <div className="doctor-check">
                    <label>
                        의사입니까?
                        <input
                            type="checkbox"
                            checked={isDoctor}
                            onChange={(e) => setIsDoctor(e.target.checked)}
                        />
                    </label>
                </div>

                {/* 의사 면허증 업로드 */}
                {isDoctor && (
                    <div className="license-box">
                        <label className="license-label">
                            의사 면허증 등록
                        </label>

                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => setLicenseFile(e.target.files[0])}
                        />

                        {licenseFile && (
                            <p className="license-status">
                                ✔ {licenseFile.name} 업로드 완료
                            </p>
                        )}

                        <p className="license-desc">
                            * 의사 회원은 관리자 승인 후 서비스 이용이 가능합니다.
                        </p>
                    </div>
                )}

                <button className="auth-button">회원가입</button>

                <div className="auth-link">
                    이미 계정이 있나요? <Link to="/login">로그인</Link>
                </div>
            </form>
        </div>
    );
}

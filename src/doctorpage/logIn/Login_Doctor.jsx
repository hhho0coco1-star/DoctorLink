import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login_Doctor.css";
import googleLogo from "../../assets/logos/google.png";
import kakaoLogo from "../../assets/logos/kakao.png";
import naverLogo from "../../assets/logos/naver.png";
import { useAuth } from "../../AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showTerms, setShowTerms] = useState(false);

    const navigate = useNavigate();
    const { setLoginTry } = useAuth();

    /* ✅ 새로고침 시 로그인 유지 */
    useEffect(() => {
        const loginUser = localStorage.getItem("doctorlink_login");
        if (loginUser) {
            setLoginTry(true);
        }
    }, [setLoginTry]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const savedUser = JSON.parse(
            localStorage.getItem("doctorlink_user")
        );

        if (!savedUser) {
            alert("가입된 계정이 없습니다.");
            return;
        }

        if (
            savedUser.email !== email ||
            savedUser.password !== password
        ) {
            alert("이메일 또는 비밀번호가 올바르지 않습니다.");
            return;
        }

        /* ✅ 로그인 성공 → 사용자 정보 저장 */
        localStorage.setItem(
            "doctorlink_login",
            JSON.stringify({
                email: savedUser.email,
                name: savedUser.name,
                role: savedUser.role, // USER / DOCTOR / DOCTOR_PENDING
            })
        );

        setLoginTry(true);
        alert("로그인 성공");
        navigate("/dashboard_doctor"); // 홈으로 이동
    };

    const handleSNS = (type) => {
        alert(`${type} 로그인 (연동 예정)`);
    };

    return (
        <div className="auth-container">
            {/* ✅ 기존 로고 유지 (홈 이동 정상) */}
            <div className="header_main_text">
                <Link to="/" className="header__logo-link">
                    <h1 className="header_1 header__logo" style={{ fontSize: "2.5rem" }}>
                        <span>DoctorLink</span>
                    </h1>
                </Link>
            </div>

            <form className="auth-box" onSubmit={handleSubmit}>
                <h2 className="auth-title">의료진 로그인</h2>

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

                <button className="auth-button">로그인</button>

                {/* SNS 로그인 유지 */}
                <div className="sns-box">
                    <div className="sns-divider">
                        <span>간편 로그인</span>
                    </div>

                    <div className="sns-buttons">
                        <button type="button" className="sns-button sns-google" onClick={() => handleSNS("Google")}>
                            <img src={googleLogo} alt="Google" />
                            Google
                        </button>
                        <button type="button" className="sns-button sns-kakao" onClick={() => handleSNS("Kakao")}>
                            <img src={kakaoLogo} alt="Kakao" />
                            Kakao
                        </button>
                        <button type="button" className="sns-button sns-naver" onClick={() => handleSNS("Naver")}>
                            <img src={naverLogo} alt="Naver" />
                            Naver
                        </button>
                    </div>
                </div>

                {/* 기존 링크 유지 */}
                <div className="auth-link">
                    계정이 없으신가요? <Link to="/signup_doctor">회원가입</Link>
                </div>
                <div className="auth-link">
                    <Link to="/find-id_doctor">아이디 찾기</Link> |{" "}
                    <Link to="/find-password_doctor">비밀번호 찾기</Link>
                </div>

                {/* 이용약관 유지 */}
                <div className="terms-mini">
                    <span className="terms-link" onClick={() => setShowTerms(true)}>
                        이용약관
                    </span>
                </div>

                {showTerms && (
                    <div className="terms-overlay">
                        <div className="terms-box">
                            <h4>이용약관</h4>
                            <p>
                                본 서비스는 학습용 목업 페이지이며 실제 계정 정보는 저장되지 않습니다.
                            </p>
                            <button
                                className="terms-btn"
                                onClick={() => setShowTerms(false)}
                            >
                                동의
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

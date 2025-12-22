import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import googleLogo from "../assets/logos/google.png";
import kakaoLogo from "../assets/logos/kakao.png";
import naverLogo from "../assets/logos/naver.png";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showTerms, setShowTerms] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("로그인 성공");
        navigate("/main");
    };

    const handleSNS = (type) => {
        alert(`${type} 로그인 (연동 예정)`);
    };

    return (
        <div className="auth-container">
            <form className="auth-box" onSubmit={handleSubmit}>
                <h2 className="auth-title">로그인</h2>

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

                <div className="sns-box">
                    <div className="sns-divider">
                        <span>간편 로그인</span>
                    </div>

                    <div className="sns-buttons">
                        <button
                            type="button"
                            className="sns-button sns-google"
                            onClick={() => handleSNS("Google")}
                        >
                            <img src={googleLogo} alt="Google" />
                            Google
                        </button>

                        <button
                            type="button"
                            className="sns-button sns-kakao"
                            onClick={() => handleSNS("Kakao")}
                        >
                            <img src={kakaoLogo} alt="Kakao" />
                            Kakao
                        </button>

                        <button
                            type="button"
                            className="sns-button sns-naver"
                            onClick={() => handleSNS("Naver")}
                        >
                            <img src={naverLogo} alt="Naver" />
                            Naver
                        </button>
                    </div>
                </div>

                <div className="auth-link">
                    계정이 없으신가요? <Link to="/signup">회원가입</Link>
                </div>
                <div className="auth-link">
                    <span>계정을 잊으셨나요?</span>
                    <br />
                    <Link to="/find-id">아이디 찾기</Link> |{" "}
                    <Link to="/find-password">비밀번호 찾기</Link>
                </div>
                <div className="terms-mini">
                    <span
                        className="terms-link"
                        onClick={() => setShowTerms(true)}
                    >
                        이용약관
                    </span>
                </div>

                {showTerms && (
                    <div className="terms-overlay">
                        <div className="terms-box">
                            <h4>이용약관</h4>
                            <p>
                                본 서비스는 학습용 목업 페이지이며 실제 계정 정보는
                                저장되지 않습니다.
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
            </form >
        </div>

    );
}

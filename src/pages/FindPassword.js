import { useNavigate } from "react-router-dom";
import "../App.css";

export default function FindPassword() {
    const navigate = useNavigate();

    const handleFindPassword = () => {
        alert("비밀번호 재설정 링크를 전송했습니다. (목업)");
        navigate("/login");
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">비밀번호 찾기</h2>

                <input
                    className="auth-input"
                    type="email"
                    placeholder="이메일"
                />

                <button className="auth-button" onClick={handleFindPassword}>
                    비밀번호 찾기
                </button>

                <div className="auth-link">
                    <a className="back-login" onClick={() => navigate("/login")}>로그인으로 돌아가기</a>
                </div>
            </div>
        </div>
    );
}

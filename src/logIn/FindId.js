import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function FindId() {
    const navigate = useNavigate();

    const handleFindId = () => {
        alert("입력하신 정보로 아이디를 안내했습니다. (목업)");
        navigate("/login");
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">아이디 찾기</h2>

                <input
                    className="auth-input"
                    type="text"
                    placeholder="이름"
                />
                <input
                    className="auth-input"
                    type="text"
                    placeholder="휴대폰 번호"
                />

                <button className="auth-button" onClick={handleFindId}>
                    아이디 찾기
                </button>

                <div className="auth-link">
                    <a className="back-login" onClick={() => navigate("/login")}>로그인으로 돌아가기</a>
                </div>
            </div>
        </div>
    );
}

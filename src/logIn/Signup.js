import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirm) {
            alert("비밀번호가 일치하지 않습니다");
            return;
        }

        alert("회원가입 완료");
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

                <button className="auth-button">회원가입</button>

                <div className="auth-link">
                    이미 계정이 있나요? <Link to="/login">로그인</Link>
                </div>
            </form>
        </div>
    );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [rrn, setRrn] = useState("");

    const [verified, setVerified] = useState(false);
    const [agree, setAgree] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    const [sentCode, setSentCode] = useState(false);
    const [authCode, setAuthCode] = useState("");

    /* 의사 관련 */
    const [isDoctor, setIsDoctor] = useState(false);
    const [licenseFile, setLicenseFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!verified) {
            alert("이메일 또는 휴대폰 인증을 완료해주세요.");
            return;
        }

        if (password !== confirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (isDoctor && !licenseFile) {
            alert("의사 면허증을 업로드해주세요.");
            return;
        }

        /* ✅ 회원 정보 localStorage 저장 (로그인과 동일한 key) */
        const user = {
            email,
            password,
            name,
            phone,
            address,
            rrn,
            role: isDoctor ? "DOCTOR_PENDING" : "USER", // 승인 대기
            createdAt: new Date().toISOString(),
        };

        localStorage.setItem(
            "doctorlink_user",
            JSON.stringify(user)
        );

        alert(
            isDoctor
                ? "의사 회원가입 완료 (관리자 승인 대기)"
                : "회원가입 완료"
        );

        navigate("/login");
    };


    return (
        <div className="auth-container">
            <form className="auth-box" onSubmit={handleSubmit}>
                <h2 className="auth-title">회원가입</h2>

                <input className="auth-input" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />

                <input
                    className="auth-input"
                    placeholder="주민등록번호 앞 6자리"
                    maxLength={6}
                    value={rrn}
                    onChange={(e) => setRrn(e.target.value.replace(/\D/g, ""))}
                />

                <input
                    className="auth-input"
                    placeholder="휴대폰 번호"
                    maxLength={11}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    className="auth-input"
                    placeholder="주소"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                {/* 이메일 인증 */}
                <div style={{ display: "flex", gap: "8px" }}>
                    <input
                        className="auth-input"
                        style={{ flex: 1 }}
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={sentCode}
                    />
                    <button
                        type="button"
                        className="auth-button"
                        style={{ width: "120px", height: "44px" }}
                        onClick={() => {
                            alert("인증번호 전송 (목업: 123456)");
                            setSentCode(true);
                        }}
                    >
                        인증번호 전송
                    </button>
                </div>

                {sentCode && !verified && (
                    <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                        <input
                            className="auth-input"
                            style={{ flex: 1 }}
                            placeholder="인증번호 6자리"
                            maxLength={6}
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                        />
                        <button
                            type="button"
                            className="auth-button"
                            style={{ width: "80px", height: "44px" }}
                            onClick={() => {
                                if (authCode === "123456") {
                                    alert("인증 완료");
                                    setVerified(true);
                                } else {
                                    alert("인증번호가 올바르지 않습니다");
                                }
                            }}
                        >
                            확인
                        </button>
                    </div>
                )}

                {verified && (
                    <p style={{ fontSize: "12px", color: "#16a34a", marginBottom: "10px" }}>
                        ✔ 이메일 인증 완료
                    </p>
                )}

                <input className="auth-input" type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className="auth-input" type="password" placeholder="비밀번호 확인" value={confirm} onChange={(e) => setConfirm(e.target.value)} />

                {/* 의사 체크 */}
                <label className="doctor-check">
                    <span>의사입니까?</span>
                    <input type="checkbox" checked={isDoctor} onChange={(e) => setIsDoctor(e.target.checked)} />
                </label>

                {isDoctor && (
                    <div className="license-upload">
                        <label className="license-label">의사 면허증 업로드</label>
                        <input type="file" accept="image/*,.pdf" onChange={(e) => setLicenseFile(e.target.files[0])} />
                        {licenseFile && <p className="file-name">{licenseFile.name}</p>}
                        <p className="doctor-notice">
                            ※ 의사 계정은 면허 확인 후 관리자 승인 시 등업됩니다.
                        </p>
                    </div>
                )}

                <label className="checkbox" style={{ marginBottom: "10px" }}>
                    개인정보 이용에 동의합니다
                    <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                </label>

                <button className="auth-button" disabled={!agree}>
                    회원가입
                </button>

                <div className="auth-link">
                    이미 계정이 있나요? <Link to="/login">로그인</Link>
                </div>

                <div className="terms-mini">
                    <span className="terms-link" onClick={() => setShowTerms(true)}>
                        이용약관
                    </span>
                </div>

                {showTerms && (
                    <div className="terms-overlay">
                        <div className="terms-box">
                            <h4>이용약관</h4>
                            <p>본 서비스는 학습용 목업 페이지이며 실제 개인정보는 저장되지 않습니다.</p>
                            <button className="terms-btn" onClick={() => setShowTerms(false)}>
                                동의
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

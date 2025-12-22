import { useState } from "react";
import MainHeader from "../mainHeader/MainHeader";
import "./Community.css";
import {
    FaHeart,
    FaHeartbeat,
    FaDumbbell,
    FaRegFileAlt,
    FaRegNewspaper,
    FaTrash,
    FaPen,
} from "react-icons/fa";

const TABS = [
    { key: "TIP", label: "건강 팁" },
    { key: "QNA", label: "QA 게시판" },
    { key: "NEWS", label: "의학 뉴스" },
];

/* ✅ 예시 데이터(유지) */
const initialData = {
    TIP: [
        {
            id: 1,
            title: "겨울철 혈압 관리법",
            desc: "기온이 떨어지면 혈관이 수축되어 혈압이 올라갈 수 있습니다. 실내 온도를 적절히 유지하고...",
            views: 523,
            comments: 12,
            date: "2025.12.05",
            icon: <FaHeart />,
            tone: "mint",
        },
        {
            id: 2,
            title: "당뇨 환자를 위한 식단 가이드",
            desc: "혈당 관리를 위한 효과적인 식단 구성 방법과 피해야 할 음식들을 알아보세요...",
            views: 847,
            comments: 28,
            date: "2025.12.03",
            icon: <FaHeartbeat />,
            tone: "blue",
        },
        {
            id: 3,
            title: "올바른 스트레칭 방법",
            desc: "운동 전후 스트레칭으로 부상을 예방하고 효과를 높이는 방법...",
            views: 1234,
            comments: 45,
            date: "2025.12.01",
            icon: <FaDumbbell />,
            tone: "orange",
        },
    ],
    QNA: [
        {
            id: 4,
            title: "혈압약 복용 시간 관련 질문입니다",
            desc: "혈압약을 아침에 먹어야 하나요, 저녁에 먹어야 하나요?",
            author: "홍길동",
            date: "2025.12.05",
            answered: true,
            answer: "일반적으로는 같은 시간대에 꾸준히 복용하는 것이 중요합니다. 주치의 지시에 따르세요.",
            answeredAt: "2025.12.06",
        },
        {
            id: 5,
            title: "MRI 검사 전 주의사항이 궁금합니다",
            desc: "다음주에 MRI 검사가 예정되어 있는데... 금속 관련 주의사항이 있나요?",
            author: "이영희",
            date: "2025.12.07",
            answered: false,
            answer: "",
            answeredAt: "",
        },
    ],
    NEWS: [
        {
            id: 6,
            title: "새로운 당뇨병 치료법 임상 시험 성공",
            desc: "국내 연구진이 개발한 새로운 당뇨병 치료제가 3상 임상시험에서 유의미한 결과를 보였습니다...",
            source: "의학신문",
            date: "2025.12.08",
            badge: "최신",
            tone: "newsBlue",
        },
        {
            id: 7,
            title: "AI를 활용한 암 조기 진단 기술 발전",
            desc: "인공지능을 활용한 의료 영상 분석 기술이 빠르게 발전하고 있습니다...",
            source: "메디컬타임즈",
            date: "2025.12.04",
            tone: "newsGreen",
        },
    ],
};

export default function Community() {
    const [activeTab, setActiveTab] = useState("TIP");
    const [isAdmin, setIsAdmin] = useState(false);

    /* ✅ 예시 데이터를 state로 감싸서 추가/삭제/답변 가능하게 */
    const [postsByTab, setPostsByTab] = useState(initialData);

    /* ✅ 작성 모달(간단) */
    const [showWrite, setShowWrite] = useState(false);
    const [writeTitle, setWriteTitle] = useState("");
    const [writeDesc, setWriteDesc] = useState("");

    /* ✅ 답변 모달 */
    const [showAnswer, setShowAnswer] = useState(false);
    const [answerTargetId, setAnswerTargetId] = useState(null);
    const [answerText, setAnswerText] = useState("");

    const posts = postsByTab[activeTab];

    const openWrite = () => {
        setWriteTitle("");
        setWriteDesc("");
        setShowWrite(true);
    };

    const closeWrite = () => {
        setShowWrite(false);
        setWriteTitle("");
        setWriteDesc("");
    };

    const submitWrite = () => {
        if (!writeTitle.trim() || !writeDesc.trim()) {
            alert("제목/내용을 입력해주세요.");
            return;
        }

        const today = new Date().toISOString().slice(0, 10);

        const newPost =
            activeTab === "QNA"
                ? {
                    id: Date.now(),
                    title: writeTitle.trim(),
                    desc: writeDesc.trim(),
                    author: "사용자",
                    date: today,
                    answered: false,
                    answer: "",
                    answeredAt: "",
                }
                : activeTab === "TIP"
                    ? {
                        id: Date.now(),
                        title: writeTitle.trim(),
                        desc: writeDesc.trim(),
                        views: 0,
                        comments: 0,
                        date: today,
                        icon: <FaHeart />,
                        tone: "mint",
                    }
                    : {
                        id: Date.now(),
                        title: writeTitle.trim(),
                        desc: writeDesc.trim(),
                        source: "관리자",
                        date: today,
                        tone: "newsPurple",
                    };

        setPostsByTab((prev) => ({
            ...prev,
            [activeTab]: [newPost, ...prev[activeTab]],
        }));

        closeWrite();
    };

    const handleDeletePost = (id) => {
        if (!window.confirm("삭제하시겠습니까?")) return;

        setPostsByTab((prev) => ({
            ...prev,
            [activeTab]: prev[activeTab].filter((p) => p.id !== id),
        }));
    };

    /* ✅ QnA 답변하기/수정 */
    const openAnswer = (qnaPost) => {
        setAnswerTargetId(qnaPost.id);
        setAnswerText(qnaPost.answer || "");
        setShowAnswer(true);
    };

    const closeAnswer = () => {
        setShowAnswer(false);
        setAnswerTargetId(null);
        setAnswerText("");
    };

    const submitAnswer = () => {
        if (!answerText.trim()) {
            alert("답변 내용을 입력해주세요.");
            return;
        }

        const today = new Date().toISOString().slice(0, 10);

        setPostsByTab((prev) => ({
            ...prev,
            QNA: prev.QNA.map((q) =>
                q.id === answerTargetId
                    ? {
                        ...q,
                        answered: true,
                        answer: answerText.trim(),
                        answeredAt: today,
                    }
                    : q
            ),
        }));

        closeAnswer();
    };

    return (
        <MainHeader>
            <div className="community-content">
                {/* 상단 */}
                <div className="community-top">
                    <h2 className="community-title">커뮤니티</h2>

                    <button
                        className={`admin-btn ${isAdmin ? "on" : ""}`}
                        onClick={() => setIsAdmin((p) => !p)}
                    >
                        {isAdmin ? "권한 해제" : "관리자 권한 부여"}
                    </button>
                </div>

                {/* 탭 */}
                <div className="community-tabs">
                    {TABS.map((t) => (
                        <button
                            key={t.key}
                            className={`tab-btn ${activeTab === t.key ? "active" : ""}`}
                            onClick={() => setActiveTab(t.key)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* 작성 버튼 규칙:
            - QnA: 사용자만 질문 작성
            - TIP/NEWS: 관리자만 글 작성
        */}
                <div className="community-actions">
                    {activeTab === "QNA" && !isAdmin && (
                        <button className="primary-btn" onClick={openWrite}>
                            <FaPen /> 질문 작성
                        </button>
                    )}

                    {isAdmin && (activeTab === "TIP" || activeTab === "NEWS") && (
                        <button className="primary-btn" onClick={openWrite}>
                            <FaPen /> 글 작성
                        </button>
                    )}
                </div>

                {/* 리스트 */}
                <div className="post-list">
                    {/* 건강 팁 */}
                    {activeTab === "TIP" &&
                        posts.map((p) => (
                            <div key={p.id} className="card tip-card">
                                <div className={`tip-icon ${p.tone}`}>{p.icon}</div>

                                <div className="card-body">
                                    <div className="card-title">{p.title}</div>
                                    <div className="card-desc">{p.desc}</div>

                                    <div className="card-meta">
                                        <span className="meta-text">{p.date}</span>

                                        {isAdmin && (
                                            <button
                                                className="meta-action danger"
                                                onClick={() => handleDeletePost(p.id)}
                                            >
                                                <FaTrash /> 삭제
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                    {/* QnA */}
                    {activeTab === "QNA" &&
                        posts.map((p) => (
                            <div key={p.id} className="card qna-card">
                                <div className="qna-icon">
                                    <FaRegFileAlt />
                                </div>

                                <div className="card-body">
                                    <div className="qna-title-row">
                                        <div className="card-title">{p.title}</div>
                                        <span className={`qna-badge ${p.answered ? "done" : "waiting"}`}>
                                            {p.answered ? "답변완료" : "답변대기"}
                                        </span>
                                    </div>

                                    <div className="card-desc">{p.desc}</div>

                                    <div className="card-meta">
                                        <span className="meta-text">작성자: {p.author}</span>
                                        <span className="meta-text">{p.date}</span>

                                        {/* ✅ 관리자일 때만 답변하기/수정 버튼 */}
                                        {isAdmin && (
                                            <button className="meta-action" onClick={() => openAnswer(p)}>
                                                {p.answered ? "답변 수정" : "답변하기"}
                                            </button>
                                        )}
                                    </div>

                                    {/* ✅ 답변이 있으면 화면에 표시 */}
                                    {p.answered && (
                                        <div className="qna-answer">
                                            <div className="qna-answer-head">
                                                <span className="qna-answer-badge">관리자 답변</span>
                                                <span className="qna-answer-date">{p.answeredAt}</span>
                                            </div>
                                            <div className="qna-answer-body">{p.answer}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                    {/* 의학 뉴스 */}
                    {activeTab === "NEWS" &&
                        posts.map((p) => (
                            <div key={p.id} className={`news-card ${p.tone}`}>
                                <div className="news-left">
                                    <div className="news-icon">
                                        <FaRegNewspaper />
                                    </div>
                                </div>

                                <div className="news-body">
                                    <div className="news-title-row">
                                        {p.badge && <span className="news-badge">{p.badge}</span>}
                                        <div className="news-title">{p.title}</div>
                                    </div>

                                    <div className="news-desc">{p.desc}</div>

                                    <div className="news-meta">
                                        <span className="meta-text">{p.source}</span>
                                        <span className="meta-text">{p.date}</span>

                                        {isAdmin && (
                                            <button
                                                className="meta-action danger"
                                                onClick={() => handleDeletePost(p.id)}
                                            >
                                                <FaTrash /> 삭제
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* ===== 글 작성 모달 ===== */}
                {showWrite && (
                    <div className="cm-modal-overlay" onClick={closeWrite}>
                        <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
                            <h3 className="cm-modal-title">
                                {activeTab === "QNA" ? "질문 작성" : "글 작성"}
                            </h3>

                            <input
                                className="cm-input"
                                placeholder="제목"
                                value={writeTitle}
                                onChange={(e) => setWriteTitle(e.target.value)}
                            />
                            <textarea
                                className="cm-textarea"
                                placeholder="내용"
                                value={writeDesc}
                                onChange={(e) => setWriteDesc(e.target.value)}
                            />

                            <div className="cm-modal-actions">
                                <button className="cm-btn ghost" onClick={closeWrite}>
                                    취소
                                </button>
                                <button className="cm-btn" onClick={submitWrite}>
                                    등록
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== 답변 모달 ===== */}
                {showAnswer && (
                    <div className="cm-modal-overlay" onClick={closeAnswer}>
                        <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
                            <h3 className="cm-modal-title">답변 작성</h3>

                            <textarea
                                className="cm-textarea"
                                placeholder="답변 내용을 입력하세요"
                                value={answerText}
                                onChange={(e) => setAnswerText(e.target.value)}
                            />

                            <div className="cm-modal-actions">
                                <button className="cm-btn ghost" onClick={closeAnswer}>
                                    취소
                                </button>
                                <button className="cm-btn" onClick={submitAnswer}>
                                    저장
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainHeader>
    );
}
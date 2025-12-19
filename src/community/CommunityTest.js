// import { useMemo, useState } from "react";
// import MainHeader from "../pages/MainHeader";
// import "./Community.css";

// import {
//     FaHeart,
//     FaHeartbeat,
//     FaDumbbell,
//     FaRegFileAlt,
//     FaRegNewspaper,
//     FaEye,
//     FaCommentDots,
//     FaTrash,
//     FaPen,
// } from "react-icons/fa";

// const TABS = [
//     { key: "TIP", label: "건강 팁" },
//     { key: "QNA", label: "QA 게시판" },
//     { key: "NEWS", label: "의학 뉴스" },
// ];

// export default function Community() {
//     const [activeTab, setActiveTab] = useState("TIP");
//     const [isAdmin, setIsAdmin] = useState(false);

//     const data = useMemo(
//         () => ({
//             TIP: [
//                 {
//                     id: 1,
//                     title: "겨울철 혈압 관리법",
//                     desc: "기온이 떨어지면 혈관이 수축되어 혈압이 올라갈 수 있습니다. 실내 온도를 적절히 유지하고...",
//                     views: 523,
//                     comments: 12,
//                     date: "2025.12.05",
//                     icon: <FaHeart />,
//                     tone: "mint",
//                 },
//                 {
//                     id: 2,
//                     title: "당뇨 환자를 위한 식단 가이드",
//                     desc: "혈당 관리를 위한 효과적인 식단 구성 방법과 피해야 할 음식들을 알아보세요...",
//                     views: 847,
//                     comments: 28,
//                     date: "2025.12.03",
//                     icon: <FaHeartbeat />,
//                     tone: "blue",
//                 },
//                 {
//                     id: 3,
//                     title: "올바른 스트레칭 방법",
//                     desc: "운동 전후 스트레칭으로 부상을 예방하고 효과를 높이는 방법...",
//                     views: 1234,
//                     comments: 45,
//                     date: "2025.12.01",
//                     icon: <FaDumbbell />,
//                     tone: "orange",
//                 },
//             ],
//             QNA: [
//                 {
//                     id: 1,
//                     title: "혈압약 복용 시간 관련 질문입니다",
//                     desc: "혈압약을 아침에 먹어야 하나요, 저녁에 먹어야 하나요?",
//                     author: "홍길동",
//                     date: "2025.12.05",
//                     answerCount: 1,
//                     answered: true,
//                 },
//                 {
//                     id: 2,
//                     title: "MRI 검사 전 주의사항이 궁금합니다",
//                     desc: "다음주에 MRI 검사가 예정되어 있는데...",
//                     author: "이영희",
//                     date: "2025.12.07",
//                     answerCount: 0,
//                     answered: false,
//                 },
//             ],
//             NEWS: [
//                 {
//                     id: 1,
//                     title: "새로운 당뇨병 치료법 임상 시험 성공",
//                     desc: "국내 연구진이 개발한 새로운 당뇨병 치료제가 3상 임상시험에서 유의미한 결과를 보였습니다...",
//                     source: "의학신문",
//                     date: "2025.12.08",
//                     badge: "최신",
//                     tone: "newsBlue",
//                 },
//                 {
//                     id: 2,
//                     title: "고혈압 예방을 위한 생활습관 연구 발표",
//                     desc: "세계보건기구(WHO)가 고혈압 예방 가이드라인을 업데이트했습니다...",
//                     source: "헬스뉴스",
//                     date: "2025.12.06",
//                     tone: "newsPurple",
//                 },
//                 {
//                     id: 3,
//                     title: "AI를 활용한 암 조기 진단 기술 발전",
//                     desc: "인공지능을 활용한 의료 영상 분석 기술이 빠르게 발전하고 있습니다...",
//                     source: "메디컬타임즈",
//                     date: "2025.12.04",
//                     tone: "newsGreen",
//                 },
//             ],
//         }),
//         []
//     );

//     const posts = data[activeTab];

//     return (
//         <MainHeader>
//             <div className="community-content">
//                 {/* 상단 헤더 */}
//                 <div className="community-top">
//                     <h2 className="community-title">커뮤니티</h2>

//                     <button
//                         className={`admin-btn ${isAdmin ? "on" : ""}`}
//                         onClick={() => setIsAdmin((p) => !p)}
//                     >
//                         {isAdmin ? "권한 해제" : "관리자 권한 부여"}
//                     </button>
//                 </div>

//                 {/* 탭 */}
//                 <div className="community-tabs">
//                     {TABS.map((t) => (
//                         <button
//                             key={t.key}
//                             className={`tab-btn ${activeTab === t.key ? "active" : ""}`}
//                             onClick={() => setActiveTab(t.key)}
//                         >
//                             {t.label}
//                         </button>
//                     ))}
//                 </div>

//                 {/* 우측 버튼 (QnA는 사용자도 질문 작성 가능 / TIP, NEWS는 관리자만 글 작성) */}
//                 <div className="community-actions">
//                     {activeTab === "QNA" && (
//                         <button
//                             className="primary-btn"
//                             onClick={() => alert("질문 작성 (목업)")}
//                         >
//                             질문 작성
//                         </button>
//                     )}

//                     {isAdmin && (activeTab === "TIP" || activeTab === "NEWS") && (
//                         <button
//                             className="primary-btn"
//                             onClick={() => alert("글 작성 (관리자 목업)")}
//                         >
//                             <FaPen style={{ marginRight: 6 }} />
//                             글 작성
//                         </button>
//                     )}
//                 </div>

//                 {/* 리스트 */}
//                 <div className="post-list">
//                     {/* 건강 팁 */}
//                     {activeTab === "TIP" &&
//                         posts.map((p) => (
//                             <div key={p.id} className="card tip-card">
//                                 <div className={`tip-icon ${p.tone}`}>{p.icon}</div>

//                                 <div className="card-body">
//                                     <div className="card-title">{p.title}</div>
//                                     <div className="card-desc">{p.desc}</div>

//                                     <div className="card-meta">
//                                         <span className="meta-item">
//                                             <FaEye /> {p.views}
//                                         </span>
//                                         <span className="meta-item">
//                                             <FaCommentDots /> {p.comments}
//                                         </span>
//                                         <span className="meta-date">{p.date}</span>

//                                         {isAdmin && (
//                                             <button
//                                                 className="meta-action danger"
//                                                 onClick={() => alert("게시글 삭제 (관리자)")}
//                                             >
//                                                 <FaTrash /> 삭제
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}

//                     {/* QnA */}
//                     {activeTab === "QNA" &&
//                         posts.map((p) => (
//                             <div key={p.id} className="card qna-card">
//                                 <div className="qna-icon">
//                                     <FaRegFileAlt />
//                                 </div>

//                                 <div className="card-body">
//                                     <div className="qna-title-row">
//                                         <div className="card-title">{p.title}</div>
//                                         <span
//                                             className={`qna-badge ${p.answered ? "done" : "waiting"
//                                                 }`}
//                                         >
//                                             {p.answered ? "답변완료" : "답변대기"}
//                                         </span>
//                                     </div>

//                                     <div className="card-desc">{p.desc}</div>

//                                     <div className="card-meta">
//                                         <span className="meta-text">작성자: {p.author}</span>
//                                         <span className="meta-date">{p.date}</span>
//                                         <span className="meta-text">답변: {p.answerCount}</span>

//                                         {isAdmin && (
//                                             <button
//                                                 className="meta-action"
//                                                 onClick={() => alert("답변 작성 (관리자)")}
//                                             >
//                                                 답변하기
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}

//                     {/* 의학 뉴스 */}
//                     {activeTab === "NEWS" &&
//                         posts.map((p) => (
//                             <div key={p.id} className={`news-card ${p.tone}`}>
//                                 <div className="news-left">
//                                     <div className="news-icon">
//                                         <FaRegNewspaper />
//                                     </div>
//                                 </div>

//                                 <div className="news-body">
//                                     <div className="news-title-row">
//                                         {p.badge && <span className="news-badge">{p.badge}</span>}
//                                         <div className="news-title">{p.title}</div>
//                                     </div>

//                                     <div className="news-desc">{p.desc}</div>

//                                     <div className="news-meta">
//                                         <span className="meta-text">{p.source}</span>
//                                         <span className="meta-date">{p.date}</span>

//                                         {isAdmin && (
//                                             <button
//                                                 className="meta-action danger"
//                                                 onClick={() => alert("뉴스 삭제 (관리자)")}
//                                             >
//                                                 <FaTrash /> 삭제
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                 </div>
//             </div>
//         </MainHeader>
//     );
// }

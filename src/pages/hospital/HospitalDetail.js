import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainHeader from "../../header/MainHeader";
import hospitalInfoList from "./data/hospitalInfo";
import "./HospitalDetail.css";

export default function HospitalDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const hospital = useMemo(
        () => hospitalInfoList.find((h) => String(h.id) === String(id)),
        [id]
    );

    return (
        <MainHeader>
            <div className="hospital-detail-page">

                {!hospital ? (
                    <div className="hospital-detail-empty">
                        병원 정보를 찾을 수 없습니다.
                    </div>
                ) : (
                    <div className="hospital-detail-layout">
                        {/* 좌측: 사진 + 상세 정보 */}
                        <section className="hospital-detail-left">
                            <div className="hospital-detail-hero">
                                <img
                                    className="hospital-detail-hero-img"
                                    src={hospital.imgurl}
                                    alt={`${hospital.title} 이미지`}
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80";
                                    }}
                                />
                            </div>

                            <div className="hospital-detail-card">
                                <div className="hospital-detail-title-row">
                                    <h1 className="hospital-detail-title">
                                        {hospital.title}
                                    </h1>
                                    <span
                                        className={`hospital-detail-badge ${hospital.isOpenNow
                                            ? "is-open"
                                            : "is-closed"
                                            }`}
                                    >
                                        {hospital.isOpenNow ? "진료중" : "휴진"}
                                    </span>
                                </div>

                                <div className="hospital-detail-sub">
                                    <span className="muted">
                                        {hospital.department}
                                    </span>
                                    <span className="dot">•</span>
                                    <span className="muted">
                                        ⭐ {hospital.rating} (리뷰{" "}
                                        {hospital.reviewCount})
                                    </span>
                                </div>

                                <div className="hospital-detail-info-list">
                                    <div className="info-row">
                                        <div className="label">주소</div>
                                        <div className="value">
                                            {hospital.address}
                                        </div>
                                    </div>
                                    <div className="info-row">
                                        <div className="label">전화</div>
                                        <div className="value">
                                            {hospital.phone}
                                        </div>
                                    </div>
                                    <div className="info-row">
                                        <div className="label">진료시간</div>
                                        <div className="value">
                                            {hospital.openTime} ~{" "}
                                            {hospital.closeTime}
                                        </div>
                                    </div>
                                </div>

                                <div className="hospital-detail-section">
                                    <div className="section-title">
                                        병원 소개
                                    </div>
                                    <p className="section-body">
                                        {hospital.description ??
                                            "병원 소개 정보가 아직 없습니다."}
                                    </p>
                                </div>

                                {/* 아래는 확장용 자리(리뷰/지도/의사/진료과 등) */}
                                <div className="hospital-detail-section">
                                    <div className="section-title">
                                        (추가 영역)
                                    </div>
                                    <div className="section-placeholder">
                                        리뷰/지도/의료진/진료항목 등을 여기에
                                        붙일 수 있어요.
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 우측: 요약 + 예약 버튼 (스크롤 따라오기) */}
                        <aside className="hospital-detail-right">
                            <div className="hospital-detail-sticky">
                                <div className="hospital-detail-summary">
                                    <div className="hospital-detail-summary-between">
                                        <div className="summary-title">
                                            {hospital.title}
                                        </div>
                                        <button
                                            type="button"
                                            className="hospital-detail-back"
                                            onClick={() => navigate(-1)}
                                        >
                                            ← 병원리스트
                                        </button>
                                    </div>
                                    <div className="summary-meta">
                                        <div className="summary-row">
                                            <span className="muted">
                                                {hospital.department}
                                            </span>
                                            <span className="dot">•</span>
                                            <span className="muted">
                                                ⭐ {hospital.rating}
                                            </span>
                                        </div>
                                        <div className="summary-row muted">
                                            {hospital.address}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="hospital-detail-cta"
                                    onClick={() => {
                                        // TODO: 예약 페이지/모달로 연결
                                        alert(
                                            "예약 미구현."
                                        );
                                    }}
                                >
                                    예약하기
                                </button>

                                <div className="hospital-detail-mini">
                                    <div className="mini-row">
                                        <span className="mini-label">
                                            오늘
                                        </span>
                                        <span className="mini-value">
                                            {hospital.openTime} ~{" "}
                                            {hospital.closeTime}
                                        </span>
                                    </div>
                                    <div className="mini-row">
                                        <span className="mini-label">
                                            상태
                                        </span>
                                        <span className="mini-value">
                                            {hospital.isOpenNow
                                                ? "진료중"
                                                : "휴진"}
                                        </span>
                                    </div>
                                    <div className="mini-row">
                                        <span className="mini-label">
                                            전화
                                        </span>
                                        <span className="mini-value">
                                            {hospital.phone}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </MainHeader>
    );
}


import "./MobileMainPage.css";
import MobileBottomNav from "../components/mobile/MobileBottomNav";

export default function HealthPage() {
    return (
        <div className="mobile-main-page">
            <div className="mobile-home-content">
                <div className="mobile-greeting-section" style={{ textAlign: "center", padding: "60px 20px" }}>
                    <h1 className="mobile-greeting" style={{ marginBottom: "16px" }}>
                        내 건강
                    </h1>
                    <p className="mobile-greeting-desc" style={{ fontSize: "16px", color: "#64748b" }}>
                        추후 업데이트 내용입니다
                    </p>
                </div>

                {/* 하단 여백 (네비게이션 바 공간) */}
                <div className="mobile-bottom-spacer"></div>
            </div>

            {/* 하단 네비게이션 바 */}
            <MobileBottomNav />
        </div>
    );
}


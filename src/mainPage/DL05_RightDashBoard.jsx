import "./DL05_RightDashBoard.css";

export default function DL05_RightDashBoard() {

    return (

            <div className="right_dashboard_container">
                {/* 1번: 활동 트래커 */}
                <div className="sub_card activity_card">
                    <h3>오늘의 활동</h3>
                    <div className="progress_circle_container">
                        {/* 여기에 원형 프로그레스 바 라이브러리나 SVG를 넣으세요 */}
                        <div className="circle_placeholder">75%</div>
                    </div>
                    <p>🔥 7,500 / 10,000 걸음</p>
                </div>

                {/* 2번: 복약 스케줄 */}
                <div className="sub_card meds_card">
                    <h3>다음 복약 스케줄</h3>
                    <div className="meds_info">
                        <span className="meds_time">19:00</span>
                        <span className="meds_name">💊 혈압약 (식후 30분)</span>
                    </div>
                    <div className="meds_countdown">약 2시간 남음</div>
                </div>
            </div>

    )

}
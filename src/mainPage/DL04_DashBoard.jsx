import MainHeader from "../mainHeader/MainHeader"
import Header from "../mainHeader/DL01_Header"
import SideBar from "../mainHeader/DL02_SideBar"
import LeftDashBoard from "./DL03_LeftDashBoard"
import RightDashBoard from "./DL05_RightDashBoard"

// css
import "./DL04_DashBoard.css";

export default function DashBoard() {

    return (
        <div>
            <div className="main">
                {/* header */}
                <Header />
                <main className="mainBody">
                    {/* aside */}
                    <SideBar />
                    {/* article */}
                    <div className="article_dashBoard">
                        <div className="dashBoard">
                            {/* ============================================================================================== */}
                            <div class="appointment-card">
                                <div class="card-header">
                                    <div class="calendar-icon">&#128197; </div>
                                    <span class="appointment-tag">진료</span>
                                </div>
                                <div class="card-body">
                                    <div class="number">3</div>
                                    <div class="description">예정된 진료</div>
                                </div>
                            </div>

                            <div class="appointment-card" style={{background: "linear-gradient(135deg, #7c58e5, #5a30b3)"}}>
                                <div class="card-header">
                                    <div class="calendar-icon">📄</div>
                                    <span class="appointment-tag">신규</span>
                                </div>
                                <div class="card-body">
                                    <div class="number">1</div>
                                    <div class="description">새 검사결과</div>
                                </div>
                            </div>

                            <div class="appointment-card" style={{background: "linear-gradient(135deg, #f0587d, #d13063)"}}>
                                <div class="card-header">
                                    <div class="calendar-icon">💊</div>
                                    <span class="appointment-tag">처방</span>
                                </div>
                                <div class="card-body">
                                    <div class="number">2</div>
                                    <div class="description">복용중인 약</div>
                                </div>
                            </div>

                            <div class="appointment-card" style={{background: "linear-gradient(135deg, #f7934c, #e0722e)"}}>
                                <div class="card-header">
                                    <div class="calendar-icon">
                                        &#128197; </div>
                                    <span class="appointment-tag">메세지</span>
                                </div>
                                <div class="card-body">
                                    <div class="number">5</div>
                                    <div class="description">새 메세지</div>
                                </div>
                            </div>

                        </div>

                        {/* ====================== Blood_Box ====================== */}
                        <div className="dashBoard02">
                            {/* 🌟 BloodBox 컴포넌트 호출 및 props 전달 */}
                            <LeftDashBoard
                                userName="홍길동"
                                bpReading="135 / 95"
                                graph="80%"
                            />
                            <div className="dashBoard_Box02">{<RightDashBoard />}</div>
                        </div>
                    </div>
                </main>
            </div>
        </div>

    )
}
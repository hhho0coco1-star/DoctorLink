import Header from "../mainHeader/DL01_Header"
import SideBar from "../mainHeader/DL02_SideBar"

// css
import "./HealthQ.css";

export default function HealthQ() {

    return (

        // 건강문진표
        // 성별, 생년월일, 신장, 체중
        // 생활습관 : 음주, 흡연, 운동
        // 병력 및 약물복용 : 기저질환, 복용약물, 가족력
        // 통증부위, 전신증상, 정신건강
        <div className="main">
            {/* header */}
            <Header />
            <main className="mainBody">
                {/* aside */}
                <SideBar />

                <div className="main_healthq">
                    <div className="sub_healthq01">
                        {/* 기본정보 */}
                        <div>========== 기본정보 ==========</div>
                        <div>이름</div>
                        <div>생년월일</div>
                        <div>신장</div>
                        <div>체중</div>
                    </div>

                    <div className="sub_healthq02">
                        {/* 생활습관 */}
                        <div>========== 생활습관 ==========</div>
                        <div>음주</div>
                        <div>흡연</div>
                        <div>운동</div>
                    </div>

                    <div className="sub_healthq03">
                        {/* 병력 및 약물정보 */}
                        <div>========== 병력 및 약물정보 ==========</div>
                        <div>기저질환</div>
                        <div>복용약물</div>
                        <div>가족력</div>
                    </div>

                    <div className="sub_healthq04">
                        {/* 건강상태 */}
                        <div>========== 건강상태 ==========</div>
                        <div>통증부위</div>
                        <div>전신증상</div>
                        <div>정신건강</div>
                        <div>특이사항</div>
                    </div>
                </div>

            </main>
        </div>

    )
}
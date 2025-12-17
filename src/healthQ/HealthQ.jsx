import Header from "../mainHeader/DL01_Header"
import SideBar from "../mainHeader/DL02_SideBar"

export default function HealthQ() {

    return (

        <div className="main">
            {/* header */}
            <Header />
            <main className="mainBody">
                {/* aside */}
                <SideBar />

                <div>
                    {/* ======================== Text ======================== */}
                </div>

            </main>
        </div>

    )
}
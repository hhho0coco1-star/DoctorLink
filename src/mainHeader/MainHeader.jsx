import "./MainHeader.css";
import Header from "./DL01_Header";
import SideBar from "./DL02_SideBar";

export default function MainHeader() {

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
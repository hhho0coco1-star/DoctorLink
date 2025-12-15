import React from "react"
import "./MainHeader.css";
import MedicalInfoMenu from "../medicalInfoMenu/MedicalInfoMenu"

export default function MainHeader() {

    return (
        <div>
            {/* header */}
            <header>

            </header>

            {/* aside */}
            <div className="main-layout">
                <aside>

                </aside>
                <div className="MedicalInfoMenu">
                    <MedicalInfoMenu />
                </div>
            </div>

        </div>
    )
}
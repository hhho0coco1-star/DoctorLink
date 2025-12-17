import './HospitalSearchPage.css';
import { useState } from "react";
import MainHeader from "../header/MainHeader";
import RegionModal from './hospital/RegionModal';
import RegionSelectList from './hospital/RegionSelectList'
import DepartmentSelectList from './hospital/DepartmentSelectList';

function HospitalSearchPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

    const [region, setRegion] = useState("충남");
    const [department, setDepartment] = useState("진료과 선택");

    return (
        <MainHeader>
            {/* 상단 고정 헤더 */}
            <div>
                {/* 검색창 */}
                <div className='hospital_find'>
                    <div className='item'>
                        <div>🔎</div>
                        <input className='' type='text' placeholder='병원명, 진료과, 지역 검색'></input>
                    </div>
                </div>
                {/* 버튼식 필터 */}
                <div className='btn_filter'>
                    <div className='modal'>
                        <div class="item_top">
                            <div>
                                📎
                            </div>
                            <button className='select_button' onClick={() => { setModalType("region"); setIsOpen(true); }}>
                                <span>{region}</span>
                                <span className="select-button-arrow">▼</span>
                            </button>
                            <button className='select_button' onClick={() => { setModalType("department"); setIsOpen(true) }}>
                                <span>{department}</span>
                                <span className="select-button-arrow">▼</span>
                            </button>
                            <RegionModal isOpen={isOpen} onClose={() => { setIsOpen(false); }}>
                                {modalType === "region" && (
                                    <RegionSelectList
                                        onSelect={(value) => {
                                            setRegion(value);
                                            setIsOpen(false);
                                        }}
                                    />
                                )}

                                {modalType === "department" && (
                                    <DepartmentSelectList
                                        onSelect={(value) => {
                                            setDepartment(value);
                                            setIsOpen(false);
                                        }}
                                    />
                                )}
                            </RegionModal>
                        </div>
                        <div class="item_bottom">
                            <details>
                                <summary>야간</summary>
                                <ul>
                                    <li>평일 야간</li>
                                    <li>주간 야간</li>
                                    <li>평일 24시</li>
                                    <li>주간 24시</li>
                                </ul>
                            </details>
                        </div>

                    </div>
                </div>
            </div>
        </MainHeader>
    );
}

export default HospitalSearchPage;
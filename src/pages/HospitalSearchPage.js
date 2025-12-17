import './HospitalSearchPage.css';
import { useState } from "react";
import MainHeader from "../header/MainHeader";
import RegionModal from './hospital/RegionModal';
import RegionSelectList from './hospital/RegionSelectList'
import DepartmentSelectList from './hospital/DepartmentSelectList';
import Dropdown from './hospital/Dropdown';
import { timeOptions, holidayOptions } from './hospital/data/dropdownOptions';

function HospitalSearchPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

    const [region, setRegion] = useState("충남");
    const [department, setDepartment] = useState("진료과 선택");

    // 병원 정보를 담은 객체를 만듭니다.
    const hospitalInfo = {
        id : "hp001",
        title: "새로운병원",
        address: "충남 천안시 동남구 중앙로 123번길",
        department: "내과",
        phone: "041-123-4567",
        openTime: "09:00",
        closeTime: "18:00",
        isNight: false,
        isWeekendOpen: true,
        isHolidayOpen: false,
        isOpenNow: true,
        description: "친절한 진료와 깨끗한 시설을 자랑하는 병원입니다.",
        rating: "5.0",
        reviewCount: 50,
    };

    return (
        <MainHeader>
            <div className={`page ${isOpen ? "modal-open" : ""}`}>
                {/* 상단 고정 헤더 */}
                <div className="page-content">
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

                            </div>
                            {/* 드롭다운 */}
                            <div className="item_bottom">
                                <Dropdown items={timeOptions} />
                                <Dropdown items={holidayOptions} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* 병원 목록 */}

                <div className='hospital-list-wrap'>
                    <div className='hospital-list'>
                        <div className='hospital-card'>
                            <div className='info'>
                                <div className='title'>
                                    {hospitalInfo.title}
                                </div>
                                <div className='status-row'>
                                    <span className='isopen'>{hospitalInfo.isOpenNow ? '진료중' : '휴진'}</span>
                                    <span className='font-col-gray'>{hospitalInfo.closeTime} 진료종료</span>
                                </div>
                                <div className='locationm-row font-col-gray'>
                                    {hospitalInfo.address}
                                </div>
                                <div className='card-meta-row'>
                                    <span>🔶</span>
                                    <span className='font-col-gray'>{hospitalInfo.rating}</span>
                                    <span className='font-col-gray'> • 리뷰 {hospitalInfo.reviewCount}</span>
                                    <span className='font-col-gray'> • {hospitalInfo.department}</span>
                                </div>
                            </div>
                            <div className="hospital-card-thumb">
                                <img
                                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                                    alt="병원 내부"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        borderRadius: "10px"
                                    }}
                                />
                            </div>
                        </div>

                        <div className='hospital-card'>
                            <div className='info'>
                                <div className='title'>
                                    {hospitalInfo.title}
                                </div>
                                <div className='status-row'>
                                    <span className='isopen'>{hospitalInfo.isOpenNow ? '진료중' : '휴진'}</span>
                                    <span className='font-col-gray'>{hospitalInfo.closeTime} 진료종료</span>
                                </div>
                                <div className='locationm-row font-col-gray'>
                                    {hospitalInfo.address}
                                </div>
                                <div className='card-meta-row'>
                                    <span>🔶</span>
                                    <span className='font-col-gray'>{hospitalInfo.rating}</span>
                                    <span className='font-col-gray'> • 리뷰 {hospitalInfo.reviewCount}</span>
                                    <span className='font-col-gray'> • {hospitalInfo.department}</span>
                                </div>
                            </div>
                            <div className="hospital-card-thumb">
                                <img
                                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                                    alt="병원 내부"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        borderRadius: "10px"
                                    }}
                                />
                            </div>
                        </div>

                        <div className='hospital-card'>
                            <div className='info'>
                                <div className='title'>
                                    {hospitalInfo.title}
                                </div>
                                <div className='status-row'>
                                    <span className='isopen'>{hospitalInfo.isOpenNow ? '진료중' : '휴진'}</span>
                                    <span className='font-col-gray'>{hospitalInfo.closeTime} 진료종료</span>
                                </div>
                                <div className='locationm-row font-col-gray'>
                                    {hospitalInfo.address}
                                </div>
                                <div className='card-meta-row'>
                                    <span>🔶</span>
                                    <span className='font-col-gray'>{hospitalInfo.rating}</span>
                                    <span className='font-col-gray'> • 리뷰 {hospitalInfo.reviewCount}</span>
                                    <span className='font-col-gray'> • {hospitalInfo.department}</span>
                                </div>
                            </div>
                            <div className="hospital-card-thumb">
                                <img
                                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                                    alt="병원 내부"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        borderRadius: "10px"
                                    }}
                                />
                            </div>
                        </div>

                        <div className='hospital-card'>
                            <div className='info'>
                                <div className='title'>
                                    {hospitalInfo.title}
                                </div>
                                <div className='status-row'>
                                    <span className='isopen'>{hospitalInfo.isOpenNow ? '진료중' : '휴진'}</span>
                                    <span className='font-col-gray'>{hospitalInfo.closeTime} 진료종료</span>
                                </div>
                                <div className='locationm-row font-col-gray'>
                                    {hospitalInfo.address}
                                </div>
                                <div className='card-meta-row'>
                                    <span>🔶</span>
                                    <span className='font-col-gray'>{hospitalInfo.rating}</span>
                                    <span className='font-col-gray'> • 리뷰 {hospitalInfo.reviewCount}</span>
                                    <span className='font-col-gray'> • {hospitalInfo.department}</span>
                                </div>
                            </div>
                            <div className="hospital-card-thumb">
                                <img
                                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                                    alt="병원 내부"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        borderRadius: "10px"
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
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
        </MainHeader>
    );
}

export default HospitalSearchPage;
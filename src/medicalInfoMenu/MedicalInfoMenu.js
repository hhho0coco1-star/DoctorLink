import { DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Pill, CalendarCheck, MapPin, CalendarClock } from 'lucide-react';
import './MedicalInfoMenu.css'

function MedicalInfoMenu() {

    return (
        <div className='MedicalInfo_top'>
            <h1>의료 정보</h1>

            <div className="MedicalInfo_Container">
                {/* 의료 정보 박스 */}

                <div className="MedicalInfo_Container_box bd_blue">
                    <DocumentTextIcon className="MedicalInfo_box_icon blue" />
                    <p className='bold'>진료 기록</p>
                    <p>총 12건</p>
                </div>
                <div className="MedicalInfo_Container_box bd_pink">
                    <Pill className="MedicalInfo_box_icon pink" />
                    <p className='bold'>약물 기록</p>
                    <p>총 3건</p>
                </div>
                <div className="MedicalInfo_Container_box bd_violet">
                    <CalendarCheck className="MedicalInfo_box_icon violet" />
                    <p className='bold'>예약 내역</p>
                    <p>총 3건</p>
                </div>

            </div>

            {/* 진료기록, 복용 약물 컨테이너 */}
            <div className="section">
                <div className='MedicalInfo_dashboard'>
                    <div className="dashboard-section">
                        <div className='MedicalInfo_dashboard_layout'>
                            <div>
                                <div className="section-title">
                                    <DocumentTextIcon className="MedicalInfo_dashboard_icon blue" />
                                    <span className='bold'>최근 진료 기록</span>
                                </div>
                            </div>

                            <div className='MedicalInfo_dashboard_layout_box blue_bar'>
                                <div className='layout_between'>
                                    <span className='bold'>진료기록</span>
                                    <span className='completed'>완료</span>
                                </div>
                                <div>
                                    <p className='dashboard_layout_font'>김성민 교수(내과)</p>
                                    <p className='dashboard_layout_font'>2025.11.30</p>
                                    <p className='dashboard_layout_font'>상세보기</p>
                                </div>
                            </div>
                            <div className='MedicalInfo_dashboard_layout_box blue_bar'>
                                <div className='layout_between'>
                                    <span className='bold'>진료기록</span>
                                    <span className='completed'>완료</span>
                                </div>
                                <div>
                                    <p className='dashboard_layout_font'>김성민 교수(내과)</p>
                                    <p className='dashboard_layout_font'>2025.11.30</p>
                                    <p className='dashboard_layout_font'>상세보기</p>
                                </div>
                            </div>
                            <div className='MedicalInfo_dashboard_layout_box blue_bar'>
                                <div className='layout_between'>
                                    <span className='bold'>진료기록</span>
                                    <span className='completed'>완료</span>
                                </div>
                                <div>
                                    <p className='dashboard_layout_font'>김성민 교수(내과)</p>
                                    <p className='dashboard_layout_font'>2025.11.30</p>
                                    <p className='dashboard_layout_font'>상세보기</p>
                                </div>
                            </div>
                            <div className='medical_records_view_all item_footer'>
                                <button className='medical_records_view_all_btn bg_blue'>전체진료기록보기</button>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-section">
                        <div className='MedicalInfo_dashboard_layout'>
                            <div>
                                <div className="section-title">
                                    <Pill className="MedicalInfo_dashboard_icon pink" />
                                    <span className='bold'>복용중인 약물</span>
                                </div>
                            </div>

                            <div className='MedicalInfo_dashboard_layout_box pink_bar'>
                                <div className='layout_between'>
                                    <span className='bold'>아스피린 100mg</span>
                                    <Pill className="MedicalInfo_dashboard_icon pink" />
                                </div>
                                <div>
                                    <p className='dashboard_layout_font'>1일 1회, 아침 직후</p>
                                    <p className='dashboard_layout_font'>처방의 : 김성민</p>
                                    {/* 막대 그래프 */}
                                    <div className="progress">
                                        <div className="progress__bar">
                                            <div className="progress__fill" style={{ width: "20%" }}></div>
                                        </div>
                                        <span className="progress__label">25일</span>
                                    </div>
                                </div>
                            </div>
                            <div className='MedicalInfo_dashboard_layout_box pink_bar'>
                                <div className='layout_between'>
                                    <span className='bold'>아스피린 100mg</span>
                                    <Pill className="MedicalInfo_dashboard_icon pink" />
                                </div>
                                <div>
                                    <p className='dashboard_layout_font'>1일 1회, 아침 직후</p>
                                    <p className='dashboard_layout_font'>처방의 : 김성민</p>
                                    {/* 막대 그래프 */}
                                    <div className="progress">
                                        <div className="progress__bar">
                                            <div className="progress__fill" style={{ width: "60%" }}></div>
                                        </div>
                                        <span className="progress__label">12일</span>
                                    </div>
                                </div>
                            </div>
                            <div className='MedicalInfo_dashboard_layout_box pink_bar'>
                                <div className='layout_between'>
                                    <span className='bold'>아스피린 100mg</span>
                                    <Pill className="MedicalInfo_dashboard_icon pink" />
                                </div>
                                <div>
                                    <p className='dashboard_layout_font'>1일 1회, 아침 직후</p>
                                    <p className='dashboard_layout_font'>처방의 : 김성민</p>
                                    {/* 막대 그래프 */}
                                    <div className="progress">
                                        <div className="progress__bar">
                                            <div className="progress__fill" style={{ width: "70%" }}></div>
                                        </div>
                                        <span className="progress__label">20일</span>
                                    </div>
                                </div>
                            </div>
                            <div className='medical_records_view_all item_footer'>
                                <button className='medical_records_view_all_btn bg_pink'>전체진료기록보기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section">
                <div className='reservation'>
                    <div className='reservation_header'>
                        <CalendarCheck className="MedicalInfo_dashboard_icon violet" />
                        <span>예정된 예약</span>
                    </div>
                    <div className='reservation_list'>
                        <div className='reservation_item'>
                            <div className="reservation_line">
                                <div className="Litem">
                                    <div className="name">
                                        <span className="item_padding">김성민 교수</span>
                                        <span className="item_padding box">내과</span>
                                    </div>
                                    <div className='time'>
                                        <CalendarClock className="MedicalInfo_dashboard_icon" />
                                        <span className="item_padding">2025.12.10(화)</span>
                                        <ClockIcon className="MedicalInfo_dashboard_icon" />
                                        <span className="item_padding">14:00</span>
                                        <MapPin className="MedicalInfo_dashboard_icon" />
                                        <span className="item_padding">3층 301호</span>
                                    </div>
                                </div>
                                <div className="Ritem">
                                    <button className='btn_sty_edit'>변경</button>
                                    <button className='btn_sty_cancel'>취소</button>
                                </div>
                            </div>
                        </div>
                        <div className='reservation_item'>
                            <div className="reservation_line">
                                <div className="Litem">
                                    <div className="name">
                                        <span className="item_padding">김성민 교수</span>
                                        <span className="item_padding box">내과</span>
                                    </div>
                                    <div className='time'>
                                        <CalendarClock className="MedicalInfo_dashboard_icon" />
                                        <span className="item_padding">2025.12.10(화)</span>
                                        <ClockIcon className="MedicalInfo_dashboard_icon" />
                                        <span className="item_padding">14:00</span>
                                        <MapPin className="MedicalInfo_dashboard_icon" />
                                        <span className="item_padding">3층 301호</span>
                                    </div>
                                </div>
                                <div className="Ritem">
                                    <button className='btn_sty_edit'>변경</button>
                                    <button className='btn_sty_cancel'>취소</button>
                                </div>
                            </div>
                        </div>
                        <div className='reservation_item'>
                            <div className="reservation_line">
                                <div className="Litem">
                                    <div className="name">
                                        <span className="item_padding">김성민 교수</span>
                                        <span className="item_padding box">내과</span>
                                    </div>
                                    <div className='time'>
                                        <CalendarClock className="MedicalInfo_dashboard_icon" />
                                        <span className="item_padding">2025.12.10(화)</span>
                                        <ClockIcon className="MedicalInfo_dashboard_icon" />
                                        <span className="item_padding">14:00</span>
                                        <MapPin className="MedicalInfo_dashboard_icon" />
                                        <span className="item_padding">3층 301호</span>
                                    </div>
                                </div>
                                <div className="Ritem">
                                    <button className='btn_sty_edit'>변경</button>
                                    <button className='btn_sty_cancel'>취소</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default MedicalInfoMenu;
import { useState } from "react";
import MainHeader from "../header/MainHeader";
import "./CalendarOverview.css";

/* ================= 약 예제 데이터 (추가) ================= */
const medicationSamples = [
    { id: 1, name: "아스피린", dose: "100mg", startDay: 5, days: 7 },
    { id: 2, name: "고혈압약", dose: "1정", startDay: 10, days: 14 }
];

export default function CalendarOverview() {
    /* ================= 기존 상태 ================= */
    const [selectedDay, setSelectedDay] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [events, setEvents] = useState({});
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        dept: "",
        time: ""
    });

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const today = new Date().getDate(); // ⭐ 오늘 날짜 (추가)

    /* ================= 예약 모달 로직 (기존) ================= */
    const openAddModal = (day) => {
        setSelectedDay(day);
        setEditingIndex(null);
        setForm({ dept: "", time: "" });
        setIsModalOpen(true);
    };

    const openEditModal = (day, index) => {
        const target = events[day][index];
        const [dept, time] = target.title.split(" · ");
        setSelectedDay(day);
        setEditingIndex(index);
        setForm({ dept, time });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setForm({ dept: "", time: "" });
    };

    const saveReservation = () => {
        if (!form.dept.trim()) {
            setError("진료과를 입력해주세요.");
            return;
        }
        if (!form.time) {
            setError("시간을 선택해주세요.");
            return;
        }
        setError("");

        setEvents(prev => {
            const dayEvents = prev[selectedDay] || [];

            if (editingIndex !== null) {
                const updated = [...dayEvents];
                updated[editingIndex] = {
                    type: "reservation",
                    title: `${form.dept} · ${form.time}`
                };
                return { ...prev, [selectedDay]: updated };
            }

            return {
                ...prev,
                [selectedDay]: [
                    ...dayEvents,
                    { type: "reservation", title: `${form.dept} · ${form.time}` }
                ]
            };
        });
        closeModal();
    };

    const deleteReservation = () => {
        setEvents(prev => {
            const filtered = prev[selectedDay].filter((_, i) => i !== editingIndex);
            return { ...prev, [selectedDay]: filtered };
        });
        closeModal();
    };

    /* ================= 약 기능 (추가) ================= */

    // 약 → 자동으로 날짜에 등록
    const addMedicationToCalendar = (med) => {
        setEvents(prev => {
            const updated = { ...prev };

            for (let i = 0; i < med.days; i++) {
                const day = med.startDay + i;
                if (day > 31) break;

                updated[day] = [
                    ...(updated[day] || []),
                    {
                        type: "medication",
                        name: med.name,
                        dose: med.dose,
                        taken: false
                    }
                ];
            }
            return updated;
        });
    };

    // 오늘 날짜의 약 전부 복용 완료
    const markTodayTaken = () => {
        setEvents(prev => ({
            ...prev,
            [today]:
                prev[today]?.map(e =>
                    e.type === "medication"
                        ? { ...e, taken: true }
                        : e
                ) || []
        }));
    };

    return (
        <MainHeader>
        <div className="event-calendar">            
            <h2>병원 예약 / 복약 달력</h2>

            {/* ================= 약 예제 버튼 (추가) ================= */}
            <div className="medication-samples">
                {medicationSamples.map(med => (
                    <button
                        key={med.id}
                        onClick={() => addMedicationToCalendar(med)}
                    >
                        {med.name} {med.dose}
                    </button>
                ))}
            </div>

            {/* ================= 캘린더 ================= */}
            <div className="calendar-grid">
                {["일", "월", "화", "수", "목", "금", "토"].map(d => (
                    <div key={d} className="day-name">{d}</div>
                ))}

                {days.map(day => (
                    <div
                        key={day}
                        className={`calendar-cell ${day === today ? "today" : ""}`}
                        onClick={() => openAddModal(day)}
                    >
                        <span className="date-number">{day}</span>

                        <div className="event-list">
                            {events[day]?.map((event, idx) => {
                                // 예약
                                if (event.type === "reservation") {
                                    return (
                                        <div
                                            key={idx}
                                            className="event event--reservation"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openEditModal(day, idx);
                                            }}
                                        >
                                            {event.title}
                                        </div>
                                    );
                                }

                                // 약
                                if (event.type === "medication") {
                                    return (
                                        <div
                                            key={idx}
                                            className={`event event--medication ${event.taken ? "taken" : ""}`}
                                        >
                                            {event.name} {event.dose}
                                        </div>
                                    );
                                }

                                return null;
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= ⭐ 달력 바로 아래 버튼 (추가) ================= */}
            <div className="calendar-footer">
                <button className="quick-take-btn" onClick={markTodayTaken}>
                    오늘 약 복용 완료
                </button>
            </div>

            {/* ================= 예약 모달 (기존) ================= */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3>{editingIndex !== null ? "예약 수정" : "예약 추가"}</h3>

                        {error && <p className="error-text">{error}</p>}

                        <input
                            placeholder="진료과 (예: 내과)"
                            value={form.dept}
                            onChange={e => setForm({ ...form, dept: e.target.value })}
                        />
                        <input
                            type="time"
                            value={form.time}
                            onChange={e => setForm({ ...form, time: e.target.value })}
                        />

                        <div className="modal-actions">
                            {editingIndex !== null && (
                                <button className="btn cancel" onClick={deleteReservation}>
                                    삭제
                                </button>
                            )}
                            <button className="btn confirm" onClick={saveReservation}>
                                저장
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </MainHeader>
    );
}

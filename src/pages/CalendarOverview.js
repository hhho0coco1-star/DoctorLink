import { useState } from "react";
import MainHeader from "../header/MainHeader";
import "./CalendarOverview.css";


export default function CalendarOverview() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [events, setEvents] = useState({});
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        dept: "",
        time: "" // HH:MM 형식
    });
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    /* ---------- 모달 제어 ---------- */
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
    /* ---------- 저장 / 수정 ---------- */
    const saveReservation = () => {
        // if (!form.dept || !form.time) return;
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
            // 수정
            if (editingIndex !== null) {
                const updated = [...dayEvents];
                updated[editingIndex] = {
                    type: "reservation",
                    title: `${form.dept} · ${form.time}`
                };
                return { ...prev, [selectedDay]: updated };
            }
            // 신규 추가
            return {
                ...prev,
                [selectedDay]: [...dayEvents, { type: "reservation", title: `${form.dept} · ${form.time}` }]
            };
        });
        closeModal();
    };
    /* ---------- 취소(삭제) ---------- */
    const deleteReservation = () => {
        setEvents(prev => {
            const filtered = prev[selectedDay].filter((_, i) => i !== editingIndex);
            return { ...prev, [selectedDay]: filtered };
        });
        closeModal();
    };
    return (
        <div className="event-calendar">
            <h2>병원 예약 달력</h2>
            <div className="calendar-grid">
                {["일", "월", "화", "수", "목", "금", "토"].map(d => (
                    <div key={d} className="day-name">{d}</div>
                ))}

                {days.map(day => (
                    <div key={day} className="calendar-cell" onClick={() => openAddModal(day)}>
                        <span className="date-number">{day}</span>
                        <div className="event-list">
                            {events[day]?.map((event, idx) => (
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
                            ))}
                        </div>
                    </div>
                ))}
            </div>
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
                            type="time" // HH:MM 강제
                            value={form.time}
                            onChange={e => setForm({ ...form, time: e.target.value })}
                        />
                        <div className="modal-actions">
                            {editingIndex !== null && (
                                <button className="btn cancel" onClick={deleteReservation}>삭제</button>
                            )}
                            <button className="btn confirm" onClick={saveReservation}>저장</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

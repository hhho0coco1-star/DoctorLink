import { useEffect, useState } from "react";
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
    const calendarStorageKey = "calendarEvents";
    const [events, setEvents] = useState(() => {
        try {
            const raw = localStorage.getItem(calendarStorageKey);
            if (!raw) return {};
            const parsed = JSON.parse(raw);
            return parsed && typeof parsed === "object" ? parsed : {};
        } catch (e) {
            return {};
        }
    });
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        dept: "",
        time: ""
    });

    /* ================= 약 모달(추가) ================= */
    const [isMedModalOpen, setIsMedModalOpen] = useState(false);
    const [medError, setMedError] = useState("");
    const [medForm, setMedForm] = useState({
        name: "",
        dose: "",
        startDay: new Date().getDate(),
        intervalDays: 1, // 몇일마다
        times: 1, // 몇번(총 복용 횟수)
    });

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const today = new Date().getDate(); // ⭐ 오늘 날짜 (추가)

    // ✅ HospitalDetail 등 다른 화면에서 저장한 예약/이벤트를 불러오기
    useEffect(() => {
        try {
            const raw = localStorage.getItem(calendarStorageKey);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === "object") setEvents(parsed);
        } catch (e) {
            // ignore
        }
    }, []);

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

    const openMedicationModal = (med) => {
        setMedError("");
        setMedForm({
            name: med?.name ?? "",
            dose: med?.dose ?? "",
            startDay: today,
            intervalDays: 1,
            times: 1,
        });
        setIsMedModalOpen(true);
    };

    const closeMedicationModal = () => {
        setIsMedModalOpen(false);
        setMedError("");
    };

    // 약 → (시작일/간격/개수) 규칙대로 캘린더에 등록 (해당 월 31일까지)
    const applyMedicationToCalendar = () => {
        const name = medForm.name.trim();
        const dose = medForm.dose.trim();
        const startDay = Number(medForm.startDay);
        const intervalDays = Number(medForm.intervalDays);
        const times = Number(medForm.times);

        if (!name) {
            setMedError("약 이름을 입력해주세요.");
            return;
        }
        if (!dose) {
            setMedError("용량/단위를 입력해주세요. (예: 100mg)");
            return;
        }
        if (!Number.isFinite(startDay) || startDay < 1 || startDay > 31) {
            setMedError("시작일은 1~31 사이로 입력해주세요.");
            return;
        }
        if (!Number.isFinite(intervalDays) || intervalDays < 1 || intervalDays > 31) {
            setMedError("몇일마다는 1~31 사이로 입력해주세요.");
            return;
        }
        if (!Number.isFinite(times) || times < 1 || times > 99) {
            setMedError("몇번은 1~99 사이로 입력해주세요.");
            return;
        }

        setMedError("");
        setEvents((prev) => {
            const updated = { ...prev };
            for (let i = 0; i < times; i++) {
                const day = startDay + i * intervalDays;
                if (day > 31) break;
                updated[day] = [
                    ...(updated[day] || []),
                    {
                        type: "medication",
                        name,
                        dose,
                        times,
                        taken: false,
                    },
                ];
            }
            return updated;
        });
        closeMedicationModal();
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

    // 특정 날짜의 특정 약 클릭 시 복용(taken) 토글
    const toggleMedicationTaken = (day, index) => {
        setEvents((prev) => {
            const dayEvents = prev[day] || [];
            const target = dayEvents[index];
            if (!target || target.type !== "medication") return prev;

            const updated = [...dayEvents];
            updated[index] = { ...target, taken: !Boolean(target.taken) };
            return { ...prev, [day]: updated };
        });
    };

    const resetCalendar = () => {
        if (!window.confirm("달력에 저장된 예약/복약 데이터를 초기화할까요?")) return;
        try {
            localStorage.removeItem(calendarStorageKey);
        } catch (e) {
            // ignore
        }
        setEvents({});
        setSelectedDay(null);
        setEditingIndex(null);
        setError("");
        setForm({ dept: "", time: "" });
        setIsModalOpen(false);
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
                        onClick={() => openMedicationModal(med)}
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
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleMedicationTaken(day, idx);
                                            }}
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
                <button className="clear-calendar-btn" onClick={resetCalendar}>
                    달력 초기화
                </button>
            </div>

            {/* ================= 예약 모달 (기존) ================= */}
            {isModalOpen && (
                <div className="calendar-modal-overlay" onClick={closeModal}>
                    <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
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

            {/* ================= 약 모달 (추가) ================= */}
            {isMedModalOpen && (
                <div className="calendar-modal-overlay" onClick={closeMedicationModal}>
                    <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>복약 등록</h3>

                        {medError && <p className="error-text">{medError}</p>}

                        <input
                            placeholder="약 이름 (예: 아스피린)"
                            value={medForm.name}
                            onChange={(e) => setMedForm((p) => ({ ...p, name: e.target.value }))}
                        />
                        <input
                            placeholder="용량/단위 (예: 100mg, 1정)"
                            value={medForm.dose}
                            onChange={(e) => setMedForm((p) => ({ ...p, dose: e.target.value }))}
                        />

                        <div className="calendar-modal-grid">
                            <div className="calendar-modal-field">
                                <label className="calendar-modal-label">시작일(일)</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={31}
                                    value={medForm.startDay}
                                    onChange={(e) =>
                                        setMedForm((p) => ({ ...p, startDay: Number(e.target.value) }))
                                    }
                                />
                            </div>
                            <div className="calendar-modal-field">
                                <label className="calendar-modal-label">몇일마다</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={31}
                                    value={medForm.intervalDays}
                                    onChange={(e) =>
                                        setMedForm((p) => ({ ...p, intervalDays: Number(e.target.value) }))
                                    }
                                />
                            </div>
                            <div className="calendar-modal-field">
                                <label className="calendar-modal-label">몇번</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={99}
                                    value={medForm.times}
                                    onChange={(e) =>
                                        setMedForm((p) => ({ ...p, times: Number(e.target.value) }))
                                    }
                                />
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="btn cancel" onClick={closeMedicationModal}>
                                취소
                            </button>
                            <button className="btn confirm" onClick={applyMedicationToCalendar}>
                                캘린더에 적용
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </MainHeader>
    );
}

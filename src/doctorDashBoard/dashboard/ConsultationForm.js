import './Table.css';

function ConsultationForm() {
  return (
    <div className="consultation-box">
      <h2>🩺 환자 진료 상담 내용</h2>
      <label htmlFor="consultation">환자 진료 내용</label><br />
      <textarea
        id="consultation"
        rows="6"
        cols="40"
        placeholder="환자 진료 내용을 입력하세요"
      />
    </div>
  );
}

export default ConsultationForm;
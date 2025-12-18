import './Table.css';
import { drugsData } from '../../data/dummyData';
import { useState } from 'react';

function PrescriptionSelector() {
  const [selectedDrugs, setSelectedDrugs] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedDrugs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="prescription-box">
      <h2>💊 처방 약 조회</h2>
      <label className="section-label">약품 선택</label>

      <div className="scroll-box">
        {drugsData.map((drug) => (
          <div key={drug.id} className="checkbox-row">
            <input
              type="checkbox"
              checked={selectedDrugs.includes(drug.id)}
              onChange={() => handleCheckboxChange(drug.id)}
            />
            <span className="drug-name">{drug.name}</span>
          </div>
        ))}
      </div>

      <div className="selected-list">
        <strong>선택된 약품:</strong>
        {selectedDrugs.length > 0 ? (
          <ul>
            {selectedDrugs.map((id) => {
              const drug = drugsData.find((d) => d.id === id);
              return <li key={id}>{drug?.name}</li>;
            })}
          </ul>
        ) : (
          <p>선택된 약품이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default PrescriptionSelector;
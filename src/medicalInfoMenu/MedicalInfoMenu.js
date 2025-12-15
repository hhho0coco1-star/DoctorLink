import { DocumentTextIcon } from '@heroicons/react/24/outline';
import './MedicalInfoMenu.css'

function MedicalInfoMenu() {

    return (
        <div>
            <h1>의료 정보</h1>
            <div className="MedicalInfo_Container">
                <div className="MedicalInfo_Container_box">
                    <DocumentTextIcon className="MedicalInfo_box_icon" />
                </div>
            </div>
        </div>
    );

}

export default MedicalInfoMenu;
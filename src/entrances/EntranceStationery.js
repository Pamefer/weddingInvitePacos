import { useState } from 'react';
import './EntranceStationery.css';

function EntranceStationery({ setIsFirstTime, data }) {
    const [isOpening, setIsOpening] = useState(false);
    const { EVENT } = data;

    const coupleNames = `${EVENT.bride} & ${EVENT.groom}`;

    const handleOpen = () => {
        setIsOpening(true);
        setIsFirstTime(false);
    };

    return (
        <div className="entrance-scene">
            <div className="eyebrow">tienes una invitación</div>

            <div
                className={`scene ${isOpening ? 'opening' : ''}`}
                onClick={handleOpen}
            >
                <div className="env-shadow"></div>
                <div className="envelope">
                    <div className="flap-edge">
                        <svg viewBox="0 0 240 160" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="120" y2="86" stroke="rgba(184,147,90,0.4)" strokeWidth="1" />
                            <line x1="240" y1="0" x2="120" y2="86" stroke="rgba(184,147,90,0.4)" strokeWidth="1" />
                            <line x1="0" y1="0" x2="120" y2="90" stroke="rgba(0,0,0,0.04)" strokeWidth="6" />
                            <line x1="240" y1="0" x2="120" y2="90" stroke="rgba(0,0,0,0.04)" strokeWidth="6" />
                        </svg>
                    </div>
                    <div className="seal"><span className="script">Abrir</span></div>
                </div>
            </div>

            <div className="names-hint script">{coupleNames}</div>
            <div className="tap-hint">toca el sello para abrir</div>
        </div>
    );
}

export default EntranceStationery;
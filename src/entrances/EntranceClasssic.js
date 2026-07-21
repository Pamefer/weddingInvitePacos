import './EntranceClassic.css';
import { MEDIA } from '../labels'

const EntranceClassic = ({ setIsFirstTime }) => {

    return (
        <div className="App">
            <div
                className="fullscreen-cover"
                onClick={() => setIsFirstTime(false)}
            >
                <img src={MEDIA.sobre_optimized} alt="sobre principal" className="background-image-sobre" />
            </div>
        </div>

    );
};

export default EntranceClassic;
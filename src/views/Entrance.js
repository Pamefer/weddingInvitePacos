import './Entrance.css';
import { MEDIA } from '../labels';

const Entrance = ({ setIsFirstTime }) => {

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

export default Entrance;
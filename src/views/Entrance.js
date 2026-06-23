import sobre from '../static/sobre_optimized.webp';
import './Entrance.css';

const Entrance = ({ setIsFirstTime }) => {

    return (
        <div className="App">
            <div
                className="fullscreen-cover"
                onClick={() => setIsFirstTime(false)}
            >
                <img src={sobre} alt="sobre principal" className="background-image-sobre" />
            </div>
        </div>

    );
};

export default Entrance;
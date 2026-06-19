import sobre from '../static/sobre_optimized.webp';

const Entrance = ({ setIsFirstTime }) => {

    return (
        <div
            className="fullscreen-cover"
            onClick={() => setIsFirstTime(false)}
        >
            <img src={sobre} alt="sobre principal" className="background-image-sobre" />
        </div>
    );
};

export default Entrance;
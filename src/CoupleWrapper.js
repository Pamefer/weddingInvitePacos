import { useParams } from 'react-router-dom';
import { COUPLES } from './data/couples';
import Invitation from './views/Invitation';
import Entrance from './views/Entrance';
import { useState } from 'react';

function CoupleWrapper() {
    const { coupleSlug } = useParams();
    const data = COUPLES[coupleSlug];
    const [isFirstTime, setIsFirstTime] = useState(true);

    if (!data) {
        return <div>Invitación no encontrada</div>;
    }

    return isFirstTime
        ? <Entrance setIsFirstTime={setIsFirstTime} />
        : <Invitation data={data} />;
}
export default CoupleWrapper;
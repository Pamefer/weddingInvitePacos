import { useParams } from 'react-router-dom';
import { COUPLES } from './data/couples';
import { ENTRANCES } from './entrances';
import Invitation from './views/Invitation';
import { useState } from 'react';

function CoupleWrapper() {
    const { coupleSlug } = useParams();
    const data = COUPLES[coupleSlug];
    const [isFirstTime, setIsFirstTime] = useState(true);

    if (!data) {
        return <div>Invitación no encontrada</div>;
    }
    const EntranceComponent = ENTRANCES[data.THEME?.entrance] || ENTRANCES.classic;

    return isFirstTime
        ? <EntranceComponent setIsFirstTime={setIsFirstTime} data={data} />
        : <Invitation data={data} />;
}
export default CoupleWrapper;
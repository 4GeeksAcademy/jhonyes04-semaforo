import React from 'react';

//include images into your bundle
import rigoImage from '../../img/rigo-baby.jpg';
import { TrafficLigth } from './TrafficLigth';

//create your first component
const Home = () => {
    return (
        <div className="text-center">
            <TrafficLigth />
        </div>
    );
};

export default Home;

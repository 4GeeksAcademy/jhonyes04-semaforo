import { useEffect, useState } from 'react';
import './TrafficLigth.css';

const TIEMPO_CAMBIO = 1;
const COLORES_INICIALES = ['red', 'yellow', 'green'];

const ESPERA = {
    red: 5,
    yellow: 2,
    green: 5,
    purple: 1,
};

export const TrafficLigth = () => {
    const [colorSeleccionado, setColorSeleccionado] = useState('red');
    const [alternar, setAlternar] = useState(false);
    const [mostarPurpura, setMostrarPurpura] = useState(false);

    const coloresSemaforo = mostarPurpura
        ? [...COLORES_INICIALES, 'purple']
        : [...COLORES_INICIALES];

    useEffect(() => {
        if (!mostarPurpura && colorSeleccionado === 'purple')
            setColorSeleccionado('green');

        if (!alternar) return;

        const intervalo = setInterval(() => {
            setColorSeleccionado((prev) => {
                if (prev === 'red') return mostarPurpura ? 'purple' : 'green';
                if (prev === 'yellow') return 'red';
                if (prev === 'green') return 'yellow';
                if (prev === 'purple') return 'green';

                return 'red';
            });
        }, TIEMPO_CAMBIO * 1000);

        return () => clearInterval(intervalo);
    });

    const selectColor = (seleccionado) => {
        setAlternar(false);
        setColorSeleccionado(seleccionado);
    };

    return (
        <div className="container">
            <div className="row d-flex">
                <div className="col-12 col-md-4 ms-auto">
                    <div className="trafficTop "></div>
                    <div className="semaforo">
                        {coloresSemaforo.map((color) => (
                            <div
                                onClick={() => selectColor(color)}
                                className={`${color} ${colorSeleccionado === color ? 'light' : ''}`}
                                key={color}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="col-12 col-md-5 me-auto mt-5">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Opciones de semáforo</h5>
                        </div>
                        <div className="card-body d-flex flex-column gap-2">
                            <button
                                onClick={() => setAlternar(!alternar)}
                                className={`btn w-100 ${alternar ? 'btn-danger' : 'btn-primary'}`}
                            >
                                {alternar ? 'Parar' : 'Alternar colores'}
                            </button>

                            <button
                                onClick={() =>
                                    setMostrarPurpura(!mostarPurpura)
                                }
                                className={`btn w-100 ${mostarPurpura ? 'btn-danger' : 'btn-warning'}`}
                            >
                                {mostarPurpura
                                    ? 'Quitar púrpura'
                                    : 'Agregar púrpura'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

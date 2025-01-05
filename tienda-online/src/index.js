import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ContenedorGlobal, CubosDecorativos } from './elementos/Maquetacion';

const Index = () => {
	return (
		<ContenedorGlobal>
			<App />
			<CubosDecorativos $cubo={1} />
			<CubosDecorativos $cubo={2} />
			<CubosDecorativos $cubo={3} />
			<CubosDecorativos $cubo={4} />
		</ContenedorGlobal>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);

import sistemaReservas from './helpers/sistemaReservas';
import './style.css'  


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Vite + TypeScript esto es type script</h1>
  </div>
`;

sistemaReservas().test();



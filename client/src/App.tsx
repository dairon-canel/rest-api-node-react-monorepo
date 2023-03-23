import { useState, useEffect, ReactElement } from 'react';
import './App.css';
import GatewayList from './components/GatewayList';
import Modal from './components/Modal';

function App() {
  const [modalElement, setModalElement] = useState<ReactElement | null>(null);
  return (
    <>
      <div className="h-screen grid grid-rows-[auto_1fr] relative bg-slate-500">
        <h1 className="text-center text-3xl py-8 font-extrabold text-base-100 self-center">
          Gateway Master
        </h1>
        <GatewayList setModalElement={setModalElement} />
      </div>
      <Modal modalKey="modal_details" onClose={() => setModalElement(null)}>
        <div>{modalElement}</div>
      </Modal>
    </>
  );
}

export default App;

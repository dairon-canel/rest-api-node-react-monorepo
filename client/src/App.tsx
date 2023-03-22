import { useState, useEffect } from 'react';
import './App.css';
import GatewayList from './components/GatewayList';
import Modal from './components/Modal';

function App() {
  return (
    <>
      <div className="h-screen grid grid-rows-[auto_1fr] relative bg-slate-500">
        <h1 className="text-center text-3xl py-8 font-extrabold text-base-100 self-center">
          Gateway Master
        </h1>
        <GatewayList />
      </div>
      <Modal modalKey="modal-add-form">
        <h3 className="font-bold text-lg">ADD GATEWAY FORM</h3>
        <div className="modal-action">
          <label htmlFor="modal-add-form" className="btn">
            Yay!
          </label>
        </div>
      </Modal>
    </>
  );
}

export default App;

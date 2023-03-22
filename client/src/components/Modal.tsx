import { FC } from 'react';

interface IModalProps {
  children: string | JSX.Element | JSX.Element[];
  modalKey: string;
}

const Modal: FC<IModalProps> = ({ children, modalKey }) => {
  return (
    <>
      <input type="checkbox" id={modalKey} className="modal-toggle" />
      <label
        htmlFor={modalKey}
        className="modal cursor-pointer modal-bottom sm:modal-middle"
      >
        <label className="modal-box relative" htmlFor="">
          {children}
        </label>
      </label>
    </>
  );
};

export default Modal;

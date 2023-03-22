import classNames from 'classnames';
import { useGateways, useTableAddAction } from '../hooks';
import { Gateway } from '../types';
import GatewayListItem from './GatewayListItem';

const GatewayList = () => {
  const { gateways, loading, error } = useGateways();
  const {
    removeAddAction,
    selectedItem,
    addAction,
    toggleEditClick,
    addButtonState,
  } = useTableAddAction({
    buttonCancelText: 'Cancel',
    buttonAddText: 'Add Gateway',
  });

  return (
    <div className="overflow-x-auto flex flex-col items-center px-4 py-4 border-t border-base-300">
      <h1 className="text-xl text-base-100 mb-3 font-semibold">
        List of Gateways
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Name</th>
            <th>IP Address</th>
            <th>Peripherals</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td>Something happened...</td>
            </tr>
          ) : !gateways ? (
            <tr>
              <td>No gateways yet...</td>
            </tr>
          ) : (
            gateways?.map((gateway, key) => (
              <GatewayListItem
                removeAddAction={removeAddAction}
                key={key}
                gateway={gateway}
                selectedGateway={selectedItem as Gateway | null}
                addAction={addAction}
                toggleEditClick={toggleEditClick}
              />
            ))
          )}
          <tr className={classNames({ hidden: !addButtonState.enabled })}>
            <td>Serial</td>
            <td>Name</td>
            <td>IP</td>
            <td></td>
            <td>
              <button className="btn mt-1 min-h-[2rem] h-[2rem]">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className="btn mt-1 min-h-[2rem] h-[2rem]"
        onClick={addButtonState.action}
      >
        {addButtonState.buttonText}
      </button>
    </div>
  );
};

export default GatewayList;

import { useEffect, useState } from 'react';
import { Gateway, PeripheralDevice } from '../types';

export const useGateways = () => {
  const [gateways, setGateways] = useState<Gateway[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchGateways();
  }, []);

  const fetchGateways = () => {
    setLoading(true);
    fetch('/gateways', {
      headers: { Accept: 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        setGateways(data);
      })
      .then(() => setLoading(false))
      .catch(error => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };

  const createGateway = ({ gateway }: { gateway: Gateway }) => {
    setLoading(true);
    fetch('/gateways/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gateway),
    })
      .then(res => {
        if (res.ok) {
          fetchGateways();
        }
      })
      .then(() => setLoading(false))
      .catch(error => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };

  const deleteGateway = (id: string) => {
    setLoading(true);
    fetch(`/gateway/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          fetchGateways();
        }
      })
      .then(() => setLoading(false))
      .catch(error => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };

  const editGateway = ({
    serialNumber,
    gateway,
  }: {
    serialNumber: string;
    gateway: Partial<Gateway>;
  }) => {
    setLoading(true);
    fetch(`/gateway/${serialNumber}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gateway),
    })
      .then(res => {
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        fetchGateways();
      })
      .then(() => setLoading(false))
      .catch(error => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };

  return {
    gateways,
    loading,
    error,
    createGateway,
    deleteGateway,
    editGateway,
  };
};

interface ITableAddActionProps {
  buttonCancelText: string;
  buttonAddText: string;
}

export const useTableAddAction = ({
  buttonCancelText,
  buttonAddText,
}: ITableAddActionProps) => {
  const [selectedItem, setSelectedItem] = useState<
    Gateway | PeripheralDevice | null
  >(null);
  const [addAction, setAddAction] = useState<boolean>(false);

  const [removeAddAction, setRemoveAddAction] = useState<boolean>(false);

  const handleAddToggle = () => {
    if (!addButtonState.enabled) {
      setAddAction(true);
      return setAddButtonState({
        buttonText: buttonCancelText,
        enabled: true,
        action: () => {
          setAddAction(false);
          setAddButtonState({
            buttonText: buttonAddText,
            enabled: false,
            action: handleAddToggle,
          });
        },
      });
    }
    return setAddButtonState({
      buttonText: buttonAddText,
      enabled: false,
      action: () => {},
    });
  };

  const [addButtonState, setAddButtonState] = useState({
    buttonText: buttonAddText,
    enabled: false,
    action: handleAddToggle,
  });

  const toggleEditClick = (item: Gateway | PeripheralDevice) => {
    if (selectedItem !== item) {
      setRemoveAddAction(true);
      setAddButtonState({
        buttonText: buttonCancelText,
        enabled: false,
        action: () => {
          setRemoveAddAction(false);
          setAddButtonState({
            buttonText: buttonAddText,
            enabled: false,
            action: handleAddToggle,
          });
          setSelectedItem(null);
        },
      });
      return setSelectedItem(item);
    }
    setAddButtonState({
      buttonText: buttonAddText,
      enabled: false,
      action: handleAddToggle,
    });
    return setSelectedItem(null);
  };

  return {
    removeAddAction,
    selectedItem,
    addAction,
    toggleEditClick,
    addButtonState,
  };
};

export const useTableItemAddAction = (
  removeAddAction: boolean,
  toggleEditClick: (item: Gateway | PeripheralDevice) => void,
) => {
  const [editButtonToggle, setEditButtonToggle] = useState(false);

  useEffect(() => {
    if (!removeAddAction) setEditButtonToggle(false);
  }, [removeAddAction]);

  const handleEditToggle = (
    item: Gateway | PeripheralDevice,
    value: boolean,
  ) => {
    setEditButtonToggle(value);
    return toggleEditClick(item);
  };

  return { editButtonToggle, handleEditToggle };
};

import { useEffect, useState } from 'react';
import { Gateway } from '../types';

export const useGateways = () => {
  const [gateways, setGateways] = useState<Gateway[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch('/gateways', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        setGateways(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }, []);

  return { gateways, loading, error };
};

export const useTableActions = () => {
  const [selectedGateway, setSelectedGateway] = useState<Gateway | null>(null);
  const [addAction, setAddAction] = useState<boolean>(false);

  const [removeAddAction, setRemoveAddAction] = useState<boolean>(false);

  const handleAddToggle = () => {
    if (!addButtonState.enabled) {
      setAddAction(true);
      return setAddButtonState({
        buttonText: 'Cancel',
        enabled: true,
        action: () => {
          setAddAction(false);
          setAddButtonState({
            buttonText: 'Add Gateway',
            enabled: false,
            action: handleAddToggle,
          });
        },
      });
    }
    return setAddButtonState({
      buttonText: 'Add Gateway',
      enabled: false,
      action: () => {},
    });
  };

  const [addButtonState, setAddButtonState] = useState({
    buttonText: 'Add Gateway',
    enabled: false,
    action: handleAddToggle,
  });

  const toggleEditClick = (gateway: Gateway) => {
    if (selectedGateway !== gateway) {
      setRemoveAddAction(true);
      setAddButtonState({
        buttonText: 'Cancel',
        enabled: false,
        action: () => {
          setRemoveAddAction(false);
          setAddButtonState({
            buttonText: 'Add Gateway',
            enabled: false,
            action: handleAddToggle,
          });
          setSelectedGateway(null);
        },
      });
      return setSelectedGateway(gateway);
    }
    setAddButtonState({
      buttonText: 'Add Gateway',
      enabled: false,
      action: handleAddToggle,
    });
    return setSelectedGateway(null);
  };

  const [editButtonToggle, setEditButtonToggle] = useState(removeAddAction);

  useEffect(() => {
    if (!removeAddAction) setEditButtonToggle(false);
  }, [removeAddAction]);

  const handleEditToggle = (gateway: Gateway) => {
    if (editButtonToggle) {
      setEditButtonToggle(!editButtonToggle);
      return toggleEditClick(gateway);
    }
    setEditButtonToggle(!editButtonToggle);
    return toggleEditClick(gateway);
  };

  return {
    removeAddAction,
    selectedGateway,
    addAction,
    toggleEditClick,
    addButtonState,
    handleEditToggle,
    editButtonToggle,
  };
};

export const useTableItemActions = (
  removeAddAction: boolean,
  toggleEditClick: (gateway: Gateway) => void,
) => {
  const [editButtonToggle, setEditButtonToggle] = useState(removeAddAction);

  useEffect(() => {
    if (!removeAddAction) setEditButtonToggle(false);
  }, [removeAddAction]);

  const handleEditToggle = (gateway: Gateway) => {
    if (editButtonToggle) {
      setEditButtonToggle(!editButtonToggle);
      return toggleEditClick(gateway);
    }
    setEditButtonToggle(!editButtonToggle);
    return toggleEditClick(gateway);
  };

  return { editButtonToggle, handleEditToggle };
};

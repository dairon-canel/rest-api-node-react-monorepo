import { useEffect, useState } from 'react';
import { Gateway, PeripheralDevice } from '../types';

export const useGateways = () => {
  const [gateways, setGateways] = useState<Gateway[]>();
  const [loadingFetching, setLoadingFetching] = useState<boolean>(true);
  const [loadingCreation, setLoadingCreation] = useState<boolean>(false);
  const [errorFetching, setErrorFetching] = useState<boolean>(false);
  const [errorCreation, setErrorCreation] = useState<boolean>(false);

  useEffect(() => {
    fetchGateways();
  }, []);

  const fetchGateways = () =>
    fetch('/gateways', {
      headers: { Accept: 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        setGateways(data);
      })
      .then(() => setLoadingFetching(false))
      .catch(error => {
        console.log(error);
        setErrorFetching(true);
        setLoadingFetching(false);
      });

  const createGateway = ({ gateway }: { gateway: Gateway }) => {
    setLoadingCreation(true);
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
      .then(() => setLoadingCreation(false))
      .catch(error => {
        console.log(error);
        setErrorCreation(true);
        setLoadingCreation(false);
      });
  };

  const deleteGateway = (id: string) => {
    setLoadingCreation(true);
    fetch(`/gateway/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          fetchGateways();
        }
      })
      .then(() => setLoadingCreation(false))
      .catch(error => {
        console.log(error);
        setErrorCreation(true);
        setLoadingCreation(false);
      });
  };

  const editGateway = (id: string) => {
    setLoadingCreation(true);
    fetch(`/gateway/delete/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          fetchGateways();
        }
      })
      .then(() => setLoadingCreation(false))
      .catch(error => {
        console.log(error);
        setErrorCreation(true);
        setLoadingCreation(false);
      });
  };

  return {
    gateways,
    loadingFetching,
    errorFetching,
    loadingCreation,
    errorCreation,
    createGateway,
    deleteGateway,
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
  const [editButtonToggle, setEditButtonToggle] = useState(removeAddAction);

  useEffect(() => {
    if (!removeAddAction) setEditButtonToggle(false);
  }, [removeAddAction]);

  const handleEditToggle = (item: Gateway | PeripheralDevice) => {
    if (editButtonToggle) {
      setEditButtonToggle(!editButtonToggle);
      return toggleEditClick(item);
    }
    setEditButtonToggle(!editButtonToggle);
    return toggleEditClick(item);
  };

  return { editButtonToggle, handleEditToggle };
};

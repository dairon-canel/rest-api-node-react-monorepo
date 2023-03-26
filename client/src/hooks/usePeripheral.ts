import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createPeripheralService,
  getPeripheralsByGatewayService,
} from '../services';
import { PeripheralDevice } from '../types';

export const usePeripheral = ({ serialNumber }: { serialNumber: string }) => {
  const [error, setError] = useState<string>();

  const {
    data: peripherals,
    refetch,
    isRefetching,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getGatewayList', serialNumber],
    queryFn: () => getPeripheralsByGatewayService(serialNumber),
  });

  const { mutate: createPeripheral } = useMutation({
    mutationFn: ({
      serialNumber,
      peripheral,
    }: {
      serialNumber: string;
      peripheral: { status: string; vendor: string };
    }) => {
      return createPeripheralService({ serialNumber, peripheral });
    },
    onSuccess: () => refetch(),
    onError: (error: any) => setError(error.message),
  });

  /* const createPeripheral = ({
    serialNumber,
    peripheral,
  }: {
    serialNumber: string;
    peripheral: PeripheralDevice;
  }) => {
    setLoading(true);
    fetch(`/gateway/${serialNumber}/addPeripheral`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(peripheral),
    })
      .then(res => res.json())
      .then((data: Gateway) => {
        const newGateways = [...gateways, data];
        setGateways(newGateways);
        setCurrentGateway(data);
      })
      .then(() => refresh())
      .then(() => setLoading(false))
      .catch(error => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };

  const deletePeripheral = ({
    serialNumber,
    uid,
  }: {
    serialNumber: string;
    uid: number;
  }) => {
    setLoading(true);
    fetch(`/gateway/${serialNumber}/deletePeripheral/${uid}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then((data: Gateway) => {
        const newGateways = [...gateways, data];
        setGateways(newGateways);
        setCurrentGateway(data);
      })
      .then(() => refresh())
      .then(() => setLoading(false))
      .catch(error => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };

  const editPeripheral = ({
    serialNumber,
    uid,
    peripheral,
  }: {
    serialNumber: string;
    uid: number;
    peripheral: Partial<PeripheralDevice>;
  }) => {
    setLoading(true);
    fetch(`/gateway/${serialNumber}/editPeripheral/${uid}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(peripheral),
    })
      .then(res => res.json())
      .then((data: Gateway) => {
        const newGateways = [...gateways, data];
        setGateways(newGateways);
        setCurrentGateway(data);
      })
      .then(() => refresh())
      .then(() => setLoading(false))
      .catch(error => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }; */

  return {
    peripherals,
    isLoading,
    isError,
    error,
    isRefetching,
    createPeripheral,
  };
};

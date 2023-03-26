import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  createGatewayService,
  deleteGatewaysService,
  editGatewaysService,
  getGatewaysService,
} from '../services';
import { Gateway } from '../types';

export const useGateway = () => {
  const [error, setError] = useState<string>();

  const {
    data: gateways,
    refetch,
    isRefetching,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getGatewayList'],
    queryFn: getGatewaysService,
  });

  const { mutate: createGateway } = useMutation({
    mutationFn: (gateway: { name: string; ipv4Address: string }) => {
      return createGatewayService(gateway);
    },
    onSuccess: () => refetch(),
    onError: (error: any) => setError(error.message),
  });

  const { mutate: editGateway } = useMutation({
    mutationFn: ({
      serialNumber,
      gateway,
    }: {
      serialNumber: string;
      gateway: Partial<Gateway>;
    }) => {
      return editGatewaysService({
        serialNumber,
        gateway,
      });
    },
    onSuccess: () => refetch(),
    onError: (error: any) => setError(error.message),
  });

  const { mutate: deleteGateway } = useMutation({
    mutationFn: (serialNumber: string) => {
      return deleteGatewaysService(serialNumber);
    },
    onSuccess: () => refetch(),
    onError: (error: any) => setError(error.message),
  });

  return {
    gateways,
    isRefetching,
    isLoading,
    isError,
    error,
    createGateway,
    editGateway,
    deleteGateway,
  };
};

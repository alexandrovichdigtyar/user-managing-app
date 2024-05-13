import { loadingAtom } from '@/state/store';
import { CreatingUser, UserData } from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAtom } from 'jotai';
import { Flip, toast } from 'react-toastify';

export const apiURL = `https://${process.env.API_TOKEN}.mockapi.io/usersList`;

const RETRY_COUNT = 2;

export const useUsers = (initialData: UserData[]) => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get(apiURL);
      return data;
    },
    initialData,
    retry: RETRY_COUNT,
  });
}

export const useUser = (userId?: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data } = await axios.get(`${apiURL}/${userId}`);
      return data;
    },
    retry: RETRY_COUNT,
    enabled: !!userId
  });
}

export const useAddUser = () => {
  const queryClient = useQueryClient();

  const [_, setIsLoading] = useAtom(loadingAtom);

  return useMutation({
    mutationFn: async (newUser: CreatingUser) => {
      setIsLoading(true);

      const { data } = await axios.post(apiURL, newUser);

      setIsLoading(false);

      return data;
    },
    onSuccess: (user: UserData) => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      });
      toast.success(`User ${user.userName} has been successfully added`,
        { containerId: "toast-message", transition: Flip, position: "bottom-center" });
    },
    onError: () => {
      toast.success(`User has not been successfully added`,
        { containerId: "toast-message", transition: Flip, position: "bottom-center", type: "error" });
    },
  });
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const [_, setIsLoading] = useAtom(loadingAtom);

  return useMutation({
    mutationFn: async ({ userId, updatedUser }: { userId: string, updatedUser: UserData }) => {
      setIsLoading(true);

      const { data } = await axios.put(`${apiURL}/${userId}`, updatedUser);

      setIsLoading(false);

      return data;
    },
    onSuccess: (user: UserData) => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      });
      toast.success(`User ${user.userName} has been successfully updated`,
        { containerId: "toast-message", transition: Flip, position: "bottom-center" });
    },
    onError: () => {
      toast.success(`User has not been successfully updated`,
        { containerId: "toast-message", transition: Flip, position: "bottom-center", type: "error" });
    }
  });
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const [_, setIsLoading] = useAtom(loadingAtom);

  return useMutation({
    mutationFn: async (userId: string) => {
      setIsLoading(true);

      const { data } = await axios.delete(`${apiURL}/${userId}`);

      setIsLoading(false);

      return data;
    },
    onSuccess: (user: UserData) => {
      queryClient.invalidateQueries({
        queryKey: ['users']
      });
      toast.success(`User ${user.userName} has been successfully deleted`,
        { containerId: "toast-message", transition: Flip, position: "bottom-center" });
    },
    onError: () => {
      toast.success(`User has not been successfully deleted`,
        { containerId: "toast-message", transition: Flip, position: "bottom-center", type: "error" });
    }
  });
}
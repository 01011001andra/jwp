import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface BodyType {
  id: string;
  username: string;
  email: string;
}

const createData = async (body: BodyType) => {
  const response = await axios.put(`/api/v1/auth/identifier`, body);
  return response.data;
};

export const useUpdateIdentifier = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body: BodyType) => {
      return createData(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  return mutation;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface BodyType {
  username: string;
  password: string;
}

const createData = async (body: BodyType) => {
  const response = await axios.post(`/api/v1/auth`, body);
  return response.data;
};

export const useLogin = () => {
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

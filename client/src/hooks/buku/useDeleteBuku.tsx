import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface BodyType {
  id: string;
}

const createData = async (body: BodyType) => {
  const response = await axios.delete(`/api/v1/buku?id=${body.id}`);
  return response.data;
};

export const useDeleteBuku = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body: BodyType) => {
      return createData(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buku"] });
    },
  });

  return mutation;
};

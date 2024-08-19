import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface BodyType {
  id: string;
  nama: string;
  kategori: string;
  deskripsi: string;
}

const createData = async (body: BodyType) => {
  const response = await axios.put(`/api/v1/buku?id=${body.id}`, body);
  return response.data;
};

export const useUpdateBuku = () => {
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

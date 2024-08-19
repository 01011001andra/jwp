import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface BodyType {
  nama: string;
  kategori: string;
  deskripsi: string;
}

const createData = async (body: BodyType) => {
  const response = await axios.post(`/api/v1/buku`, body);
  return response.data;
};

export const usePostBuku = () => {
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

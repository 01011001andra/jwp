import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface BodyType {
  username: string;
  email: string;
  nama_buku: string;
  kategori_buku: string;
  deskripsi_buku: string;
  status: "pending";
}

const createData = async (body: BodyType) => {
  const response = await axios.post(`/api/v1/peminjam`, body);
  return response.data;
};

export const usePostPinjam = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body: BodyType) => {
      return createData(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pinjam"] });
    },
  });

  return mutation;
};

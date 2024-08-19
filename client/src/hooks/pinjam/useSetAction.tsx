import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface BodyType {
  id: string;
  status: "approved" | "rejected" | "returned";
  pesan?: string;
}

const createData = async (body: BodyType) => {
  console.log(body);
  const response = await axios.patch(`/api/v1/peminjam?id=${body.id}`, {
    pesan: body.pesan,
    status: body.status,
  });
  return response.data;
};

export const useSetAction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body: BodyType) => {
      return createData(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pinjam"] });
      queryClient.invalidateQueries({ queryKey: ["peminjam"] });
    },
  });

  return mutation;
};

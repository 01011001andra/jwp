"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface BodyType {
  limit: number;
  page: number;
  search: string;
  username: string;
  status: string;
}

const getData = async (body: BodyType) => {
  const response = await axios.get(
    `/api/v1/peminjam/user?username=${body.username}&status=${body.status}&page=${body.page}&limit=${body.limit}&search=${body.search}`
  );
  return response.data;
};

const useGetPinjam = (body: BodyType) => {
  const query = useQuery({
    queryFn: async () => {
      return getData(body);
    },
    queryKey: ["pinjam", body],
  });

  return query;
};

export default useGetPinjam;

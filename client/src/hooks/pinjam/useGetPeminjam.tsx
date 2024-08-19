"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface BodyType {
  limit: number;
  page: number;
  search: string;
}

const getData = async (body: BodyType) => {
  const response = await axios.get(
    `/api/v1/peminjam?page=${body.page}&limit=${body.limit}&search=${body.search}`
  );
  return response.data;
};

const useGetPeminjam = (body: BodyType) => {
  const query = useQuery({
    queryFn: async () => {
      return getData(body);
    },
    queryKey: ["peminjam", body],
  });

  return query;
};

export default useGetPeminjam;

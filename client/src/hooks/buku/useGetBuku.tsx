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
    `/api/v1/buku?page=${body.page}&limit=${body.limit}&search=${body.search}`
  );
  return response.data;
};

const useGetBuku = (body: BodyType) => {
  const query = useQuery({
    queryFn: async () => {
      return getData(body);
    },
    queryKey: ["buku", body],
  });

  return query;
};

export default useGetBuku;

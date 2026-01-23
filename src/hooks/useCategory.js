import { useQuery } from "@tanstack/react-query";
import { getCategoryAPI } from "../services/api/category";

export const useCategory = (userId) => {
  return useQuery({
    queryKey: ["category", userId],
    queryFn: getCategoryAPI,
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};

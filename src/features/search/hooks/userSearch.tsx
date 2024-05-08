import { API } from "@/Utils/api";
import { useQuery } from "@tanstack/react-query";
const jwtToken = localStorage.getItem("jwtToken");

const fetchUser = async (name: string) => {
  const response = await API.get(`finduserbyname/${name}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  return response.data;
};

export const useSearch = (name: string) => {
  return useQuery({
    queryKey: ["todos-key"],
    queryFn: () => fetchUser(name),
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });
};

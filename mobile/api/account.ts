import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import store from "@/store";
import { SERVER_IP } from "@/constants/server_ip";

export interface Account {
  compte_principale: number;
  compte_epargne: number;
}

// Soldes principal + épargne, partagés entre l'accueil et l'onglet épargne
export const useAccount = () => {
  const token = store((state) => state.token);
  return useQuery<Account>({
    queryKey: ["account_blockchain"],
    queryFn: () =>
      axios
        .get(`http://${SERVER_IP}:8000/blockchain/compte_utilisateur`, {
          headers: { Authorization: `bearer ${token}` },
        })
        .then((res) => res.data),
  });
};

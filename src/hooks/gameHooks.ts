import { useSearchParams } from "react-router-dom";

export const useCountWord = () => {
  const [params] = useSearchParams();
  return Number(params.get("count")) || 10;
};
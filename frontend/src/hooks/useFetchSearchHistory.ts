import { useState, useEffect } from "react";
import axios from "axios";
import { SearchHistoryItem } from "@/entities/searchHistory";
import { useAuth } from "@/features/auth";

interface useFetchSearchHistoryProps {
  onSuccess?: (data: SearchHistoryItem[]) => void;
  onError?: (error: any) => void;
}

const useFetchSearchHistory = ({
  onSuccess,
  onError,
}: useFetchSearchHistoryProps = {}) => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { token, isLoggedIn, refreshToken } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      if (isLoggedIn && token) {
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/history`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setHistory(response.data);
          if (onSuccess) onSuccess(response.data);
        } catch (error: any) {
          if (error.response && error.response.status === 401) {
            await refreshToken();
            fetchHistory();
            return;
          }
          console.error("Error during fetching history", error);
          if (onError) onError(error);
        } finally {
          setLoading(false);
        }
      } else {
        setHistory([]);
        if (onSuccess) onSuccess([]);
      }
    };

    fetchHistory();
  }, [token, isLoggedIn, refreshToken, onSuccess, onError]);

  return { history, loading };
};

export default useFetchSearchHistory;

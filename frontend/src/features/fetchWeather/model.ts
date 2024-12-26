import axios from "axios";
import { withAuthRetry } from "@/utils/withAuthRetry";

export const fetchWeatherForecast = async (
  city: string,
  token: string | null,
  refreshToken: () => Promise<void>
) => {
  const makeRequest = withAuthRetry(axios.get, refreshToken);
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/forecast?city=${city}`;

  return await makeRequest(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

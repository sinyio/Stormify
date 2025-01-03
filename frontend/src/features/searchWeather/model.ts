import { withAuthRetry } from "@/shared/utils/withAuthRetry";
import axios from "axios";

export const searchWeather = async (
  city: string,
  token: string | null,
  refreshToken: () => Promise<void>
) => {
  const makeRequest = withAuthRetry(axios.get, refreshToken);

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/weather?city=${city}`;

  return await makeRequest(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



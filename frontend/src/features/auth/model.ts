import axios from "axios";
import { AuthResponse } from "@/entities/user";

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`,
      {
        username,
        email,
        password,
      }
    );
    console.log("register response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const loginUser = async (
  identifier: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
      {
        identifier,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

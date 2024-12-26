import { FC, FormEvent, useState } from "react";
import { loginUser, registerUser } from "../../model";
import { useAuth } from "@/features/auth";
import { AuthFormProps } from "./types";
import { useRouter } from "next/navigation";

export const AuthForm: FC<AuthFormProps> = ({ isRegistering }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      let authData;
      if (isRegistering) {
        authData = await registerUser(username, email, password);
      } else {
        authData = await loginUser(identifier, password);
      }
      login(authData);
      router.push("/");
    } catch (error) {
      console.error("Error during auth:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {isRegistering && (
        <>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="border rounded px-2 py-1 mr-2"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="border rounded px-2 py-1 mr-2"
          />
        </>
      )}
      {!isRegistering && (
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Enter username/email"
          className="border rounded px-2 py-1 mr-2"
        />
      )}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        className="border rounded px-2 py-1 mr-2"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
      >
        {isRegistering ? "Register" : "Login"}
      </button>
    </form>
  );
};

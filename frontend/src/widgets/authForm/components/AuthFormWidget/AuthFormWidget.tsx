import { AuthForm } from "@/features/auth";
import { FC, useState } from "react";

export const AuthFormWidget: FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">
        {isRegistering ? "Register" : "Login"}
      </h2>
      <AuthForm isRegistering={isRegistering} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        onClick={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering ? "Go to Login" : "Go to Registration"}
      </button>
    </div>
  );
};

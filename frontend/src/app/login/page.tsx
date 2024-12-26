"use client";
import { FC } from "react";
import { AuthFormWidget } from "@/widgets/authForm";
import { useAuth } from "@/features/auth";
import { useRouter } from "next/navigation";

const LoginPage: FC = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  if (isLoggedIn) {
    router.push("/");
    return null;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <AuthFormWidget />
    </div>
  );
};
export default LoginPage;

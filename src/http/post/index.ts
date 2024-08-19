import { LoginBody, RegisterBody, VerifyOtpBody } from "@/types";
import { HttpError, postRequest } from "@/utils";

export async function registerHandler(registerContext: RegisterBody) {
  // return postRequest("/auth/register", { ...registerContext }, false);
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerContext),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    const error: HttpError = new Error(errorData.message);
    error.info = errorData;
    error.code = response.status;
    throw error;
  }

  return await response.json();
}

export async function verifyOtpHandler(verifyOtpContext: VerifyOtpBody) {
  return postRequest("/auth/verify-otp", verifyOtpContext);
}

export async function resentOtpHandler(verifyOtpContext: VerifyOtpBody) {
  return postRequest("/auth/resend-otp", verifyOtpContext);
}

export async function loginHandler(loginContext: LoginBody) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginContext),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: HttpError = new Error(errorData.message);
    error.info = errorData;
    error.code = response.status;
    throw error;
  }

  return await response.json();
}

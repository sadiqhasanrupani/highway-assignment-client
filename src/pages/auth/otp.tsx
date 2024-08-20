import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { MutationKey, useMutation } from "@tanstack/react-query";

import { resendOtpHandler, verifyOtpHandler } from "@/http/post";
import { useEffect } from "react";
import Spinner from "@/components/loaders/spinner";
import { HttpError } from "@/utils";
import { setAuthToken } from "@/utils/auth";

import VerifyOtpSvg from "@/components/svg/verify-otp";
import { Card } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { VerifyOtpBody } from "@/types";

type InitialValues = {
  otpCode: string;
};

export default function Otp() {
  const navigate = useNavigate();

  const {
    isPending: verifyOtpIsPending,
    isError: verifyOtpIsError,
    error: verifyOtpError,
    mutate: verifyOtpMutate,
  } = useMutation<any, HttpError, VerifyOtpBody>({
    mutationKey: ["verify-otp"] as MutationKey,
    mutationFn: verifyOtpHandler,
    onSuccess: (data) => {
      toast.success(data.message as string);
      setAuthToken(data.token as string);
      navigate("/");
    },
  });

  const {
    isPending: resendOtpIsPending,
    isError: resendOtpIsError,
    error: resendOtpError,
    mutate: resendOtpMutate,
  } = useMutation<any, HttpError, any>({
    mutationKey: ["resend-otp"] as MutationKey,
    mutationFn: resendOtpHandler,
    onSuccess: (data) => {
      toast.success(data.message as string);
      setAuthToken(data.token as string);
    },
  });

  const schema = yup.object().shape({
    otpCode: yup
      .string()
      .required("Otp code is required field")
      .min(6, "OTP much be equal to 6 characters")
      .max(6),
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      otpCode: "",
    },
    validationSchema: schema,
    onSubmit(values) {
      verifyOtpMutate({
        otpCode: values.otpCode,
      });
    },
  });

  useEffect(() => {
    if (verifyOtpIsError) {
      toast.error(verifyOtpError.message || "Something went wrong.");

      if (verifyOtpError.code === 422) {
        for (const error of verifyOtpError.info.errorStack) {
          formik.setFieldError(error.path, error.msg);
        }
      }
    }

    // eslint-disable-next-line
  }, [verifyOtpIsError, verifyOtpError]);

  useEffect(() => {
    if (resendOtpIsError) {
      toast.error(resendOtpError.message || "Something went wrong.");

      if (resendOtpError.code === 422) {
        for (const error of resendOtpError.info.errorStack) {
          formik.setFieldError(error.path, error.msg);
        }
      }
    }

    // eslint-disable-next-line
  }, [resendOtpIsError, resendOtpError]);

  return (
    <main className="font-poppins w-full" style={{ fontFamily: "Poppins" }}>
      {" "}
      <div className="flex min-h-full flex-1 h-screen">
        <div className="relative hidden w-0 flex-1 lg:flex lg:justify-center lg:items-center">
          <VerifyOtpSvg className="w-full h-[80%]" />
        </div>
        <div className="flex md:mx-auto flex-1 flex-col justify-center items-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <Card className="shadow-none md:shadow-xl p-[2.93rem] lg:border lg:border-[#E5E3E8]">
            <div className="w-full max-w-sm lg:w-96">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h2 className="font-bold leading-9 tracking-tight text-gray-900">
                  <span className="text-danger">Almost there!</span>{" "}
                  <span className="text-primary">
                    {"Just enter the code that we sent to your email address"}
                  </span>
                </h2>
              </div>

              <div className="mt-10 w-full">
                <div>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col"
                  >
                    <div className="w-[100%] flex flex-col gap-4">
                      <InputOTP
                        onChange={(newValue) => {
                          formik.setFieldValue("otpCode", newValue);
                        }}
                        onBlur={() => {
                          formik.setFieldTouched("otpCode", true);
                        }}
                        maxLength={6}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      {formik.errors.otpCode && formik.touched.otpCode && (
                        <Label className="text-red-500">
                          {formik.errors.otpCode}
                        </Label>
                      )}
                    </div>

                    <div className="flex justify-end items-end">
                      <Button
                        type="button"
                        variant={"link"}
                        className="p-0 text-xs flex items-center gap-1"
                        onClick={() => resendOtpMutate("something")}
                      >
                        <p>Resend OTP</p>{" "}
                        <span>
                          {resendOtpIsPending && <Spinner className="w-4" />}
                        </span>
                      </Button>
                    </div>

                    <div>
                      <Button
                        disabled={
                          !formik.isValid || verifyOtpIsPending || !formik.dirty
                        }
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <div className="flex gap-2 items-center">
                          <p>Verify</p>{" "}
                          <span>{verifyOtpIsPending && <Spinner />}</span>
                        </div>
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

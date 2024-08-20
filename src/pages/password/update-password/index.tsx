import * as Yup from "yup";

import PasswordInput from "@/components/input/password-input";
import Spinner from "@/components/loaders/spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { updatePasswordHandler } from "@/http/patch";
import { UpdatePassBody } from "@/types";
import { HttpError } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { removeAuthToken } from "@/utils/auth";
import { TextEffect } from "@/core/text-effect";

export default function UpdatePassword() {
  const navigate = useNavigate();

  type InitialValue = {
    currentPassword: string;
    updatedPassword: string;
    confirmPassword: string;
  };

  const {
    isPending: updatePassIsPending,
    isError: updatePassIsError,
    error: updatePassError,
    mutate: updatePassMutate,
    reset: updatePassReset,
  } = useMutation<any, HttpError, UpdatePassBody>({
    mutationKey: ["update-pass-mutation"],
    mutationFn: updatePasswordHandler,
    onSuccess: (data) => {
      toast.success(data.message);
      removeAuthToken();
      navigate("/login");
    },
  });

  React.useEffect(() => {
    if (updatePassIsError) {
      toast.error(updatePassError.message || "Something went wrong.");

      if (updatePassError.code === 422) {
        for (const error of updatePassError.info.errorStack) {
          formik.setFieldError(error.path, error.msg);
        }
      }
      updatePassReset();
    }

    // eslint-disable-next-line
  }, [updatePassIsError, updatePassError]);

  const updatePassSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(5, "Password should be at least 5 characters long")
      .required("Current Password is required"),
    updatedPassword: Yup.string()
      .min(5, "Password should be at least 5 characters long")
      .notOneOf(
        [Yup.ref("currentPassword")],
        "New password must be different from the Current password",
      )
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .min(5, "Password should be at least 5 characters long")
      .oneOf([Yup.ref("updatedPassword")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik<InitialValue>({
    initialValues: {
      confirmPassword: "",
      currentPassword: "",
      updatedPassword: "",
    },
    validationSchema: updatePassSchema,
    onSubmit(values) {
      console.log(values);

      updatePassMutate({
        currentPassword: values.currentPassword,
        updatedPassword: values.updatedPassword,
      });
    },
  });

  return (
    <section className="container mx-auto">
      {" "}
      <div className="space-y-10 divide-y divide-gray-900/10">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-1">
            <div className="px-4 sm:px-0">
              <TextEffect
                as="p"
                per="char"
                preset="blur"
                className="md:text-xl font-semibold leading-7 text-gray-900"
              >
                Update Password
              </TextEffect>
              <TextEffect
                as="p"
                per="word"
                preset="blur"
                className="md:text-lg mt-1 text-sm leading-6 text-gray-600"
              >
                To ensure the safety of your personal information, it's
                important to keep your password up-to-date. Follow the steps
                below to create a new, strong password and maintain the security
                of your account.
              </TextEffect>
            </div>

            <Card className="bg-white sm:rounded-xl md:col-span-2 shadow-xl border border-gray-200">
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-7xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <div className="mt-2">
                      <PasswordInput
                        errorMessage={formik.errors.currentPassword}
                        isError={
                          formik.errors.currentPassword &&
                          formik.touched.currentPassword
                            ? true
                            : false
                        }
                        id="currentPassword"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.currentPassword}
                        placeholder="Enter your current password"
                        formik={formik}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <div className="mt-2">
                      <PasswordInput
                        errorMessage={formik.errors.updatedPassword}
                        isError={
                          formik.errors.updatedPassword &&
                          formik.touched.updatedPassword
                            ? true
                            : false
                        }
                        id="updatedPassword"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.updatedPassword}
                        placeholder="Set new password"
                        formik={formik}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <div className="mt-2">
                      <PasswordInput
                        errorMessage={formik.errors.confirmPassword}
                        isError={
                          formik.errors.confirmPassword &&
                          formik.touched.confirmPassword
                            ? true
                            : false
                        }
                        id="confirmPassword"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        placeholder="Rewrite new password"
                        formik={formik}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-x-4 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <Button
                  onClick={() => navigate(-1)}
                  type="button"
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!formik.isValid || !formik.dirty}
                  type="submit"
                  className="flex gap-2 items-center"
                >
                  {updatePassIsPending ? <Spinner /> : ""}
                  <span>Reset</span>
                </Button>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
}

import React from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "sonner";
import { MutationKey, useMutation } from "@tanstack/react-query";

// image
import LoginSvg from "../../components/svg/login";

// component
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// types
import { loginHandler } from "@/http/post";
import { LoginBody } from "@/types";
import { Label } from "@/components/ui/label";
import { HttpError } from "@/utils";
import Spinner from "@/components/loaders/spinner";
import { setAuthToken } from "@/utils/auth";
import { Card } from "@/components/ui/card";
import PasswordInput from "@/components/input/password-input";
import { TextEffect } from "@/core/text-effect";

type InitialValues = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const {
    isPending: loginIsPending,
    isError: loginIsError,
    error: loginError,
    mutate: loginMutate,
  } = useMutation<any, HttpError, LoginBody>({
    mutationKey: ["register"] as MutationKey,
    mutationFn: loginHandler,
    onSuccess: (data) => {
      toast.success(data.message as string);
      setAuthToken(data.token as string);
      navigate("/");
    },
  });

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is a required field"),
    password: yup
      .string()
      .min(5)
      .required("Password should at-least 5 character or more than 5"),
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit(values) {
      loginMutate({
        email: values.email,
        password: values.password,
      });
    },
  });

  React.useEffect(() => {
    if (loginIsError) {
      toast.error(loginError.message || "Something went wrong.");

      if (loginError.code === 422) {
        for (const error of loginError.info.errorStack) {
          formik.setFieldError(error.path, error.msg);
        }
      }
    }

    // eslint-disable-next-line
  }, [loginIsError, loginError]);

  return (
    <main className="font-poppins">
      <div className="flex min-h-full flex-1 h-screen">
        <div className="relative hidden w-0 flex-1 lg:flex lg:justify-center lg:items-center">
          <LoginSvg className="w-full h-[80%]" />
        </div>
        <div className="flex md:mx-auto flex-1 flex-col justify-center items-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <Card className="shadow-none md:shadow-xl p-[2.93rem] lg:border lg:border-[#E5E3E8]">
            <div className="w-full max-w-sm lg:w-96">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h2 className="text-4xl text-primary font-extrabold leading-9 tracking-tight text-gray-900">
                  <TextEffect as="span" per="char" preset="blur">
                    Fill what we know
                  </TextEffect>{" "}
                  <TextEffect
                    as="span"
                    per="char"
                    preset="scale"
                    className="text-danger"
                  >
                    !
                  </TextEffect>
                </h2>
              </div>

              <div className="mt-10">
                <div>
                  <form onSubmit={formik.handleSubmit} className="space-y-5">
                    <div>
                      <div className="mt-2">
                        <Input
                          id="email"
                          name="email"
                          placeholder="Enter Email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          type="email"
                          autoComplete="off"
                          required
                        />
                        {formik.errors.email && formik.touched.email && (
                          <Label className="text-red-500">
                            {formik.errors.email}
                          </Label>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="mt-2">
                        <PasswordInput
                          id="password"
                          errorMessage={formik.errors.password}
                          isError={
                            formik.errors.password && formik.touched.password
                              ? true
                              : false
                          }
                          formik={formik}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          placeholder="Set Password"
                          value={formik.values.password}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <Button
                        disabled={
                          !formik.isValid || loginIsPending || !formik.dirty
                        }
                        type="submit"
                      >
                        <div className="flex gap-2 items-center text-base">
                          <p>Sign In</p>{" "}
                          <span>{loginIsPending && <Spinner />}</span>
                        </div>
                      </Button>
                      <Link to={"/register"}>
                        <Button
                          variant={"outline"}
                          type="button"
                          className="w-full"
                        >
                          <div className="flex gap-2 items-center text-base">
                            <p>Sign Up</p>{" "}
                          </div>
                        </Button>
                      </Link>
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

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ContactEnum, RegisterBody } from "@/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MutationKey, useMutation } from "@tanstack/react-query";

import { registerHandler } from "@/http/post";
import { useEffect } from "react";
import Spinner from "@/components/loaders/spinner";
import { HttpError } from "@/utils";
import { setAuthToken } from "@/utils/auth";

import RegisterSvg from "@/components/svg/register";
import { Card } from "@/components/ui/card";

type InitialValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmpassword: string;
  contactMode: ContactEnum;
};

export default function Register() {
  const navigate = useNavigate();

  const {
    isPending: registerIsPending,
    isError: registerIsError,
    error: registerError,
    mutate: registerMutate,
  } = useMutation<any, HttpError, RegisterBody>({
    mutationKey: ["register"] as MutationKey,
    mutationFn: registerHandler,
    onSuccess: (data) => {
      toast.success(data.message as string);
      setAuthToken(data.token as string);
      navigate("/");
    },
  });

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required("First Name is required field")
      .min(4, "First name much be atleast 4 characters"),
    lastName: yup
      .string()
      .required("Last Name is required field")
      .min(4, "Last name much be atleast 4 characters"),
    email: yup.string().email().required("email is a required field"),
    password: yup
      .string()
      .min(5, "Password much be atleast 5 characters")
      .required("Password should at-least 5 character or more than 5"),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password much match")
      .required("confirm password is a required field"),
    contactMode: yup
      .mixed<ContactEnum>()
      .oneOf(["email", "phone"] as const)
      .required("Contact mode is required"),
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmpassword: "",
      contactMode: "email",
    },
    validationSchema: schema,
    onSubmit(values) {
      registerMutate({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        contactMode: values.contactMode,
      });
    },
  });

  useEffect(() => {
    if (registerIsError) {
      toast.error(registerError.message || "Something went wrong.");

      if (registerError.code === 422) {
        for (const error of registerError.info.errorStack) {
          formik.setFieldError(error.path, error.msg);
        }
      }
    }

    // eslint-disable-next-line
  }, [registerIsError, registerError]);

  return (
    <main className="font-poppins" style={{ fontFamily: "Poppins" }}>
      {" "}
      <div className="flex min-h-full flex-1 h-screen">
        <div className="relative hidden w-0 flex-1 lg:flex lg:justify-center lg:items-center">
          <RegisterSvg className="w-full h-[80%]" />
        </div>
        <div className="flex md:mx-auto flex-1 flex-col justify-center items-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <Card className="shadow-none md:shadow-xl p-[2.93rem] lg:border lg:border-[#E5E3E8]">
            <div className="w-full max-w-sm lg:w-96">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h2 className="text-4xl text-primary font-bold leading-9 tracking-tight text-gray-900">
                  <span>Let us know</span>{" "}
                  <span className="text-danger">!</span>
                </h2>
                <Link to={"/login"}>
                  <Button
                    variant={"link"}
                    className="text-xl text-gray-500 flex p-0 decoration-double"
                  >
                    <span className="text-primary underline">Sign</span>
                    <span className="text-danger underline">In</span>
                  </Button>
                </Link>
              </div>

              <div className="mt-10">
                <div>
                  <form onSubmit={formik.handleSubmit} className="space-y-5">
                    <div>
                      <div className="mt-2">
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="First Name"
                          autoComplete="off"
                          value={formik.values.firstName}
                          required
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.firstName &&
                          formik.touched.firstName && (
                            <Label className="text-red-500">
                              {formik.errors.firstName}
                            </Label>
                          )}
                      </div>
                    </div>

                    <div>
                      <div className="mt-2">
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Last Name"
                          autoComplete="off"
                          value={formik.values.lastName}
                          required
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.lastName && formik.touched.lastName && (
                          <Label className="text-red-500">
                            {formik.errors.lastName}
                          </Label>
                        )}
                      </div>
                    </div>

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
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Set Password"
                          value={formik.values.password}
                          autoComplete="off"
                          required
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password && (
                          <Label className="text-red-500">
                            {formik.errors.password}
                          </Label>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="mt-2">
                        <Input
                          id="confirmpassword"
                          name="confirmpassword"
                          placeholder="Retype Password"
                          type="password"
                          value={formik.values.confirmpassword}
                          autoComplete="off"
                          required
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.confirmpassword &&
                          formik.touched.confirmpassword && (
                            <Label className="text-red-500">
                              {formik.errors.confirmpassword}
                            </Label>
                          )}
                      </div>
                    </div>

                    <div className="w-full">
                      <Select
                        onOpenChange={() =>
                          formik.setFieldTouched("role", true)
                        }
                        onValueChange={(value) => {
                          formik.setFieldValue("role", value);
                        }}
                        required
                      >
                        <SelectTrigger
                          className="w-full"
                          value={formik.values.contactMode}
                        >
                          <SelectValue
                            placeholder="Select a Contact Mode"
                            defaultValue={formik.values.contactMode}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Contact Mode</SelectLabel>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {formik.errors.contactMode &&
                        formik.touched.contactMode && (
                          <Label className="text-red-500">
                            {formik.errors.contactMode}
                          </Label>
                        )}
                    </div>

                    <div>
                      <Button
                        disabled={
                          !formik.isValid || registerIsPending || !formik.dirty
                        }
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <div className="flex gap-2 items-center">
                          <p>Register</p>{" "}
                          <span>{registerIsPending && <Spinner />}</span>
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

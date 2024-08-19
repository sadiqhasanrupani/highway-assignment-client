import { HTMLAttributes } from "react";

export type ContactEnum = "email" | "phone";

export type SvgProps = {} & HTMLAttributes<SVGAElement>;

// body types
export type RegisterBody = {
  firstName: string;
  lastName: string;
  password: string;
  contactMode: ContactEnum;
  email: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type VerifyOtpBody = {
  otpCode: string;
};

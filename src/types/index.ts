import { HTMLAttributes } from "react";

export type ContactEnum = "email" | "phone";

export type SvgProps = {} & HTMLAttributes<SVGAElement>;

export type Customer = {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
};

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

export type UpdatePassBody = {
  currentPassword: string;
  updatedPassword: string;
};

// payload types
export type UserDetailPayload = {
  message: string;
  userDetail: {
    fullname: string;
    email: string;
    id: number;
  };
};

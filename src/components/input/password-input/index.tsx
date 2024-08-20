import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Eye from "@/components/svg/eye";
import EyeOff from "@/components/svg/eye-off";
import React from "react";

type PasswordInputProps = {
  formik: any;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  isError: boolean;
  errorMessage: string | React.ReactNode;
};

export default function PasswordInput(props: PasswordInputProps) {
  const [openEye, setOpenEye] = React.useState(false);

  return (
    <>
      <div className="relative">
        <Input
          type={openEye ? "text" : "password"}
          name={props.id}
          placeholder={props.placeholder}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        <div
          className="absolute right-3 top-1 cursor-pointer"
          onClick={() => setOpenEye(!openEye)}
        >
          {openEye ? <Eye className="w-5" /> : <EyeOff className="w-5" />}
        </div>
      </div>

      {props.isError && (
        <Label className="text-red-500">{props.errorMessage}</Label>
      )}
    </>
  );
}

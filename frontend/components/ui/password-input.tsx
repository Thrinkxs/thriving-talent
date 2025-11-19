/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";

import { Input } from "./input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <Input
        type={showPassword ? "text" : "password"}
        suffix={
          showPassword ? (
            <EyeIcon
              className="select-none cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeOffIcon
              className="cursor-pointer select-none"
              onClick={() => setShowPassword(true)}
            />
          )
        }
        {...props}
        className={className}
        ref={ref}
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };

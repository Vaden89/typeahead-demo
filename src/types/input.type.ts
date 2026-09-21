import { ComponentPropsWithoutRef, ReactNode } from "react";

export type SearchInputProps = {
  value: string;
  className?: string;
  results?: ReactNode;
  placeholder?: string;
  onClear?: () => void;
  onChange: (value: string) => void;
  inputProps?: ComponentPropsWithoutRef<"input">;
};

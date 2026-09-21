"use client";
import { cn } from "@/utils/cn";
import { SearchInputProps } from "@/types/input.type";
import { AnimatePresence, motion } from "motion/react";

export function SearchInput({
  value,
  results,
  onChange,
  className,
  inputProps,
  placeholder,
  onClear,
}: SearchInputProps) {
  const styling = cn(
    "w-full flex items-center gap-3 px-2 py-2 rounded-lg bg-muted mb-2",
    className,
  );

  return (
    <div className="w-full">
      <div className={styling}>
        <SearchIcon />
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          className="w-full outline-none"
          onChange={(e) => onChange(e.target.value)}
          {...inputProps}
        />
        <AnimatePresence>
          {value && (
            <motion.button
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              type="button"
              aria-label="Clear search"
              onClick={() => {
                onClear?.();
                onChange("");
              }}
              className="p-1 bg-muted-foreground/20 rounded-full"
            >
              <CloseIcon />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      {results}
    </div>
  );
}

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="#52525b"
    viewBox="0 0 256 256"
  >
    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="#52525b"
    viewBox="0 0 256 256"
  >
    <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
  </svg>
);

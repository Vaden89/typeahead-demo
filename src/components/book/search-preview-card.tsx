import Image from "next/image";
import { cn } from "@/utils/cn";
import { toSecureUrl } from "@/utils/image";
import { Book } from "@/types/books.type";
import { ComponentPropsWithoutRef } from "react";

type SearchPreviewCardProps = ComponentPropsWithoutRef<"div"> & {
  book: Book;
  active?: boolean;
};

export const SearchPreviewCard = ({
  book,
  active,
  className,
  ...rest
}: SearchPreviewCardProps) => {
  return (
    <div
      {...rest}
      className={cn(
        "w-full h-full flex gap-3 p-4 rounded-lg bg-muted cursor-pointer",
        "transition-colors duration-150",
        active && "bg-muted-foreground/20",
        className,
      )}
    >
      {book?.volumeInfo?.imageLinks?.smallThumbnail ? (
        <Image
          src={toSecureUrl(book.volumeInfo.imageLinks.smallThumbnail)}
          alt={book.volumeInfo.title ?? "Book image"}
          width={50}
          height={50}
          className="w-12.5 min-h-19"
        />
      ) : (
        <BookIcon />
      )}
      <div className="min-h-19 flex flex-col justify-between">
        <h2 className="line-clamp-3">{book.volumeInfo.title}</h2>

        {book?.volumeInfo?.authors && (
          <p className="text-sm text-muted-foreground flex gap-1 truncate">
            <span>Authors:</span>
            {book.volumeInfo.authors[0]}
          </p>
        )}
      </div>
    </div>
  );
};

const BookIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="#000000"
      viewBox="0 0 256 256"
    >
      <path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z"></path>
    </svg>
  );
};

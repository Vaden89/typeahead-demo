import { cn } from "@/utils/cn";
import Image from "next/image";
import { useState } from "react";
import { Book } from "@/types/books.type";
import { toSecureUrl } from "@/utils/image";

export const BookDetailCard = ({
  book,
  onClear,
}: {
  book: Book;
  onClear: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const { title, authors, publishedDate, description, imageLinks } =
    book.volumeInfo;
  const cover = imageLinks?.thumbnail ?? imageLinks?.smallThumbnail;

  return (
    <article className="animate-fade-up mt-2 rounded-xl bg-muted p-4">
      <div className="flex gap-4">
        {cover ? (
          <Image
            src={toSecureUrl(cover)}
            alt={`Cover of ${title}`}
            width={96}
            height={144}
            className="w-24 h-auto shrink-0 self-start rounded-md"
          />
        ) : (
          <div className="w-24 h-36 shrink-0 rounded-md bg-muted-foreground/15" />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-semibold leading-snug">{title}</h2>
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear selected book"
              className="shrink-0 rounded-full bg-muted-foreground/20 p-1 transition-colors hover:bg-muted-foreground/30"
            >
              <CloseIcon />
            </button>
          </div>

          {authors?.length ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {authors.join(", ")}
            </p>
          ) : null}

          {publishedDate ? (
            <p className="mt-0.5 text-sm text-muted-foreground">
              Published {publishedDate}
            </p>
          ) : null}
        </div>
      </div>

      {description ? (
        <>
          <p
            className={cn(
              "mt-3 text-sm leading-relaxed",
              !expanded && "line-clamp-5",
            )}
          >
            {description}
          </p>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-1 text-sm font-medium text-muted-foreground underline underline-offset-2"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">
          No description available.
        </p>
      )}
    </article>
  );
};

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="currentColor"
    viewBox="0 0 256 256"
    aria-hidden="true"
  >
    <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
  </svg>
);

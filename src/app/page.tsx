"use client";

import Link from "next/link";
import { useState } from "react";
import { Book } from "@/types/books.type";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { useTypeahead } from "@/hooks/useTypeahead";
import { searchBooks } from "@/services/books.service";
import { Collapse } from "@/components/common/collapse";
import { SearchInput } from "@/components/common/search-input";
import { BookDetailCard } from "@/components/book/book-detail-card";
import { PreviewList } from "@/components/book/search-preview-list";
import { PreviewSkeleton } from "@/components/book/search-preview-skeleton";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", debouncedSearchValue],
    queryFn: ({ signal }) => searchBooks(debouncedSearchValue, signal),
    enabled: !!debouncedSearchValue && !selectedBook,
    staleTime: 1000 * 60,
  });

  const books = data?.data ?? [];

  const [lastBooks, setLastBooks] = useState<Book[]>([]);
  if (books.length && books !== lastBooks) setLastBooks(books);
  const displayBooks = books.length ? books : lastBooks;

  const showSkeleton = isLoading && !selectedBook && Boolean(searchValue);
  const showError = !!error && !selectedBook;
  const isListOpen = !selectedBook && books.length > 0 && Boolean(searchValue);
  const isPanelOpen = showSkeleton || showError || isListOpen;

  const { activeIndex, inputProps, listProps, getItemProps } = useTypeahead({
    items: displayBooks,
    open: isListOpen,
    onSelect: (book) => {
      setSelectedBook(book);
      setSearchValue(book.volumeInfo.title);
    },
  });

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setSelectedBook(null);
  };

  return (
    <main className="w-full min-h-dvh flex flex-col pt-20 items-center px-4">
      <section className="w-full max-w-sm">
        <div className="mb-4">
          <h1 className="font-semibold text-xl">Welcome to my bookshop</h1>
          <p className="text-muted-foreground">
            Explore a wide selection of books from our shelves.
          </p>
        </div>

        <SearchInput
          value={searchValue}
          inputProps={inputProps}
          placeholder="Search books"
          onChange={handleSearchChange}
          results={
            <Collapse open={isPanelOpen}>
              {showSkeleton ? (
                <PreviewSkeleton />
              ) : showError ? (
                <p className="text-sm text-destructive">
                  Something went wrong. Please try again.
                </p>
              ) : (
                <PreviewList
                  books={displayBooks}
                  listProps={listProps}
                  activeIndex={activeIndex}
                  getItemProps={getItemProps}
                />
              )}
            </Collapse>
          }
        />

        {selectedBook && (
          <BookDetailCard
            key={selectedBook.id}
            book={selectedBook}
            onClear={() => {
              setSelectedBook(null);
              setLastBooks([]);
            }}
          />
        )}
        <Tribute />
      </section>
    </main>
  );
}

function Tribute() {
  return (
    <div className="w-full text-sm text-muted-foreground mt-4">
      <p>
        The bookshop is powered by{" "}
        <Link className="underline font-medium" href="https://books.google.com">
          Google Books API
        </Link>
      </p>
      <p>
        Source Code is available at{" "}
        <Link
          className="underline font-medium"
          href="https://github.com/your-repo"
        >
          GitHub
        </Link>
      </p>
      <p>
        Bookstore built by{" "}
        <Link className="underline font-medium" href="https://vaden.is-a.dev">
          Isaac Shosanya
        </Link>
      </p>
    </div>
  );
}

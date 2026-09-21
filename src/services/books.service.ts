import { Book } from "@/types/books.type";

export const searchBooks = async (q: string, signal: AbortSignal) => {
  const baseURL = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_URL;

  const response = await fetch(
    `${baseURL}?q=${q}&maxResults=3&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`,
    { signal },
  );
  const data = await response.json();

  return { data: data.items, total: data.totalItems } as {
    data: Book[];
    total: number;
  };
};

import { useTypeahead } from "@/hooks/useTypeahead";
import { Book } from "./books.type";

export type PreviewListProps = {
  books: Book[];
  activeIndex: number;
  listProps: ReturnType<typeof useTypeahead<Book>>["listProps"];
  getItemProps: ReturnType<typeof useTypeahead<Book>>["getItemProps"];
};

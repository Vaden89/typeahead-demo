import { PreviewListProps } from "@/types/search-preview.type";
import { SearchPreviewCard } from "./search-preview-card";

export const PreviewList = ({
  books,
  activeIndex,
  listProps,
  getItemProps,
}: PreviewListProps) => {
  return (
    <div {...listProps} className="flex flex-col gap-2">
      {books.map((book, index) => (
        <SearchPreviewCard
          key={book.id}
          book={book}
          active={index === activeIndex}
          className="animate-fade-up"
          style={{ animationDelay: `${index * 45}ms` }}
          {...getItemProps(index)}
        />
      ))}
    </div>
  );
};

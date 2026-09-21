export type Book = {
  id: string;
  volumeInfo: {
    authors: string[];
    title: string;
    publishedDate: string;
    description: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
};

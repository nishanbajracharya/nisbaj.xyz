type BlogItemSummary = {
  title: string;
  id: string;
  summary: string;
  createdAt: number;
};

type Blog =
  | {
      title: string;
      id: string;
      content: string;
      createdAt: number;
    }
  | undefined;

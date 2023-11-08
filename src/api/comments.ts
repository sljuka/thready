import seedJSONData from "./example.json";

type Data = {
  data: {
    comments: Comment[];
  };
};

export type Comment = {
  id: string;
  author: {
    name: string;
    picture: string;
  };
  text: string;
  timestamp: number;
  parent_id?: string;
  children?: Comment[];
};

export const getComments = () => {
  // simulate a network request with 1s delay
  const data = localStorage.getItem("thready-comments");
  if (!data) return Promise.resolve({ commentsById: {}, tree: [] });
  const parsedData = JSON.parse(data) as Data;

  return new Promise<ReturnType<typeof denormalize>>((resolve) =>
    setTimeout(() => resolve(denormalize(parsedData.data.comments)), 1000)
  );
};

export const seedData = () => {
  if (localStorage.getItem("thready-comments")) return;

  localStorage.setItem("thready-comments", JSON.stringify(seedJSONData));
};

const denormalize = (comments: Comment[]) => {
  const commentsById = comments.reduce((acc, comment) => {
    acc[comment.id] = comment;
    return acc;
  }, {} as Record<string, Comment>);

  const rootComments = comments.filter((comment) => !comment.parent_id);

  const tree = rootComments.map((comment) => {
    const children = comments.filter((child) => child.parent_id === comment.id);
    return {
      ...comment,
      children,
    };
  });

  return {
    commentsById,
    tree,
  };
};

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
    setTimeout(
      () =>
        resolve(
          denormalize(
            parsedData.data.comments.sort((a, b) => b.timestamp - a.timestamp)
          )
        ),
      1000
    )
  );
};

export const sendComment = (text: string, parentId?: string) => {
  const data = localStorage.getItem("thready-comments") || "{}";
  const parsedData = JSON.parse(data) as Data;
  const newComment: Comment = {
    id: Math.random().toString(),
    text,
    author: {
      name: "John Doe",
      picture: "img/john.jpg",
    },
    timestamp: Date.now(),
    parent_id: parentId,
  };

  const newData = {
    data: {
      comments: [...parsedData.data.comments, newComment],
    },
  };
  localStorage.setItem("thready-comments", JSON.stringify(newData));

  return newComment;
};

export const seedData = () => {
  if (localStorage.getItem("thready-comments")) return;

  localStorage.setItem("thready-comments", JSON.stringify(seedJSONData));
};

const createTreeOfComments = (
  comment: Comment,
  commentsById: Record<string, Comment>,
  allComments: Comment[]
): Comment => {
  const children = allComments
    .filter((x) => x.parent_id === comment.id)
    .map((comment) => {
      const commentId = comment.id as keyof typeof commentsById;
      return createTreeOfComments(
        commentsById[commentId],
        commentsById,
        allComments
      );
    });

  return {
    ...comment,
    children,
  };
};

const denormalize = (comments: Comment[]) => {
  const commentsById = comments.reduce((acc, comment) => {
    acc[comment.id] = comment;
    return acc;
  }, {} as Record<string, Comment>);

  const tree = comments
    .filter((comment) => !comment.parent_id) // only root comments
    .map((comment) => createTreeOfComments(comment, commentsById, comments));

  return {
    commentsById,
    tree,
  };
};

import { useQuery } from "react-query";
import { getComments } from "../api/comments";
import { Skeleton } from "./Skeleton";
import { Comment } from "./Comment";

export const Comments = () => {
  const { data, isLoading } = useQuery("comments", () => getComments());

  if (isLoading) return <Skeleton />;

  return (
    <div
      className="flex align-center items-center bg-gray-200 flex-col gap-8 pt-10 pb-4 px-12 w-full overflow-auto"
      style={{ minHeight: 400 }}
    >
      <span className="text-sm text-gray-700">Tuesday, 13.12.2023</span>
      {(data?.tree?.length ?? 0) > 0 && (
        <ul className="flex gap-8 flex-col">
          {data?.tree.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
    </div>
  );
};

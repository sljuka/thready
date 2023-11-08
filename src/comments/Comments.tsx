import { useQuery } from "react-query";
import { getComments, sendComment } from "../api/comments";
import { Skeleton } from "./Skeleton";
import { Comment } from "./Comment";
import React from "react";

export const Comments = () => {
  const { data, isLoading, isFetching, refetch } = useQuery("comments", () =>
    getComments()
  );
  const [text, setText] = React.useState<string>("");

  const [replyingToCommentId, setReplyingToCommentId] = React.useState<
    string | undefined
  >();

  const submitComment = () => {
    if (!text) return;

    sendComment(text, replyingToCommentId);
    refetch().then(() => {
      setText("");
      setReplyingToCommentId(undefined);
    });
  };

  if (isLoading) return <Skeleton />;

  const replyingToName = replyingToCommentId
    ? data?.commentsById[replyingToCommentId]?.author.name
    : null;

  return (
    <div
      className="flex align-center  bg-gray-200 flex-col  pt-10 pb-4 w-full"
      style={{ minHeight: 400 }}
    >
      <span className="text-sm text-gray-700 self-center pb-8">
        Tuesday, 13.12.2023
      </span>
      <div
        className="px-12  overflow-auto"
        style={{ maxHeight: "calc(100vh - 400px)" }}
      >
        {(data?.tree?.length ?? 0) > 0 && (
          <ul className="flex gap-8 flex-col pb-8">
            {data?.tree.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={setReplyingToCommentId}
              />
            ))}
          </ul>
        )}
      </div>
      <div className="px-12 relative">
        {replyingToName && (
          <span className="absolute bottom-14 flex gap-2 text-xs">
            <span>
              replying to <span className="font-medium">{replyingToName}</span>
            </span>
            <button
              className="text-gray-500 hover:text-gray-400"
              onClick={() => setReplyingToCommentId(undefined)}
            >
              cancel
            </button>
          </span>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitComment();
          }}
          className="flex items-center justify-between bg-white px-6"
          style={{
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <input
            className="w-full py-4 outline-none"
            placeholder="type something..."
            autoFocus
            name="comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            disabled={isFetching}
            className="py-3 text-sm px-8 rounded-lg bg-gray-300 font-semibold"
          >
            {isFetching ? "Loading..." : replyingToCommentId ? "Reply" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

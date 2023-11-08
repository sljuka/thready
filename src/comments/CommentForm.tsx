type Props = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isFetching: boolean;
  replyingToCommentId?: string;
  text: string;
  onTextChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const CommentForm = ({
  onSubmit,
  onTextChange,
  text,
  replyingToCommentId,
  isFetching,
}: Props) => (
  <form
    onSubmit={onSubmit}
    className="flex items-center justify-between bg-white px-6"
    style={{
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    }}
  >
    <input
      className="w-full py-4 outline-none disabled:text-gray-500"
      placeholder="type something..."
      autoFocus
      name="comment"
      value={text}
      onChange={onTextChange}
      disabled={isFetching}
    />
    <button
      disabled={isFetching}
      className="py-3 text-sm px-8 rounded-lg bg-gray-300 font-semibold disabled:bg-gray-200 disabled:cursor-pointer disabled:text-gray-500"
    >
      {isFetching ? "Loading..." : replyingToCommentId ? "Reply" : "Send"}
    </button>
  </form>
);

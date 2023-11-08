import type { Comment as CommentType } from "../api/comments";
import * as Avatar from "@radix-ui/react-avatar";

type Props = {
  comment: CommentType;
  onReply: (commentId: string) => void;
};

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

const timeOptions: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
};

const getDateString = (timestamp: number) => {
  const today = new Date();
  const formated = new Date(timestamp);

  const isToday = today.getDate() == formated.getDate();

  return isToday
    ? formated.toLocaleTimeString(undefined, timeOptions)
    : formated.toLocaleDateString(undefined, dateOptions);
};

export const Comment = ({ comment, onReply }: Props) => {
  const hasChildren = (comment?.children?.length ?? 0) > 0;

  return (
    <div
      className="relative flex flex-col gap-8 thready-comment"
      id={`comment-${comment.id}`}
    >
      <div className="flex gap-3">
        <Avatar.Root className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center border-light-300 border-gray-500 border">
          <Avatar.Image src={comment.author.picture} />
          <Avatar.Fallback delayMs={600}>
            {comment.author.name.split(" ").map((x) => x && x.charAt(0))}
          </Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col flex-1 gap-2">
          <div
            className="flex gap-3 flex-col bg-white px-6 py-4 rounded-md"
            style={{ width: "70%" }}
          >
            <span className="font-medium">{comment.author.name}</span>
            <p className="text-sm text-gray-500">{comment.text}</p>
          </div>
          <span className="text-xs flex gap-5 text-gray-500">
            <span className="font-thin">
              {getDateString(comment.timestamp)}
            </span>
            <button
              className="text-blue-800 font-semibold hover:text-blue-400 self-start underline-blue-800 underline"
              onClick={() => onReply(comment.id)}
            >
              Reply {hasChildren && `(${comment?.children?.length})`}
            </button>
          </span>
        </div>
      </div>
      {hasChildren && (
        <ul className="relative flex gap-8 flex-1 flex-col pl-16">
          {comment.children?.map((childComment) => (
            <Comment
              onReply={onReply}
              key={comment.id}
              comment={childComment}
            />
          ))}
        </ul>
      )}
      {hasChildren && (
        <a
          className="absolute w-3 border-transparent bottom-0 bg-gray-400 border-4 bg-clip-padding hover:bg-gray-500 cursor-pointer"
          style={{ height: "calc(100% - 60px", left: 16 }}
          href={`#comment-${comment.id}`}
        />
      )}
    </div>
  );
};

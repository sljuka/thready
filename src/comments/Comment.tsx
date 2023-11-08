import type { Comment as CommentType } from "../api/comments";
import * as Avatar from "@radix-ui/react-avatar";

type Props = {
  comment: CommentType;
};

export const Comment = ({ comment }: Props) => (
  <div className="flex flex-col gap-8">
    <div className="flex gap-3">
      <Avatar.Root className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center border-light-300 border-gray-500 border">
        <Avatar.Image src={comment.author.picture} />
        <Avatar.Fallback delayMs={600}>
          {comment.author.name.split(" ").map((x) => x && x.charAt(0))}
        </Avatar.Fallback>
      </Avatar.Root>
      <div className="flex gap-3 flex-col bg-white px-6 py-4">
        <span className="font-medium">{comment.author.name}</span>
        <p className="text-sm text-gray-500">{comment.text}</p>
      </div>
    </div>
    <ul className="flex gap-8 flex-col pl-16">
      {comment?.children?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  </div>
);

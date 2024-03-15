import { useState, useTransition } from "react";
import { likeThread } from "@/actions/thread";
import { useRouter } from "next/navigation";

export const useLiked = (
  thread_id: string,
  like_count: number,
  isLiked: boolean
) => {
  const [liked, setLiked] = useState<{
    liked: boolean;
    like_count: number;
  }>({
    liked: isLiked,
    like_count: like_count,
  });

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleLike = () => {
    // Immediately toggle the like state and update the like count
    setLiked((prev) => ({
      liked: !prev.liked,
      like_count: prev.liked ? prev.like_count - 1 : prev.like_count + 1,
    }));

    // Start the transition
    startTransition(() => {
      likeThread(thread_id)
        .then((data) => {
          if (data.success) {
            // If the backend update is successful, ensure the state matches
            setLiked({
              liked: data.success.liked,
              like_count: data.success.like_count!,
            });
          } else if (data.error) {
            // If there's an error, revert the like state and count
            setLiked((prev) => ({
              liked: !prev.liked,
              like_count: prev.liked
                ? prev.like_count + 1
                : prev.like_count - 1,
            }));
          }
        })
        .finally(() => router.refresh());
    });
  };

  return { handleLike, isPending, liked };
};

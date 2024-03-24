import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface useLoadMoreProps<T> {
  getFunction: ({
    page,
    perPage,
  }: {
    page: number;
    perPage?: number;
  }) => Promise<T[] | null>;
}

export const useLoadMore = <T>({ getFunction }: useLoadMoreProps<T>) => {
  const [loadData, setLoadData] = useState<T[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState<number>(1);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      const loadMore = async () => {
        const nextPage = pagesLoaded + 1;
        const newData: T[] = (await getFunction({ page: nextPage })) ?? [];
        setLoadData((prevData) => [...prevData, ...newData]);
        setPagesLoaded(nextPage);
      };

      loadMore();
    }
  }, [inView]);

  return { ref, loadData };
};

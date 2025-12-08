// src/hooks/usePagination.ts
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";

type UsePaginationProps<TData> = {
  queryKey: string;
  queryFn: (page: number) => Promise<TData[]>;
  initialPage?: number;
  limit?: number;
  queryOptions?: Omit<UseQueryOptions<TData[]>, "queryKey" | "queryFn">;
};

export function usePagination<TData>({
  queryKey,
  queryFn,
  initialPage = 1,
  limit = 8,
  queryOptions,
}: UsePaginationProps<TData>) {
  const [page, setPage] = useState(initialPage);

  const query = useQuery({
    queryKey: [queryKey, page],
    queryFn: () => queryFn(page),
    placeholderData: keepPreviousData,
    ...queryOptions,
  });

  const data = query.data ?? [];

  const hasNextPage = data.length >= limit;

  function nextPage() {
    if (!hasNextPage) return;
    setPage((prev) => prev + 1);
  }

  function prevPage() {
    setPage((prev) => Math.max(1, prev - 1));
  }

  function goToPage(pageNumber: number) {
    if (pageNumber < 1) return;
    if (pageNumber > page && !hasNextPage) return;
    setPage(pageNumber);
  }

  return {
    page,
    setPage: goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    ...query,
  };
}

import { apiClient } from "@/lib/api/client";
import { type Repository, type SearchRepositories } from "@/types/types";

export const searchRepositories = async (
  searchQueryParams: URLSearchParams,
) => {
  const searchQuery = searchQueryParams.get("q");

  const fallbackSearchQueryParams = new URLSearchParams();
  fallbackSearchQueryParams.append("q", "stars:>10000");
  fallbackSearchQueryParams.append("sort", "stars");
  fallbackSearchQueryParams.append("order", "desc");
  searchQueryParams.forEach((value, key) => {
    if (key !== "q") {
      fallbackSearchQueryParams.append(key, value);
    }
  });

  const data = await apiClient.get<SearchRepositories>(
    `/search/repositories?${searchQuery && searchQuery.trim().length > 0 ? searchQueryParams : fallbackSearchQueryParams}`,
  );

  return data;
};

export const getRepository = async (repoFullName: string) => {
  if (!repoFullName) return;

  const data = await apiClient.get<Repository>("/repos/" + repoFullName);

  return data;
};

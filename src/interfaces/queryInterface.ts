export interface PaginatedInput {
  page?: number;
  limit?: number;
}

export interface SearchQuery extends PaginatedInput {
  search?: string;
}

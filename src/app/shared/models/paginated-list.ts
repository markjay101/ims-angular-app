export interface PaginatedList<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export const EMPTY_PAGINATED_LIST: PaginatedList<any> = {
  items: [],
  totalCount: 0,
  pageNumber: 0,
  totalPages: 0,
  hasPreviousPage: false,
  hasNextPage: false,
};

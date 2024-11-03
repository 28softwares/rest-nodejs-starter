import appConstants from '../constants/appConstant';
import { PaginatedInput } from '../interfaces/queryInterface';

export interface Pagination {
  page: number;
  limit: number;
}

export const paginateResponse = <T>(
  dataTotalCount: [T[], number],
  limit: number | string | undefined,
  page: number | string | undefined,
) => {
  const [data, total] = dataTotalCount;

  page = parseInt(page?.toString() ?? '1');
  limit = parseInt(limit?.toString() ?? '0');
  const lastPage = Math.ceil(total / limit);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;

  return {
    data,
    pagination: {
      count: total,
      currentPage: page,
      nextPage: nextPage,
      prevPage: prevPage,
      lastPage: lastPage,
    },
  };
};

export const skipTakeMaker = (paginationInput: PaginatedInput) => {
  // if undefined set default value
  paginationInput.page = paginationInput.page || appConstants.DEFAULT_PAGE;
  paginationInput.limit = paginationInput.limit || appConstants.DEFAULT_LIMIT;

  const skip = (paginationInput.page - 1) * paginationInput.limit;
  return { skip, take: paginationInput.limit };
};

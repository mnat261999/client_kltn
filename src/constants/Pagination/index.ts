export default interface IPagination {
  page: number;
  pageSize?: number;
}

export const defaultPage = {
  page: 1,
  pageSize: 10,
};

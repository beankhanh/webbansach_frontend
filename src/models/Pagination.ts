
class Pagination {
  page?: number;
  size?: number;
  sort?: string;
  order?: string;

  constructor(page: number = 1, size: number = 10, sort?: string, order: string = 'asc') {
    this.page = page;
    this.size = size;
    this.sort = sort;
    this.order = order;
  }

  toQueryString(): string {
    const queryParams: string[] = [];

    if (this.page !== undefined) queryParams.push(`page=${this.page}`);
    if (this.size !== undefined) queryParams.push(`size=${this.size}`);
    if (this.sort) queryParams.push(`sort=${this.sort},${this.order}`);

    return queryParams.join('&');
  }
}

export default Pagination;
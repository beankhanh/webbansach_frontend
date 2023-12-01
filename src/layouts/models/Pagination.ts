class Pagination {
    page?: string;
    size?: string;
    sort?: string;
    order?: string;
  
    constructor(page: string = '', size: string = '', sort?: string, order: string = 'asc') {
      this.page = page;
      this.size = size;
      this.sort = sort;
      this.order = order;
    }
  
    toQueryString(): string {
      const queryParams: string[] = [];
  
      if (this.page) queryParams.push(`page=${this.page}`);
      if (this.size) queryParams.push(`size=${this.size}`);
      if (this.sort) queryParams.push(`sort=${this.sort},${this.order}`);
  
      return queryParams.join('&');
    }
  }
  
  export default Pagination;
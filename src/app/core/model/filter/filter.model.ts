
export interface Filter {
    propertyName: string;
    displayName: string;
    type: string;
    value: any;
    filterCriteria?: string[];
    customFunction?: any;
    args?: any[];
    _criteriaIndex?: number;
    inputType?: string;
}
  
export class ODataQueryBuilder {
    query: string = '';
    top: string = '';
    skip: string = '';
    count: string = '';
    filter: string = '';
    expand: string = '';
    orderBy: string = '';
    
    public constructor() { }
  
    public setTop(top: string | number): ODataQueryBuilder {
      this.top = '$top=' + String(top);
      return this;
    }
  
    public setSkip(skip: string | number): ODataQueryBuilder {
      this.skip = '$skip='+String(skip);
      return this;
    }
  
    public setCount(count: boolean): ODataQueryBuilder {
      this.count = '$count='+String(count);
      return this;
    }
  
    public setOrderBy(orderBy: string, order: string): ODataQueryBuilder {
      this.orderBy ='$orderby=' + orderBy + ' ' + order;
      return this;
    }
  
    public setFilter(filters: Filter[]): ODataQueryBuilder {

      if(filters.length == 0) 
        return this;
  
      let filter: string = '$filter=';
  
      filters.forEach((element: Filter): void => {
        if(element.value != '')
            return;
        switch(element.type) {
          case 'text':
            filter += `contains(${element.propertyName.split('.').join('/')}, \'${element.value}\') and `;
            break;

          case 'number':
              return;

          case "bigint":
            let criteria: string = element.filterCriteria 
            ? this.getFilterCriteria(element.filterCriteria[<number>element._criteriaIndex])
            : 'eq';
            filter += `${element.propertyName.split('.').join('/')} ${criteria} ${element.value} and `;
            break;
  
          case 'boolean':
            filter += `${element.propertyName.split('.').join('/')} eq ${element.value} and `;
            break;
        }
      })
  
      this.filter = filter.substring(0, filter.length - 4);
      return this;
    }
  
    public setExpand(expand: string | string[]): ODataQueryBuilder {
      if(typeof expand == 'string')
        this.expand = '$expand=' + expand;
      else{
        let expandQuery = '';
        expand.forEach(element => {
          expandQuery += element + ',';
        });
        this.expand = '$expand=' + expandQuery.substring(0, expandQuery.length - 1);
      }

      return this;
    }

    public getQuery(): string {

      let query: string = '';
  
      if(this.top != '')
        query += this.top + ' & ';

      if(this.skip != '')
        query += this.skip + ' & ';

      if(this.count != '')
        query += this.count + ' & ';

      if(this.orderBy != '')
        query += this.orderBy + ' & ';

      if(this.expand != '')
        query += this.expand + ' & ';

      if(this.filter != '')
        query += this.filter + ' & ';
  
      this.query = query.substring(0, query.length - 3);
      return this.query;

    }
    
    public getFilterCriteria(criteria: string | undefined): string {
      switch(criteria){
        case '>':
          return 'gt';
        case '<':
          return 'lt';
        case '>=':
          return 'ge';
        case '<=':
          return 'le';
        case '=':
          return 'eq';
        case '!=':
          return 'ne';
        default:
          return 'eq';
      }
    }

}
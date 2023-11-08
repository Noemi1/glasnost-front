export function sortList(list: any[], propertyString: string): any[] {
    list = list.sort((x, y) => {
        const propertyA = x[propertyString].toLowerCase();
        const propertyB = y[propertyString].toLowerCase();
        if (propertyA < propertyB) 
            return -1;
        if (propertyA > propertyB)
            return 1;
        // names must be equal
        return 0;
    })
    return list;
}
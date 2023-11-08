import { sortList } from "./sort-list";

export function remove(service: any, id: number) {
    var list = service.list.value as any[];
    var index = list.findIndex(x => x.id == id);
    list.splice(index, 1);
    service.list.next(list);
}

export function insertOrReplace(service: any, object: any) {
    var list = service.list.value as any[];
    if (!object.id) {
        list.push(object);
    } else {
        var index = list.findIndex(x => x.id == object.id);
        list.splice(index, 1, object);
    }
    list = sortList(list, 'name');
    service.list.next(list);
}
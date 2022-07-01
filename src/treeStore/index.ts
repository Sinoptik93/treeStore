import { IStoreItem } from './types';

interface INormalizedItem {
  parents: (number | 'root')[];
  children: number[];
  item: IStoreItem;
}

interface INormalizedList {
  [id: number | string | symbol]: INormalizedItem;
}

class TreeStore {
  readonly normalizedList: INormalizedList = {};

  constructor(
    readonly storesList: IStoreItem[],
  ) {
    this.normalizedList = this.getNormalizeList(storesList);
  }

  //
  // PRIVATE
  //
  private getNormalizeList (items: IStoreItem[]): INormalizedList {
    return items.reduce<INormalizedList>((acc, item): INormalizedList => {
      const normalizedItem = {
        item,
        children: this.getChildrenList([item.id], items, true),
        parents: this.getParentsList(item.id, items),
      };

      return { ...acc, [item.id]: normalizedItem }
    }, {})
  }

  private getParentsList (itemId: number | 'root', itemsList: IStoreItem[]): number[] {
    const [childItem] = itemsList.filter((item) => item.id === itemId);
    if (childItem.parent === 'root') {
      return []
    }

    const [parentItem] = itemsList.filter((item) => item.id === childItem.parent);
    const grandParents = this.getParentsList(parentItem.id, itemsList);

    return [parentItem.id, ...grandParents]
  }

  private getChildrenList (parentIdsList: number[], itemsList: IStoreItem[], isDeep = false): number[] {
    const childList = parentIdsList.reduce<number[]>((prevChildIds, parentId): number[] => {
      const currentChildIds = itemsList
          .filter((item) => item.parent === parentId)
          .map((item) => item.id);

      return [...prevChildIds, ...currentChildIds];
    }, []);

    if (childList.length && isDeep) {
      return [
        ...childList,
        ...this.getChildrenList(childList, itemsList, true)
      ]
    }

    return childList;
  }

  //
  // PUBLIC
  //
  public getAll() {
    return this.storesList;
  }

  public getItem(id: IStoreItem['id']) {
    return this.normalizedList[id].item;
  }

  public getChildren(id: IStoreItem['id']) {
    return this.normalizedList[id].children.reduce<IStoreItem[]>((acc, childId): IStoreItem[] => {
        const currentChild = this.normalizedList[childId].item;

        if (id === currentChild.parent) {
          return [...acc, currentChild];
        }

        return acc;
      }, []);
  }

  public getAllChildren(id: IStoreItem['id']) {
    const childrenList = this.normalizedList[id].children;
    return childrenList.map((childId) => this.normalizedList[childId].item);
  }

  public getAllParents(id: IStoreItem['id']) {
    const parentsList = this.normalizedList[id].parents;
    console.log(parentsList);

    return parentsList.map((parentId) => this.normalizedList[parentId].item);
  }
}

export default TreeStore;

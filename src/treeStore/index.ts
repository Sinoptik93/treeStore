import { IStoreItem, INormalizedItem, INormalizedList } from './types';

class TreeStore {
  private normalizedList: INormalizedList = {};

  constructor(
    private readonly storesList: IStoreItem[],
  ) {
    this.normalizedList = this.getNormalizeList(storesList);
  }

  //
  // PRIVATE
  //

  /**
   * Get normalized indexed list of items.
   *
   * @param items - initial items list
   * @private
   */
  private getNormalizeList(items: IStoreItem[]): INormalizedList {
    return items.reduce<INormalizedList>((acc, item): INormalizedList => {
      const normalizedItem = {
        item,
        children: this.getChildrenList([item.id], items),
        parents: this.getParentsList(item.id, items),
      };

      return { ...acc, [item.id]: normalizedItem };
    }, {});
  }

  /**
   * Get list with parents and grandparents ids.
   *
   * @param itemId - start element id
   * @param itemsList - initial items list
   * @private
   */
  private getParentsList(itemId: (number | 'root'), itemsList: IStoreItem[]): number[] {
    const [childItem] = itemsList.filter((item) => item.id === itemId);
    if (childItem.parent === 'root') {
      return [];
    }

    const [parentItem] = itemsList.filter((item) => item.id === childItem.parent);
    const grandParents = this.getParentsList(parentItem.id, itemsList);

    return [parentItem.id, ...grandParents];
  }

  /**
   * Get list with children and grand children ids.
   *
   * @param parentIdsList - list of current parent ids
   * @param itemsList - initial items list
   * @private
   */
  private getChildrenList(parentIdsList: number[], itemsList: IStoreItem[]): number[] {
    const childList = parentIdsList.reduce<number[]>((childIds, parentId): number[] => {
      const grandChildIds = itemsList
        .filter((item) => item.parent === parentId)
        .map((item) => item.id);

      return [...childIds, ...grandChildIds];
    }, []);

    if (childList.length) {
      return [
        ...childList,
        ...this.getChildrenList(childList, itemsList),
      ];
    }

    return childList;
  }

  /**
   * Get normalized item.
   * If `id` not in range - throw error.
   *
   * @param id - target id
   * @private
   */
  private getNormalizedItem(id: IStoreItem['id']): INormalizedItem {
    const target = this.normalizedList[id];
    if (!target) {
      throw Error(`Undefined item id '${id}'`);
    }

    return target;
  }

  //
  // PUBLIC
  //

  /**
   *  Get all stores list.
   */
  public getAll() {
    return this.storesList;
  }

  /**
   * Get target item by id.
   *
   * @param id - target id
   */
  public getItem(id: IStoreItem['id']) {
    const target = this.getNormalizedItem(id);
    return target.item;
  }

  /**
   * Get direct children items list.
   *
   * @param id - target id
   */
  public getChildren(id: IStoreItem['id']) {
    const target = this.getNormalizedItem(id);

    return target.children.reduce<IStoreItem[]>((acc, childId): IStoreItem[] => {
      const currentChild = this.normalizedList[childId].item;

      if (id === currentChild.parent) {
        return [...acc, currentChild];
      }

      return acc;
    }, []);
  }

  /**
   * Get children and grand children items list.
   *
   * @param id - target id
   */
  public getAllChildren(id: IStoreItem['id']) {
    const target = this.getNormalizedItem(id);

    const childrenList = target.children;
    return childrenList.map((childId) => this.normalizedList[childId].item);
  }

  /**
   * Get all parent and grandparents items list.
   *
   * @param id - start target id
   */
  public getAllParents(id: IStoreItem['id']) {
    const target = this.getNormalizedItem(id);
    const parentsList = target.parents;

    return parentsList.map((parentId) => this.normalizedList[parentId].item);
  }
}

export default TreeStore;

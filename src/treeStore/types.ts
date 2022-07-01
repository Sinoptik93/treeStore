interface IBaseItem {
  id: number;
  parent: number | 'root';
}

export interface IStoreItem extends IBaseItem {
  type: string | null;
}

interface INormalizedItem {
  parents: (number | 'root')[];
  children: number[];
  item: IStoreItem;
}

export interface INormalizedList {
  [id: number | string | symbol]: INormalizedItem;
}

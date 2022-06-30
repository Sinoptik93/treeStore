export interface IBaseItem {
  id: number;
  parent: number | 'root';
}

export interface IStoreItem extends IBaseItem {
  type: string | null;
}

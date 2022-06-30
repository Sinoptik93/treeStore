import { IStoreItem } from './types';

class TreeStore {
  constructor(
    readonly storesList: IStoreItem[],
  ) {}

  getAll() {
    return this.storesList;
  }
}

export default TreeStore;

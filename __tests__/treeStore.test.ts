import { IStoreItem } from 'src/treeStore/types';
import TreeStore from '../src/treeStore';
import { example } from './__fixtures__/storesList';

describe('treeStore', () => {
  const newTree = new TreeStore(example as IStoreItem[]);

  test('store list test', () => {
    expect(newTree.getAll()).toBe(example);
  });
});

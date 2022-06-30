import { IStoreItem } from 'src/treeStore/types';
import TreeStore from '../src/treeStore';
import { example } from './__fixtures__/storesList';

describe('TreeStore', () => {
  const newTree = new TreeStore(example as IStoreItem[]);

  test('getAll()', () => {
    expect(newTree.getAll()).toStrictEqual(example);
  });

  test('getItem(7)', () => {
    const result = { id: 7, parent: 4, type: null };

    expect(newTree.getItem(7)).toStrictEqual(result);
  });

  test('getChildren(2)', () => {
    const result = [
      { id: 4, parent: 2, type: 'test' },
      { id: 5, parent: 2, type: 'test' },
      { id: 6, parent: 2, type: 'test' },
    ];

    expect(newTree.getChildren(2)).toStrictEqual(result);
  });

  test('getChildren(4)', () => {
    const result = [
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ];

    expect(newTree.getChildren(4)).toStrictEqual(result);
  });

  test('getChildren(5)', () => {
    expect(newTree.getChildren(5)).toBe([]);
  });

  test('getAllChildren(2)', () => {
    const result = [
      { id: 4, parent: 2, type: 'test' },
      { id: 5, parent: 2, type: 'test' },
      { id: 6, parent: 2, type: 'test' },
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ];

    expect(newTree.getAllChildren(2)).toStrictEqual(result);
  });

  test('getAllParents(7)', () => {
    const result = [
      { id: 4, parent: 2, type: 'test' },
      { id: 2, parent: 1, type: 'test' },
      { id: 1, parent: 'root' },
    ];

    expect(newTree.getAllParents(7)).toStrictEqual(result);
  });
});

import { IStoreItem } from 'src/treeStore/types';
import TreeStore from '../src/treeStore';
import { example } from './__fixtures__/storesList';

describe('TreeStore', () => {
  const ts = new TreeStore(example as IStoreItem[]);

  test('getAll()', () => {
    expect(ts.getAll()).toStrictEqual(example);
  });

  test('getItem(7)', () => {
    const result = { id: 7, parent: 4, type: null };

    expect(ts.getItem(7)).toStrictEqual(result);
  });

  test('getChildren(2)', () => {
    const result = [
      { id: 4, parent: 2, type: 'test' },
      { id: 5, parent: 2, type: 'test' },
      { id: 6, parent: 2, type: 'test' },
    ];

    expect(ts.getChildren(2)).toStrictEqual(result);
  });

  test('getChildren(4)', () => {
    const result = [
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ];

    expect(ts.getChildren(4)).toStrictEqual(result);
  });

  test('getChildren(5)', () => {
    expect(ts.getChildren(5)).toStrictEqual([]);
  });

  test('getAllChildren(2)', () => {
    const result = [
      { id: 4, parent: 2, type: 'test' },
      { id: 5, parent: 2, type: 'test' },
      { id: 6, parent: 2, type: 'test' },
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ];

    expect(ts.getAllChildren(2)).toStrictEqual(result);
  });

  test('getAllParents(7)', () => {
    const result = [
      { id: 4, parent: 2, type: 'test' },
      { id: 2, parent: 1, type: 'test' },
      { id: 1, parent: 'root' },
    ];

    expect(ts.getAllParents(7)).toStrictEqual(result);
  });
});

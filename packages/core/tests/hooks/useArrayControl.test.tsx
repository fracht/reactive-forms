import React from 'react';
import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';

import { ArrayControl, MorfixConfig, MorfixContext, MorfixShared, useArrayControl, useMorfix } from '../../src';

const renderArrayControl = <T extends object>(
    name,
    config: MorfixConfig<T>
): [RenderHookResult<undefined, ArrayControl<unknown>>, MorfixShared<T>] => {
    const {
        result: { current: bag }
    } = renderHook(() => useMorfix(config));

    const wrapper = ({ children }) => (
        <MorfixContext.Provider value={bag as unknown as MorfixShared<object>}>{children}</MorfixContext.Provider>
    );

    return [renderHook(() => useArrayControl<unknown>({ name }), { wrapper }), bag];
};

describe('setItem', () => {
    it('should set item', async () => {
        const [{ result }, bag] = renderArrayControl('arr', {
            initialValues: {
                arr: [0, 1, 2]
            }
        });

        act(() => {
            result.current.setItem('hello', 0);
        });

        expect(bag.getFieldValue('arr')).toStrictEqual(['hello', 1, 2]);
    });
});

describe('setItems', () => {
    it('should set items', async () => {
        const [{ result }, bag] = renderArrayControl('arr', {
            initialValues: {
                arr: [0, 1, 2]
            }
        });

        act(() => {
            result.current.setItems([3, 4, 5]);
        });

        expect(bag.getFieldValue('arr')).toStrictEqual([3, 4, 5]);
    });
});

describe('push', () => {
    it('should push item', async () => {
        const [{ result }, bag] = renderArrayControl('arr', {
            initialValues: {
                arr: [0, 1, 2]
            }
        });

        act(() => {
            result.current.push('hello');
        });

        expect(bag.getFieldValue('arr')).toStrictEqual([0, 1, 2, 'hello']);
    });
    it('should push multiple items', async () => {
        const [{ result }, bag] = renderArrayControl('arr', {
            initialValues: {
                arr: [0, 1, 2]
            }
        });

        act(() => {
            result.current.push('hello', 15, 28.3);
        });

        expect(bag.getFieldValue('arr')).toStrictEqual([0, 1, 2, 'hello', 15, 28.3]);
    });
});

describe('pop', () => {
    it('should pop item', async () => {
        const [{ result }, bag] = renderArrayControl('arr', {
            initialValues: {
                arr: [0, 1, 2]
            }
        });

        let item;

        act(() => {
            item = result.current.pop();
        });

        expect(item).toBe(2);
        expect(bag.getFieldValue('arr')).toStrictEqual([0, 1]);
    });
    it('should pop item & item meta', async () => {
        const [{ result }, bag] = renderArrayControl('arr', {
            initialValues: {
                arr: [0, 1, 2]
            },
            initialErrors: {
                arr: [
                    undefined,
                    undefined,
                    {
                        mrfxError: 'LOL!!!'
                    }
                ]
            },
            initialTouched: {
                arr: [
                    undefined,
                    undefined,
                    {
                        mrfxTouched: true
                    }
                ]
            }
        });

        act(() => {
            result.current.pop();
        });

        expect(bag.getFieldValue('arr')).toStrictEqual([0, 1]);
        expect(bag.getFieldError('arr')).toStrictEqual([undefined, undefined]);
        expect(bag.getFieldTouched('arr')).toStrictEqual([undefined, undefined]);
    });
    it("shouldn't pop error", async () => {
        const [{ result }, bag] = renderArrayControl('arr', {
            initialValues: {
                arr: [0, 1, 2]
            },
            initialErrors: {
                arr: [
                    undefined,
                    {
                        mrfxError: 'LOL!!!'
                    }
                ]
            },
            initialTouched: {
                arr: [
                    undefined,
                    {
                        mrfxTouched: true
                    }
                ]
            }
        });

        act(() => {
            result.current.pop();
        });

        expect(bag.getFieldValue('arr')).toStrictEqual([0, 1]);
        expect(bag.getFieldError('arr')).toStrictEqual([
            undefined,
            {
                mrfxError: 'LOL!!!'
            }
        ]);
        expect(bag.getFieldTouched('arr')).toStrictEqual([
            undefined,
            {
                mrfxTouched: true
            }
        ]);
    });
    it('should remove all unnecessary errors', () => {
        const [{ result }, bag] = renderArrayControl('arr', {
            initialValues: {
                arr: [0, 1, 2]
            },
            initialErrors: {
                arr: [
                    undefined,
                    {
                        mrfxError: 'LOL!!!'
                    },
                    {
                        mrfxError: 'LOL!!!'
                    },
                    {
                        mrfxError: 'LOL!!!'
                    },
                    {
                        mrfxError: 'LOL!!!'
                    }
                ]
            }
        });

        act(() => {
            result.current.pop();
        });

        expect(bag.getFieldValue('arr')).toStrictEqual([0, 1]);
        expect(bag.getFieldError('arr')).toStrictEqual([
            undefined,
            {
                mrfxError: 'LOL!!!'
            }
        ]);
    });
});

describe('shift', () => {
    it('should shift item', async () => {
        const [{ result }, bag] = renderArrayControl('arr', {
            initialValues: {
                arr: [0, 1, 2]
            },
            initialErrors: {
                arr: [
                    {
                        mrfxError: 'L'
                    },
                    undefined,
                    undefined
                ]
            },
            initialTouched: {
                arr: [
                    {
                        mrfxTouched: true
                    },
                    undefined,
                    undefined
                ]
            }
        });

        let item;

        act(() => {
            item = result.current.shift();
        });

        expect(item).toBe(0);
        expect(bag.getFieldValue('arr')).toStrictEqual([1, 2]);
        expect(bag.getFieldError('arr')).toStrictEqual([undefined, undefined]);
        expect(bag.getFieldTouched('arr')).toStrictEqual([undefined, undefined]);
    });
});

describe('unshift', () => {
    it('should unshift item', async () => {
        const [{ result }, bag] = renderArrayControl('arr', {
            initialValues: {
                arr: [1, 2]
            },
            initialErrors: {
                arr: [
                    {
                        mrfxError: 'L'
                    },
                    undefined
                ]
            },
            initialTouched: {
                arr: [
                    {
                        mrfxTouched: true
                    },
                    undefined
                ]
            }
        });

        let count;

        act(() => {
            count = result.current.unshift(0);
        });

        expect(count).toBe(3);
        expect(bag.getFieldValue('arr')).toStrictEqual([0, 1, 2]);
        expect(bag.getFieldError('arr')).toStrictEqual([
            undefined,
            {
                mrfxError: 'L'
            },
            undefined
        ]);
        expect(bag.getFieldTouched('arr')).toStrictEqual([
            undefined,
            {
                mrfxTouched: true
            },
            undefined
        ]);
    });
});

describe('swap', () => {
    it('should swap items and their meta', () => {
        const [{ result }, bag] = renderArrayControl('arr', {
            initialValues: {
                arr: [1, 2]
            },
            initialErrors: {
                arr: [
                    {
                        mrfxError: 'L'
                    },
                    undefined
                ]
            },
            initialTouched: {
                arr: [
                    {
                        mrfxTouched: true
                    },
                    undefined
                ]
            }
        });

        act(() => {
            result.current.swap(0, 1);
        });

        expect(bag.getFieldValue('arr')).toStrictEqual([2, 1]);
        expect(bag.getFieldError('arr')).toStrictEqual([
            undefined,
            {
                mrfxError: 'L'
            }
        ]);
        expect(bag.getFieldTouched('arr')).toStrictEqual([
            undefined,
            {
                mrfxTouched: true
            }
        ]);
    });
    it('should swap when error array length < items array length', () => {
        const [{ result }, bag] = renderArrayControl('arr', {
            initialValues: {
                arr: [1, 2]
            },
            initialErrors: {
                arr: [
                    {
                        mrfxError: 'L'
                    }
                ]
            },
            initialTouched: {
                arr: [
                    {
                        mrfxTouched: true
                    }
                ]
            }
        });

        act(() => {
            result.current.swap(0, 1);
        });

        expect(bag.getFieldValue('arr')).toStrictEqual([2, 1]);
        expect(bag.getFieldError('arr')).toStrictEqual([
            undefined,
            {
                mrfxError: 'L'
            }
        ]);
        expect(bag.getFieldTouched('arr')).toStrictEqual([
            undefined,
            {
                mrfxTouched: true
            }
        ]);
    });
});

describe('move', () => {
    it("should move item and it's meta", () => {
        const [{ result }, bag] = renderArrayControl('arr', {
            initialValues: {
                arr: [1, 2, 3, 4]
            },
            initialErrors: {
                arr: [
                    undefined,
                    {
                        mrfxError: 'L'
                    }
                ]
            },
            initialTouched: {
                arr: [
                    undefined,
                    {
                        mrfxTouched: true
                    }
                ]
            }
        });

        act(() => {
            result.current.move(1, 3);
        });

        expect(bag.getFieldValue('arr')).toStrictEqual([1, 3, 4, 2]);
        expect(bag.getFieldError('arr')).toStrictEqual([
            undefined,
            undefined,
            undefined,
            {
                mrfxError: 'L'
            }
        ]);
        expect(bag.getFieldTouched('arr')).toStrictEqual([
            undefined,
            undefined,
            undefined,
            {
                mrfxTouched: true
            }
        ]);
    });
});

describe('insert', () => {
    it('should insert item', () => {
        const [{ result }, bag] = renderArrayControl('arr', {
            initialValues: {
                arr: [1, 2, 3, 4]
            },
            initialErrors: {
                arr: [
                    undefined,
                    undefined,
                    {
                        mrfxError: 'L'
                    }
                ]
            },
            initialTouched: {
                arr: [
                    undefined,
                    undefined,
                    {
                        mrfxTouched: true
                    }
                ]
            }
        });

        act(() => {
            result.current.insert(2, 5);
        });

        expect(bag.getFieldValue('arr')).toStrictEqual([1, 2, 5, 3, 4]);
        expect(bag.getFieldError('arr')).toStrictEqual([
            undefined,
            undefined,
            undefined,
            {
                mrfxError: 'L'
            }
        ]);
        expect(bag.getFieldTouched('arr')).toStrictEqual([
            undefined,
            undefined,
            undefined,
            {
                mrfxTouched: true
            }
        ]);
    });
});

describe('removeAt', () => {
    it('should remove element at index', () => {
        const [{ result }, bag] = renderArrayControl('arr', {
            initialValues: {
                arr: [1, 2, 3, 4]
            },
            initialErrors: {
                arr: [
                    undefined,
                    undefined,
                    {
                        mrfxError: 'L'
                    }
                ]
            },
            initialTouched: {
                arr: [
                    undefined,
                    undefined,
                    {
                        mrfxTouched: true
                    }
                ]
            }
        });

        act(() => {
            result.current.removeAt(2);
        });

        expect(bag.getFieldValue('arr')).toStrictEqual([1, 2, 4]);
        expect(bag.getFieldError('arr')).toStrictEqual([undefined, undefined]);
        expect(bag.getFieldTouched('arr')).toStrictEqual([undefined, undefined]);
    });
});

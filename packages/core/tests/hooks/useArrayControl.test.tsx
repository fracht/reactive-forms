import React from 'react';
import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { createPxth, Pxth } from 'pxth';

import { ArrayControl, FormConfig, FormShared, ReactiveFormProvider, useArrayControl, useForm } from '../../src';

const renderArrayControl = <T extends object, V>(
    name: Pxth<V[]>,
    config: FormConfig<T>
): [RenderHookResult<undefined, ArrayControl<V>>, FormShared<T>] => {
    const { result: bag } = renderHook(() => useForm(config));

    const wrapper = ({ children }) => (
        <ReactiveFormProvider formBag={bag.current as unknown as FormShared<object>}>{children}</ReactiveFormProvider>
    );

    return [renderHook(() => useArrayControl<V>({ name }), { wrapper }), bag.current];
};

describe('setItem', () => {
    it('should set item', async () => {
        const [{ result }, bag] = renderArrayControl(createPxth(['arr']), {
            initialValues: {
                arr: [0, 1, 2]
            }
        });

        act(() => {
            result.current.setItem('hello', 0);
        });

        expect(bag.getFieldValue(createPxth(['arr']))).toStrictEqual(['hello', 1, 2]);
    });
});

describe('setItems', () => {
    it('should set items', async () => {
        const [{ result }, bag] = renderArrayControl(createPxth(['arr']), {
            initialValues: {
                arr: [0, 1, 2]
            }
        });

        act(() => {
            result.current.setItems([3, 4, 5]);
        });

        expect(bag.getFieldValue(createPxth(['arr']))).toStrictEqual([3, 4, 5]);
    });
});

describe('push', () => {
    it('should push item', async () => {
        const [{ result }, bag] = renderArrayControl(createPxth(['arr']), {
            initialValues: {
                arr: [0, 1, 2]
            }
        });

        act(() => {
            result.current.push('hello');
        });

        expect(bag.getFieldValue(createPxth(['arr']))).toStrictEqual([0, 1, 2, 'hello']);
    });
    it('should push multiple items', async () => {
        const [{ result }, bag] = renderArrayControl(createPxth(['arr']), {
            initialValues: {
                arr: [0, 1, 2]
            }
        });

        act(() => {
            result.current.push('hello', 15, 28.3);
        });

        expect(bag.getFieldValue(createPxth(['arr']))).toStrictEqual([0, 1, 2, 'hello', 15, 28.3]);
    });
});

describe('pop', () => {
    it('should pop item', async () => {
        const [{ result }, bag] = renderArrayControl(createPxth(['arr']), {
            initialValues: {
                arr: [0, 1, 2]
            }
        });

        let item;

        act(() => {
            item = result.current.pop();
        });

        expect(item).toBe(2);
        expect(bag.getFieldValue(createPxth(['arr']))).toStrictEqual([0, 1]);
    });
    it('should pop item & item meta', async () => {
        const [{ result }, bag] = renderArrayControl(createPxth(['arr']), {
            initialValues: {
                arr: [0, 1, 2]
            },
            initialErrors: {
                arr: [
                    undefined,
                    undefined,
                    {
                        $error: 'LOL!!!'
                    }
                ]
            },
            initialTouched: {
                arr: [
                    undefined,
                    undefined,
                    {
                        $touched: true
                    }
                ]
            }
        });

        act(() => {
            result.current.pop();
        });

        expect(bag.getFieldValue(createPxth(['arr']))).toStrictEqual([0, 1]);
        expect(bag.getFieldError(createPxth(['arr']))).toStrictEqual([undefined, undefined]);
        expect(bag.getFieldTouched(createPxth(['arr']))).toStrictEqual([undefined, undefined]);
    });
    it("shouldn't pop error", async () => {
        const [{ result }, bag] = renderArrayControl(createPxth(['arr']), {
            initialValues: {
                arr: [0, 1, 2]
            },
            initialErrors: {
                arr: [
                    undefined,
                    {
                        $error: 'LOL!!!'
                    }
                ]
            },
            initialTouched: {
                arr: [
                    undefined,
                    {
                        $touched: true
                    }
                ]
            }
        });

        act(() => {
            result.current.pop();
        });

        expect(bag.getFieldValue(createPxth(['arr']))).toStrictEqual([0, 1]);
        expect(bag.getFieldError(createPxth(['arr']))).toStrictEqual([
            undefined,
            {
                $error: 'LOL!!!'
            }
        ]);
        expect(bag.getFieldTouched(createPxth(['arr']))).toStrictEqual([
            undefined,
            {
                $touched: true
            }
        ]);
    });
    it('should remove all unnecessary errors', () => {
        const [{ result }, bag] = renderArrayControl(createPxth(['arr']), {
            initialValues: {
                arr: [0, 1, 2]
            },
            initialErrors: {
                arr: [
                    undefined,
                    {
                        $error: 'LOL!!!'
                    },
                    {
                        $error: 'LOL!!!'
                    },
                    {
                        $error: 'LOL!!!'
                    },
                    {
                        $error: 'LOL!!!'
                    }
                ]
            }
        });

        act(() => {
            result.current.pop();
        });

        expect(bag.getFieldValue(createPxth(['arr']))).toStrictEqual([0, 1]);
        expect(bag.getFieldError(createPxth(['arr']))).toStrictEqual([
            undefined,
            {
                $error: 'LOL!!!'
            }
        ]);
    });
});

describe('shift', () => {
    it('should shift item', async () => {
        const [{ result }, bag] = renderArrayControl(createPxth(['arr']), {
            initialValues: {
                arr: [0, 1, 2]
            },
            initialErrors: {
                arr: [
                    {
                        $error: 'L'
                    },
                    undefined,
                    undefined
                ]
            },
            initialTouched: {
                arr: [
                    {
                        $touched: true
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
        expect(bag.getFieldValue(createPxth(['arr']))).toStrictEqual([1, 2]);
        expect(bag.getFieldError(createPxth(['arr']))).toStrictEqual([undefined, undefined]);
        expect(bag.getFieldTouched(createPxth(['arr']))).toStrictEqual([undefined, undefined]);
    });
});

describe('unshift', () => {
    it('should unshift item', async () => {
        const [{ result }, bag] = renderArrayControl(createPxth(['arr']), {
            initialValues: {
                arr: [1, 2]
            },
            initialErrors: {
                arr: [
                    {
                        $error: 'L'
                    },
                    undefined
                ]
            },
            initialTouched: {
                arr: [
                    {
                        $touched: true
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
        expect(bag.getFieldValue(createPxth(['arr']))).toStrictEqual([0, 1, 2]);
        expect(bag.getFieldError(createPxth(['arr']))).toStrictEqual([
            undefined,
            {
                $error: 'L'
            },
            undefined
        ]);
        expect(bag.getFieldTouched(createPxth(['arr']))).toStrictEqual([
            undefined,
            {
                $touched: true
            },
            undefined
        ]);
    });
});

describe('swap', () => {
    it('should swap items and their meta', () => {
        const [{ result }, bag] = renderArrayControl(createPxth(['arr']), {
            initialValues: {
                arr: [1, 2]
            },
            initialErrors: {
                arr: [
                    {
                        $error: 'L'
                    },
                    undefined
                ]
            },
            initialTouched: {
                arr: [
                    {
                        $touched: true
                    },
                    undefined
                ]
            }
        });

        act(() => {
            result.current.swap(0, 1);
        });

        expect(bag.getFieldValue(createPxth(['arr']))).toStrictEqual([2, 1]);
        expect(bag.getFieldError(createPxth(['arr']))).toStrictEqual([
            undefined,
            {
                $error: 'L'
            }
        ]);
        expect(bag.getFieldTouched(createPxth(['arr']))).toStrictEqual([
            undefined,
            {
                $touched: true
            }
        ]);
    });
    it('should swap when error array length < items array length', () => {
        const [{ result }, bag] = renderArrayControl(createPxth(['arr']), {
            initialValues: {
                arr: [1, 2]
            },
            initialErrors: {
                arr: [
                    {
                        $error: 'L'
                    }
                ]
            },
            initialTouched: {
                arr: [
                    {
                        $touched: true
                    }
                ]
            }
        });

        act(() => {
            result.current.swap(0, 1);
        });

        expect(bag.getFieldValue(createPxth(['arr']))).toStrictEqual([2, 1]);
        expect(bag.getFieldError(createPxth(['arr']))).toStrictEqual([
            undefined,
            {
                $error: 'L'
            }
        ]);
        expect(bag.getFieldTouched(createPxth(['arr']))).toStrictEqual([
            undefined,
            {
                $touched: true
            }
        ]);
    });
});

describe('move', () => {
    it("should move item and it's meta", () => {
        const [{ result }, bag] = renderArrayControl(createPxth(['arr']), {
            initialValues: {
                arr: [1, 2, 3, 4]
            },
            initialErrors: {
                arr: [
                    undefined,
                    {
                        $error: 'L'
                    }
                ]
            },
            initialTouched: {
                arr: [
                    undefined,
                    {
                        $touched: true
                    }
                ]
            }
        });

        act(() => {
            result.current.move(1, 3);
        });

        expect(bag.getFieldValue(createPxth(['arr']))).toStrictEqual([1, 3, 4, 2]);
        expect(bag.getFieldError(createPxth(['arr']))).toStrictEqual([
            undefined,
            undefined,
            undefined,
            {
                $error: 'L'
            }
        ]);
        expect(bag.getFieldTouched(createPxth(['arr']))).toStrictEqual([
            undefined,
            undefined,
            undefined,
            {
                $touched: true
            }
        ]);
    });
});

describe('insert', () => {
    it('should insert item', () => {
        const [{ result }, bag] = renderArrayControl(createPxth(['arr']), {
            initialValues: {
                arr: [1, 2, 3, 4]
            },
            initialErrors: {
                arr: [
                    undefined,
                    undefined,
                    {
                        $error: 'L'
                    }
                ]
            },
            initialTouched: {
                arr: [
                    undefined,
                    undefined,
                    {
                        $touched: true
                    }
                ]
            }
        });

        act(() => {
            result.current.insert(2, 5);
        });

        expect(bag.getFieldValue(createPxth(['arr']))).toStrictEqual([1, 2, 5, 3, 4]);
        expect(bag.getFieldError(createPxth(['arr']))).toStrictEqual([
            undefined,
            undefined,
            undefined,
            {
                $error: 'L'
            }
        ]);
        expect(bag.getFieldTouched(createPxth(['arr']))).toStrictEqual([
            undefined,
            undefined,
            undefined,
            {
                $touched: true
            }
        ]);
    });
});

describe('removeAt', () => {
    it('should remove element at index', () => {
        const [{ result }, bag] = renderArrayControl(createPxth(['arr']), {
            initialValues: {
                arr: [1, 2, 3, 4]
            },
            initialErrors: {
                arr: [
                    undefined,
                    undefined,
                    {
                        $error: 'L'
                    }
                ]
            },
            initialTouched: {
                arr: [
                    undefined,
                    undefined,
                    {
                        $touched: true
                    }
                ]
            }
        });

        act(() => {
            result.current.removeAt(2);
        });

        expect(bag.getFieldValue(createPxth(['arr']))).toStrictEqual([1, 2, 4]);
        expect(bag.getFieldError(createPxth(['arr']))).toStrictEqual([undefined, undefined]);
        expect(bag.getFieldTouched(createPxth(['arr']))).toStrictEqual([undefined, undefined]);
    });
});

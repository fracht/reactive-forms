import { cloneDeep } from 'lodash';

import { overrideMerge } from '../../src/utils/overrideMerge';

describe('overrideMerge', () => {
    it('should merge source into object', () => {
        expect(
            overrideMerge({ hello: [{ name: 'Hello' }, { name: 'World' }] }, { hello: [{ age: 10 }, { age: 20 }] })
        ).toStrictEqual({
            hello: [
                { name: 'Hello', age: 10 },
                { name: 'World', age: 20 }
            ]
        });
    });

    it('should override values', () => {
        expect(overrideMerge({ value: 'asdf' }, { value: undefined })).toStrictEqual({
            value: undefined
        });
    });

    it('should not mutate arguments', () => {
        const obj1 = {
            hello: {
                asdf: 'hello'
            }
        };
        const obj2 = {
            hello: {
                d: 'aaa'
            }
        };

        const test1 = cloneDeep(obj1);
        const test2 = cloneDeep(obj2);

        overrideMerge(obj1, obj2);

        expect(obj1).toStrictEqual(test1);
        expect(obj2).toStrictEqual(test2);
    });
});

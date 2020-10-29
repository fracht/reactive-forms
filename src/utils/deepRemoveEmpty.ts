import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

export const deepRemoveEmpty = (obj: object): object | undefined => {
    if (Array.isArray(obj)) {
        const newArr = obj
            .map((value) => (typeof value === 'object' ? deepRemoveEmpty(value) : value))
            .filter((value) => !isNil(value) && (typeof value === 'object' ? !isEmpty(value) : true));
        return isEmpty(newArr) ? undefined : newArr;
    } else if (obj !== null && typeof obj === 'object') {
        const newObj = Object.keys(obj).reduce((acc, key) => {
            const value = typeof obj[key] === 'object' ? deepRemoveEmpty(obj[key]) : obj[key];

            if (!isEmpty(value)) {
                acc[key] = value;
            }

            return acc;
        }, {});
        return isEmpty(newObj) ? undefined : newObj;
    }
    return obj;
};

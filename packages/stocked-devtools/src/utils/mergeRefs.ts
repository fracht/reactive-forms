export default function mergeRefs<T>(...refs: Array<React.Ref<T> | React.MutableRefObject<T> | undefined>) {
    const filteredRefs = refs.filter(Boolean);

    if (filteredRefs.length <= 1) {
        return filteredRefs[0];
    }

    return function mergedRefs(ref: T | null) {
        filteredRefs.forEach((currentRef) => {
            if (typeof currentRef === 'function') {
                currentRef(ref);
            } else if (currentRef) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (currentRef as any).current = ref;
            }
        });
    };
}

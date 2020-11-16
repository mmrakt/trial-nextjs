import { useMemo } from 'react'

export const useClassName = (
    ...names: ReadonlyArray<string | undefined>
): string => {
    return useMemo(() => names.filter((name) => !!name).join('　'), [names])
}

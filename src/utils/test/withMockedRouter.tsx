import React from 'react'
import { RouterContext } from 'next/dist/next-server/lib/router-context'

export function withMockedRouter(
    children: React.ReactElement
): React.ReactElement {
    const mockedRouter = {
        basePath: '',
        pathname: '/',
        route: '/',
        asPath: '/',
        query: {},
        push: jest.fn(),
        replace: jest.fn(),
        reload: jest.fn(),
        back: jest.fn(),
        prefetch: jest.fn(),
        beforePopState: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
        isFallback: false,
    }

    return (
        <RouterContext.Provider value={mockedRouter}>
            {children}
        </RouterContext.Provider>
    )
}

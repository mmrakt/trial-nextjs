import React from 'react'
import {render, cleanup, fireEvent, screen} from '@testing-library/react'
import TaskItem from '../../pages/submit/TaskItem'

describe('TaskItem', () => {
    const task = {
        id: "",
        target: true,
        hourId: 0,
        categoryId: 0,
        project: 'MS新基盤',
        ticketTitle: 'test',
        note: 'test'
    }
    const hourList = []
    const categoryList = []
    const onChange = jest.fn()
    const onDelete = jest.fn()
    test('TaskItemがレンダリングされること', () => {
        //NOTE: table,tbodyタグが含まれないとconsole errorとなる
        render(
            <table>
                <tbody>
                    <TaskItem task={task} hourList={hourList} categoryList={categoryList} onChange={onChange} onDelete={onDelete} />
                </tbody>
            </table>
        )
        expect(screen.getByText('MS新基盤')).toBeInTheDocument()
    })
})


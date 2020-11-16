import { formatDate } from './date'

describe('formatDate', () => {
    test('作成してすぐ', () => {
        expect(formatDate(new Date())).toEqual({
            datetime: '2020/10/08 23:00',
            isNew: true,
        })
    })
})

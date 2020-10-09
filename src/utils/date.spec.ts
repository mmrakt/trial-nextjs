import { formatDate } from './date'

describe('formatDate', () => {
  const now = new Date('2020-10-8 23:00:00')
  test('作成してすぐ', () => {
    expect(formatDate(new Date(now), now)).toEqual({
      datetime: '2020-10-8 23:00:00',
      isNew: true,
    })
  })
})

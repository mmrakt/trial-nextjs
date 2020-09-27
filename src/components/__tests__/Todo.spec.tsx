import React from 'react'
import renderer from 'react-test-renderer'
import Todo from '../todo/index'
import Input from '../todo/Input'
import TodoItem from '../todo/Item'
import TodoTabPanel from '../todo/TabPanel'
import { shallow } from 'enzyme'

test('Todo', () => {
  const component = renderer.create(<Todo />)
  const tree = component.toJSON()
  // snapshot作成
  expect(tree).toMatchSnapshot()
})

test('Add Todo', () => {
  const mockEvent = {
    key: 'Enter',
    target: {
      value: 'test',
    },
  }
  const wrapper = shallow(<Input />)
  wrapper.find("[data-testid='text']").simulate('keydown', mockEvent)
  // expect(props.onAdd).toBeCalled()
})

test('Toggle Todo', () => {
  const props = {
    todo: {
      key: 'test1',
      text: 'test',
      done: false,
    },
    onCheck: jest.fn(),
    onDelete: jest.fn(),
  }
  const wrapper = shallow(<TodoItem {...props} />)
  wrapper.find("[data-testid='checkbox']").simulate('change')
  expect(props.onCheck).toBeCalled()
})

test('Display Todo', () => {
  const props = {
    todos: [
      {
        key: 'test1',
        text: 'test1',
        done: false,
      },
      {
        key: 'test2',
        text: 'test2',
        done: false,
      },
      {
        key: 'test3',
        text: 'test3',
        done: false,
      },
    ],
    filter: 'TODO',
    status: 'TODO',
    onChange: jest.fn(),
    onDelete: jest.fn(),
  }
  const wrapper = shallow(<TodoTabPanel {...props} />)
  expect(wrapper.find("[data-testid='todoItem']").length).toBe(3)
})

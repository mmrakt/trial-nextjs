import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useDispatch, useSelector } from 'react-redux'
import { handleFilterChange } from '../../modules/todoModule'
import { rootState } from '../../rootReducer'

function Filter(): any {
    const dispatch = useDispatch()
    const filter = useSelector((state: rootState) => state.todos.filter)
    const handleChange = (event, newValue) => {
        dispatch(handleFilterChange(newValue))
    }
    return (
        <>
            <Tabs value={filter} onChange={handleChange}>
                <Tab label="ALL" value="ALL" />
                <Tab label="TODO" value="TODO" />
                <Tab label="DONE" value="DONE" />
            </Tabs>
        </>
    )
}

export default Filter

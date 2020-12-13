import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/layout'

const Index = (): React.ReactElement => {
    return (
        <>
            <Layout title="Dashboard">
                <div></div>
            </Layout>
        </>
    )
}

Index.propTypes = {
    children: PropTypes.node,
}

export default Index

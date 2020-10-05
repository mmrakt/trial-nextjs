import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    toolbar: theme.mixins.toolbar,
    pageTitle: {
      marginBottom: theme.spacing(1),
    },
  })
)
type LayoutProps = {
  children: React.ReactNode
  title: string
}

const Layout = (props: LayoutProps): React.ReactElement => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="lg" className={classes.container}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            noWrap
            className={classes.pageTitle}
          >
            {props.title}
          </Typography>
          {props.children}
        </Container>
      </main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout

import React from 'react'
import {
  Drawer as DrawerEl,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
  Theme,
  useTheme,
  makeStyles,
  createStyles,
} from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'
import SettingsIcon from '@material-ui/icons/Settings'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Link from 'next/link'
import { useRouter } from 'next/router'

type IProps = {
  isOpenDrawer: boolean
  handleClose: () => void
}
const drawerWidth = 300

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
  })
)
const Drawer = (props: IProps): React.ReactElement => {
  const { isOpenDrawer, handleClose } = props
  const theme = useTheme()
  const classes = useStyles()
  const router = useRouter()
  const handleRouting = () => {
    const date = new Date()
    const y = date.getFullYear()
    const m = ('00' + (date.getMonth() + 1)).slice(-2)
    const d = ('00' + date.getDate()).slice(-2)
    const formatDate = Number(y + m + d)
    router.push(`/submit/${formatDate}`)
  }
  return (
    <>
      <DrawerEl
        anchor="left"
        open={isOpenDrawer}
        onClose={() => {
          handleClose
        }}
      >
        <div className={classes.drawerHeader}>
          {/*TODO: 子コンポーネントにonClickハンドラを含めるとエラーになる */}
          <IconButton onClick={handleClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link href="/check">
            <ListItem button>
              <ListItemAvatar>
                <LibraryAddCheckIcon />
              </ListItemAvatar>
              <ListItemText>提出状況確認</ListItemText>
            </ListItem>
          </Link>
          <ListItem button onClick={handleRouting}>
            <ListItemAvatar>
              <NoteAddIcon />
            </ListItemAvatar>
            <ListItemText>提出フォーム</ListItemText>
          </ListItem>
        </List>
      </DrawerEl>
    </>
  )
}

export default Drawer

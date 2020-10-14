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
  const DrawerListItem = [
    {
      text: 'ダッシュボード',
      link: '/',
    },
    {
      text: '日報の提出',
      link: '/submit',
    },
    {
      text: '日報の提出状況確認',
      link: '/check',
    },
    {
      text: '設定',
      link: '/settings',
    },
  ]
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
          {/* 子コンポーネントにonClickハンドラを含めるとエラーになる */}
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
          {DrawerListItem.map((item, index) => (
            <Link href={item.link} key={index}>
              <ListItem button>
                <ListItemAvatar>
                  <>
                    {item.link === '/' && <DashboardIcon />}
                    {item.link === '/submit' && <NoteAddIcon />}
                    {item.link === '/check' && <LibraryAddCheckIcon />}
                    {item.link === '/settings' && <SettingsIcon />}
                  </>
                </ListItemAvatar>
                <ListItemText>{item.text}</ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
      </DrawerEl>
    </>
  )
}

export default Drawer

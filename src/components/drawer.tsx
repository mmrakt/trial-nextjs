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
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import MenuIcon from '@material-ui/icons/Menu'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { formatDate } from '@/utils/date'

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
        router.push(`/submit/${formatDate(new Date())}`)
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
                    {/*TODO: 子コンポーネントにonClickハンドラを含めるとエラーになる対応 */}
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
                    <Link href="/">
                        <ListItem button>
                            <ListItemAvatar>
                                <MenuIcon />
                            </ListItemAvatar>
                            <ListItemText>トップメニュー</ListItemText>
                        </ListItem>
                    </Link>
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
                    <Link href="/aggregate">
                        <ListItem button>
                            <ListItemAvatar>
                                <EqualizerIcon />
                            </ListItemAvatar>
                            <ListItemText>集計データ確認</ListItemText>
                        </ListItem>
                    </Link>
                    <Link href="/todo">
                        <ListItem button>
                            <ListItemAvatar>
                                <AssignmentTurnedInIcon />
                            </ListItemAvatar>
                            <ListItemText>ToDo管理</ListItemText>
                        </ListItem>
                    </Link>
                </List>
            </DrawerEl>
        </>
    )
}

export default Drawer

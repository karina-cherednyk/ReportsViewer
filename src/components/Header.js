import { Button, AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu'




const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    f1: {
        flexGrow: 0,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    f2: {
        flexGrow: 0
    }
}));


// rafce 
const Header = () => {
    const c = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
            <IconButton edge="start"  className={c.menuButton} aria-label="menu">
            <MenuIcon  />
            </IconButton>
            <label className={`MuiTypography-h6 ${c.f1}`}>
            <input type="file"style={{visibility: "hidden"}}/>Custom Upload</label>
            <Typography variant="h6" className={c.f1} >  News  </Typography>
            <Button className={c.f1} >Check</Button>
            <Button className={c.f1} >Print form</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header

import { Button, AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu'


const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    f1: {
        flexGrow: 1,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    fileLabel: {
        border: "1px solid white",
        textAlign: "center"
    },
    fileButton: {
        visibility: "hidden",
        display: "none"
    },
    button: {
        fontSize: "1rem",
        fontFamily:' "Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: "0.0075em",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}));


// rafce 
const Header = ({currentReport}) => {
    const c = useStyles();
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
            <IconButton edge="start"  className={c.menuButton} aria-label="menu">
            <MenuIcon  />
            </IconButton>
            <label className={`MuiTypography-h6 ${c.f1} ${c.fileLabel}`}>
            Завантажити відомості
            <input type="file" className={c.fileButton} /></label>
            <Typography variant="h6" className={c.f1} > {currentReport}  </Typography>
            <Button className={c.button} variant="contained" >Перевірити відомість</Button>
            <Button className={c.button} variant="contained" >Роздрукувати форму</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header

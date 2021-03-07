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
const Header = ({currentReport, addReports}) => {
    const c = useStyles();

    function loadReports(files){ 
        let reports = []
        Array.from(files).forEach(async (file) => {
            let data = new FormData()
            data.append('pdfInput', file)

            let requestOptions = {
                mode: 'cors',
                creadentials: 'include',
                method: 'POST',
                body: data
            }
            let report = await fetch("http://localhost:8080/parse", requestOptions).then( r => r.json())
            report.date = {
                day: 1,
                dayError: null,
                month: 'квітня',
                monthError: null, 
                year: 2020,
                yearError: null
            }
            report.eduYear = report.eduYear +''
            console.log(report)
            reports.push(report)
            if(reports.length === files.length)
                addReports(reports)
        } )
        
    }
    
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
            <IconButton edge="start"  className={c.menuButton} aria-label="menu">
            <MenuIcon  />
            </IconButton>
            <label className={`MuiTypography-h6 ${c.f1} ${c.fileLabel}`}>
            Завантажити відомості
            <input id="input" type="file" className={c.fileButton} onChange={(e) => loadReports(e.target.files)} multiple accept=".pdf" /></label>
            <Typography variant="h6" className={c.f1} > {currentReport}  </Typography>
            <Button className={c.button} variant="contained" >Перевірити відомість</Button>
            <Button className={c.button} variant="contained" >Зберегти PDF</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header

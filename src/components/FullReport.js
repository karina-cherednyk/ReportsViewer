import Report from './Report'
import {Paper } from '@material-ui/core'
import GradesTable from './GradesTable'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    body: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        border: `5px solid ${theme.palette.secondary.dark}`,
        textAlign: 'center',
        minHeight: '80vh',
        width: '80vw'
    }

}));

const FullReport = ({ report, reportRowChange, ...tableMethods} ) => {
    const c = useStyles()
    return (
        <Paper elevation={5} className={c.body}>
        <Report report={report} reportRowChange={reportRowChange} />
        <GradesTable  report={report} {...tableMethods} />
        </Paper>
    )
}

export default FullReport
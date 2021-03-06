import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Paper, Typography } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import GradesTable from './GradesTable';


const useStyles = makeStyles((theme) => ({
    body: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        border: `5px solid ${theme.palette.secondary.dark}`,
        textAlign: 'center'
    }

}));

const monthes = [
  'грудня', 'січня', 'лютого', 
  'березня', 'квітня', 'травня',
  'червня', 'липня', 'серпня'
]

const createOptions = ({ label, value, opt }) => {
    return (
        <Autocomplete
        value={value}
        key={`opt-${++count}`}
        options={opt}
        style={{padding: 3, width: "12em"}}
        renderInput={(params) => <TextField {...params} margin='dense' label={label} variant="outlined" />}
        />
    )
}

const row = (elems) => <Box key={`row-${++count}`} display="flex"  flexDirection="row">{elems}</Box>
const label = (text) => <Typography variant="h5"  key={++count} > {text} </Typography>
const tf = (text, defVal, other={}) =>  
  <TextField  key={`tf-${++count}`} defaultValue={defVal}
   margin="dense" style={{padding: 3}} 
   label={text} variant="outlined" {...other} />

let count = 0;


const Report = ({ 
        report,
        ...tableMethods
       }) => {
    const c = useStyles()
    return (
        <Paper elevation={5} className={c.body}>
          { label("НАЦІОНАЛЬНИЙ УНІВЕРСИТЕТ “КИЄВО-МОГИЛЯНСЬКА АКАДЕМІЯ”") }
          { label(`ЗАЛІКОВО-ЕКЗАМЕНАЦІЙНА ВІДОМІСТЬ № ${report.sheetCode}`)  }
          { row([ createOptions({ label: "Освітній рівень", value: report.okr, opt: ['Бакалавр', 'Магістр'] })]) }
          {
          row([
                createOptions({ label: "Факультет", value: report.faculty, opt: ['інформатики', 'фізики'] }),
                createOptions({ label: "Рік навчання", value: report.eduYear, opt: ['1', '2', '3', '4', '5', '6'] }) ,
                tf('Група', report.group)
          ])
          }
          { row( [ tf("Дисципліна", report.subject)] ) }
          {
          row([
                createOptions({ label: "Семестр", value: report.term, opt: ['1', '2', '3', '4', '4д'] }),
                tf('Залікові бали', report.creditPoints, {type:'number'})
          ]) 
         }
          {
          row([
                createOptions({ label: "Форма контролю", value: report.controlForm, opt: ['залік', 'іспит','екзамен'] }),
                row([
                      tf('День', report.date.day, {type: 'number' }),
                      createOptions({label: "Місяць", value: report.date.month, opt: monthes }), 
                      tf('Рік', report.date.year, { type: 'number' })
                ])
          ])
        } 
        { 
        row([
          tf('Прізвище, ім’я, по батькові екзаменатора', report.teacherName, {fullWidth: true}),
          tf('Вчене звання', report.teacherRank.join(', '),  { fullWidth: true})
        ])
        }  
        <GradesTable  report={report} {...tableMethods} />

        </Paper>
    )
}

export default Report

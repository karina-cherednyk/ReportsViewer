import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Paper, Typography } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import GradesTable from './GradesTable';


const useStyles = makeStyles((theme) => ({
    body: {
        margin: theme.spacing(5),
        padding: theme.spacing(5),
        border: `5px solid ${theme.palette.secondary.dark}`,
        textAlign: 'center'
    }

}));

const monthes = [
  'грудня', 'січня', 'лютого', 
  'березня', 'квітня', 'травня',
  'червня', 'липня', 'серпня'
]

const createOptions = ({ label, opt }) => {
    return (
        <Autocomplete
        key={`opt-${++count}`}
        options={opt}
        style={{padding: 3, width: "12em"}}
        renderInput={(params) => <TextField {...params} margin='dense' label={label} variant="outlined" />}
        />
    )
}

const row = (elems) => <Box key={`row-${++count}`} display="flex"  flexDirection="row">{elems}</Box>
const label = (text) => <Typography variant="h5"  key={++count} > {text} </Typography>
const tf = (text, other={}) =>  
  <TextField  key={`tf-${++count}`} margin="dense" style={{padding: 3}} 
   label={text} variant="outlined" {...other} />

let count = 0;


const Report = ({ report }) => {
    const c = useStyles()
    return (
        <Paper elevation={5} className={c.body}>
          { label("НАЦІОНАЛЬНИЙ УНІВЕРСИТЕТ “КИЄВО-МОГИЛЯНСЬКА АКАДЕМІЯ”") }
          { label("ЗАЛІКОВО-ЕКЗАМЕНАЦІЙНА ВІДОМІСТЬ №")  }
          { row([ createOptions({ label: "Освітній рівень", opt: ['Бакалавр', 'Магістр'] })]) }
          {
          row([
                createOptions({ label: "Факультет", opt: ['Інформатики', 'Фізики'] }),
                createOptions({ label: "Рік навчання", opt: ['1', '2', '3', '4', '5', '6'] }) ,
                tf('Група')
          ])
          }
          { row( [ tf("Дисципліна")] ) }
          {
          row([
                createOptions({ label: "Семестр", opt: ['1', '2', '3', '4'] }),
                tf('Залікові бали', {type:'number'})
          ]) 
         }
          {
          row([
                createOptions({ label: "Форма контрлю", opt: ['залік', 'іспит'] }),
                row([
                      tf('День', {type: 'number' }),
                      createOptions({label: "Місяць", opt: monthes }), 
                      tf('Рік', { type: 'number' })
                ])
          ])
        } 
        { 
        row([
          tf('Прізвище, ім’я, по батькові екзаменатора', {fullWidth: true}),
          tf('Вчене звання', { fullWidth: true})
        ])
        }  
        <GradesTable  report={report} />

        </Paper>
    )
}

export default Report

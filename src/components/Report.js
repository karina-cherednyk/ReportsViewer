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

const row = (elems) => <Box key={`row-${++count}`} display="flex"  flexDirection="row">{elems}</Box>

const createComponent = (report, {type, label, valueFrom,  model, other}) => {
  if(type === 'label') 
    return <Typography 
           variant="h5"  
           key={++count} 
           {...other}> {label} </Typography>

  if(type === 'input')
    return <TextField 
           defaultValue={report[valueFrom]} 
           key={++count}
           label={label} 
           margin="dense" style={{padding: 3}} 
           {...other} />

  if(type === 'options')
        return (
          <Autocomplete
          value={report[valueFrom]}
          key={++count}
          options={model}
          style={{padding: 3, width: "12em"}}
          {...other}
          renderInput={(params) => <TextField {...params} margin='dense' label={label} variant="outlined" />}
          />
      )
}
const createSchema = (report, x) => {
  if(Array.isArray(x)){
    const children = x.map( y => createSchema(report, y))
    return row(children)
  }
  else return createComponent(report, x)
}
let count = 0;

const schema = require('./reportHeader.json')

const Report = ({ 
        report,
        ...tableMethods
       }) => {
    const c = useStyles()
    return (
        <Paper elevation={5} className={c.body}>
        { createSchema(report, schema) }  
        <GradesTable  report={report} {...tableMethods} />

        </Paper>
    )
}

export default Report

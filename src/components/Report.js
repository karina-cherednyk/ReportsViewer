import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { OutlinedInput, FormControl, FormHelperText, TextField, Paper, Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import GradesTable from './GradesTable'

const useStyles = makeStyles((theme) => ({
    body: {
        margin: theme.spacing(5),
        padding: theme.spacing(5),
        border: `5px solid ${theme.palette.secondary.dark}`,
        textAlign: 'center',


    }

}));


const createOptions = ({ label, opt }) => {
    return (
        <Autocomplete
        style={{flexGrow: 1, padding: 3}}
        options={opt}
        renderInput={(params) => <TextField {...params} margin='dense' label={label} variant="outlined" />}
        />
    )
}

const row = (elems, maxSize=12) => {
    let size = elems.length;
    let w =  Math.floor(maxSize / size);
    let rows = [];
    for(let elem of elems){
        rows.push(
            <Grid container item xs={w}> {elem} </Grid>
        )
    }
    return (
        <Grid container item direction="row" xs={maxSize} >{elems}</Grid>
    );
}


const headers = [
    {
      name: "N",
      prop: "ordinal"
    },
    {
      name: "pib",
      prop: "name"
    },
    {
      name: "N zalikovoi knygi",
      prop: "bookNo"
    },
    {
      name: "Robota v trymi",
      prop: "termGrade"
    },
    {
      name: "Za tezu / zalik/ ekzamen",
      prop: "examGrade"
    },
    {
      name: "Razom",
      prop: "sum"
    },
    {
      name: "National grade",
      prop: "nationalGrade"
    },
    {
      name: "ECTS grade",
      prop: "ectsGrade"
    }
  ]


const Report = ({ data}) => {
    const c = useStyles()
    return (
        <Paper elevation={5} className={c.body}>
            <Typography variant="h5" > National University </Typography>
            <Typography variant="h5" > Zalikovo ekzamenatsiyna vidomist </Typography>
            <div style={{ textAlign: "left"}} >
            { createOptions({ label: "Education level", opt: ['Bakalavr', 'Magistr'] }) }
            {
            row([
                 createOptions({ label: "Faculty", opt: ['Informatixs', 'Physics'] }),
                 createOptions({ label: "Faculty", opt: ['Informatixs', 'Physics'] }),
                 createOptions({ label: "Year", opt: ['1', '2', '3', '4'] }) 
            ])
            }
            { createOptions({ label: "Dysciplina", opt: ['Math', 'Chemistry'] }) }
            {
            row([
                 createOptions({ label: "Semestr", opt: ['1', '2'] }),
                 createOptions({ label: "Zalikovi bali", opt: ['1', '2', '3'] })
            ])
            }
            {
            row([
                 createOptions({ label: "Forma kontrolu", opt: ['zalik', 'ispyt'] }),
                 row([
                     <TextField
                        label="Day"
                        type="number"
                        />,
                    createOptions({label: "month", opt: ['jan', 'feb']}), 
                    <TextField
                        label="Year"
                        type="number"
                        />
                 ], 8)
            ])
            }
            </div>
            
            <FormControl variant="outlined">
            <OutlinedInput
                id="filled-adornment-weight"
                aria-describedby="filled-weight-helper-text"
            />
            <FormHelperText id="filled-weight-helper-text">Weight</FormHelperText>
            </FormControl>
            <GradesTable headers={headers} data={data} />
        </Paper>
    )
}

export default Report

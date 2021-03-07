import { Table, TableBody, TableHead, TableCell, TableRow, TextField, Typography } from '@material-ui/core';
import  EditIcon  from '@material-ui/icons/Edit'
import  CheckIcon  from '@material-ui/icons/Check'


const row = ({x,i,headers, report, startEditRow, stopEditRow, editData, studentRowChange}) => {
    const editing = editData && editData.row === i && editData.fileName === report.fileName

    return (
        <TableRow key={`tr-${i}`}>
        { headers.map((y,k) => 
            <TableCell key={`trc-${k}`}>
                { k !== 0 && editing ?
                (<TextField 
                    name={y.prop}
                    onChange={ e => {
                        studentRowChange(i, y.prop, e.target.value)
                        e.target.style.color='darkolivegreen'
                    }}
                    value={editData.rowData[y.prop]}
                />) :
                    (  <Typography variant="overline" >{ x[y.prop] } </Typography> )
                }
                </TableCell>
        ) }
        <TableCell>
            { editing ? (<CheckIcon onClick={() => stopEditRow()}/>): (<EditIcon onClick={() => startEditRow(i)}/>) }
        </TableCell>
        </TableRow>
    )
}
 

const GradesTable = ({ report, ...editRowUtils} ) => {
    
    const headers = require('./headers.json')

    return (
        <Table>
        <TableHead><TableRow>{
            headers.map((y, k) => 
                <TableCell key={`thc-${k}`}>
                    { y.name }
                </TableCell>
            )
        } 
        </TableRow></TableHead>
        <TableBody>
        { report.data.map((x,i) => row({ x, i, headers, report, ...editRowUtils}) )  }
        </TableBody>
        </Table>
    )
}

        
export default GradesTable

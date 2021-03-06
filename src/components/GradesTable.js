import { Table, TableBody, TableHead, TableCell, TableRow, TextField } from '@material-ui/core';
import  EditIcon  from '@material-ui/icons/Edit'
import  CheckIcon  from '@material-ui/icons/Check'


const row = (x,i,headers, report, startEditing, stopEditing, editData, handleChange) => {
    const editing = editData.row === i && editData.fileName === report.fileName

    return (
        <TableRow key={`tr-${i}`}>
        { headers.map((y,k) => 
            <TableCell key={`trc-${k}`}>
                { editing ?
                (<TextField 
                    name={y.prop}
                    onChange={ e => handleChange(i, y.prop, e)}
                    value={x[y.prop]}
                />) :
                ( x[y.prop] )
                }
                </TableCell>
        ) }
        <TableCell>
            { editing ? (<CheckIcon onClick={() => stopEditing()}/>): (<EditIcon onClick={() => startEditing(i)}/>) }
        </TableCell>
        </TableRow>
    )
}
 
const headers = require('./headers.json')
const GradesTable = ({
            report,
            startEditing,
            stopEditing,
            editData,
            handleChange
        }) => {
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
        { report.data.map((x,i) => row(x, i, headers, report, startEditing, stopEditing, editData, handleChange) )  }
        </TableBody>
        </Table>
    )
}

        
export default GradesTable

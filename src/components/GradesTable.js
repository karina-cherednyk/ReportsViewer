import { Table, TableBody, 
    TableHead, TableCell, TableRow } from '@material-ui/core';




const row = (x,i,headers) => 
    <TableRow key={`tr-${i}`}>
    { headers.map((y,k) => 
        <TableCell key={`trc-${k}`}>{x[y.prop]}</TableCell>
    ) }
    </TableRow>
 
const headers = require('./headers.json')
const GradesTable = ({report}) => {
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
        { report.data.map((x,i) => row(x, i, headers) )  }
        </TableBody>
        </Table>
    )
}

        
export default GradesTable

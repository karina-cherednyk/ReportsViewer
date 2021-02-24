import { Table, TableBody, 
    TableHead, TableCell, TableRow } from '@material-ui/core';


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

const row = (x,i,headers) => 
    <TableRow key={`tr-${i}`}>
    { headers.map((y,k) => 
        <TableCell key={`trc-${k}`}>{x[y.prop]}</TableCell>
    ) }
    </TableRow>
 
const data = [] 

const GradesTable = () => {
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
        { data.map((x,i) => row(x, i, headers) )  }
        </TableBody>
        </Table>
    )
}

        
export default GradesTable

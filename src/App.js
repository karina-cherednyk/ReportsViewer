import './App.css'
import Header from './components/Header'
import VerticalTab from './components/VerticalTab'
import { useState } from 'react'

function App() {
  const [reports, setReports] = useState([])
  const [currentReportName, setCurrentReportName] = useState("")
  const [editData, setEditData] = useState({})

  function addReports(newreports) {
    const prevLen = reports.length
    console.log(newreports)
    setReports([...reports, ...newreports])
    if(prevLen === 0)
      setCurrentReportName(newreports[0].fileName)
  }

  function startEditRow(row) {
    const editRowData =  reports
                          .find(r => r.fileName === currentReportName)
                          .data[row]

    setEditData({
      row: row, 
      fileName:currentReportName,
      rowData: editRowData
    })
  }


  function stopEditRow(){
    if(editData === {}) return 
    if(editData.fileName !== currentReportName){
      setEditData({})
      return 
    }
    const res = reports.map( r => r.fileName !== currentReportName ? r : {
      ...r, 
      data: r.data.map( (rowVals, rowI) => rowI !== editData.row ? rowVals : editData.rowData)
    })
    
    setReports(res)
    setEditData({})
  }



  function studentRowChange(row, col, val){
    setEditData({
      ...editData,
      rowData: { ...editData.rowData, [col]: val } 
    })
  }

  function reportRowChange(label, val){
    const res = reports.map( r => r.fileName !== currentReportName ? r : {
      ...r, 
      [label]:val
    })
    
    setReports(res)
  }


  return (
    <div className="App">
      <Header 
          currentReport={currentReportName} 
          addReports={addReports}
          />
      <VerticalTab 
          reports={reports} 
          currentReportName={currentReportName} 
          {
            ...{ reportRowChange, setCurrentReportName, startEditRow, stopEditRow, editData, studentRowChange }
          }
          
          />
    </div>
    
  );
}

export default App;

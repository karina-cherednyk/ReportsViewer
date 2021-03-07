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


  function startEditing(row) {
    setEditData({row: row, fileName:currentReportName})
  }
  function stopEditing(){
    setEditData({})
  }
  function handleChange(row, col, e){
    const { value } = e.target 
    const res = reports.map( r => r.fileName !== currentReportName ? r : {
      ...r, data: r.data.map( (rowVals, rowI) => rowI !== row ? rowVals : {
        ...rowVals, [col]:value
      })
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
          setCurrentReportName={setCurrentReportName}
          startEditing={startEditing}
          stopEditing={stopEditing}
          editData={editData}
          handleChange={handleChange}
          
          />
    </div>
    
  );
}

export default App;

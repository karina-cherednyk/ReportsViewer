import './App.css'
import Header from './components/Header'
import VerticalTab from './components/VerticalTab'
import { useState } from 'react'

function App() {
  const [reports, setReports] = useState([])
  const [currentReport, setCurrentReport] = useState({})
  const [editData, setEditData] = useState({})

  function addReports(newreports) {
    const prevLen = reports.length
    setReports([...reports, ...newreports])
    if(prevLen === 0)
      setCurrentReport(newreports[0])
  }


  function startEditing(row) {
    setEditData({row: row, fileName:currentReport.fileName})
  }
  function stopEditing(){
    setEditData({})
  }
  function handleChange(row, col, e){
    const { value } = e.target 
    console.log('row '+row+', col '+col+', val '+value)
    console.log(currentReport)
    setCurrentReport({
      ...currentReport,
      data: currentReport.data.map( (rowVals, i) => 
          (i === row ? {...rowVals, [col]: value }: rowVals )
        )
    })
  }

  return (
    <div className="App">
      <Header 
          currentReport={currentReport.fileName} 
          addReports={addReports}
          />
      <VerticalTab 
          reports={reports} 
          currentReport={currentReport} 
          setCurrentReport={setCurrentReport}
          startEditing={startEditing}
          stopEditing={stopEditing}
          editData={editData}
          handleChange={handleChange}
          
          />
    </div>
    
  );
}

export default App;

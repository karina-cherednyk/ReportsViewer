import './App.css'
import Header from './components/Header'
import VerticalTab from './components/VerticalTab'
import { useState } from 'react'

function App() {
  const [reports, setReports] = useState([])
  const [currentReport, setCurrentReport] = useState({})

  function addReports(newreports) {
    const prevLen = reports.length
    setReports([...reports, ...newreports])
    if(prevLen === 0)
      setCurrentReport(newreports[0])

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
          setCurrentReport={setCurrentReport}/>
    </div>
    
  );
}

export default App;

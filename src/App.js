import './App.css'
import Header from './components/Header'
import VerticalTab from './components/VerticalTab'
import { useState, useEffect } from 'react'

function App() {
  const [reports, setReports] = useState([])
  const [currentReport, setCurrentReport] = useState({})

  useEffect(() => {
    const getReports = () => {
        const data = require('./data.json')
        setReports(data)
        setCurrentReport(data[0])
      }
    
    getReports()

  }, [])


  const replaceReport = async(reportData) => {
    const res = await fetch('/.data.json')
    const data = await res.json()
    return data
  }

  return (
    <div className="App">
      <Header currentReport={currentReport.fileName} />
      <VerticalTab reports={reports} currentReport={currentReport} setCurrentReport={setCurrentReport}/>
    </div>
    
  );
}

export default App;

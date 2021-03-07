import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FullReport from './FullReport'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));


const TabPanel = ({ child, currentReportName, report, ...other }) => {
  let showContent = currentReportName === report.fileName
  return (
    <div
      role="tabpanel"
      hidden={!showContent}
      id={`tabpanel-${report.fileName}`}
      aria-labelledby={`tab-${report.fileName}`}
      {...other}
    >
      { showContent && (child)}
    </div>
  );
}
TabPanel.propTypes = {
  child: PropTypes.node,
  report: PropTypes.any.isRequired,
  currentReportName: PropTypes.string.isRequired,
};

const VerticalTab = ({
        reports, 
        currentReportName, 
        setCurrentReportName,
        stopEditRow,
        ...reportMethods
      }) => {



  const c = useStyles();

  const handleTabChange = (event, i) => {
    stopEditRow()
    setTabId(i)
    setCurrentReportName(reports[i].fileName);
  };
  const [tabId, setTabId] = React.useState(0);

  return (
    <div className={c.root}>
      <Tabs 
        width="30%"
        orientation="vertical"
        variant="scrollable"
        value={tabId}
        style={{height: 'fit-content'}}
        onChange={handleTabChange}
        scrollButtons="on"
        indicatorColor="primary"
        textColor="secondary"
        >{
           reports.map((x) =>
                <Tab 
                label={x.fileName}      
                key={  `vtab-${x.fileName}`}
                id={`tab-${x.fileName}`}
                aria-controls={`tabpanel-${x.fileName}`}
                />
           ) 
         }</Tabs>
      { 
        reports.map((x,i) => 
          <TabPanel key={`rep-tabpan-${i}`} currentReportName={currentReportName} report={x} 
          child={  <FullReport report={x} stopEditRow={stopEditRow} {...reportMethods} />  } />
        )      
      }

    </div>
  );
}

export default VerticalTab;
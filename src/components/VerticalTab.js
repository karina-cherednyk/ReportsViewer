import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Report from './Report'

function TabPanel(props) {
  const { child, currentReport, report, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={currentReport.fileName !== report.fileName}
      id={`tabpanel-${report.fileName}`}
      aria-labelledby={`tab-${report.fileName}`}
      {...other}
    >
      { currentReport.fileName === report.fileName && (child)}
    </div>
  );
}

TabPanel.propTypes = {
  child: PropTypes.node,
  report: PropTypes.any.isRequired,
  currentReport: PropTypes.any.isRequired,
};

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

const fileTabs = (currentReport, handleTabChange, reports) => {
    let fileComponents = []
    for(let i in reports){
      let fn = reports[i].fileName;
        fileComponents.push(
            <Tab 
            label={fn}      
            key={  `vtab-${fn}`}
            id={`tab-${fn}`}
            aria-controls={`tabpanel-${fn}`}
            />
        )
    }
    return  <Tabs 
                width="30%"
                orientation="vertical"
                variant="scrollable"
                value={0}
                onChange={handleTabChange}
                scrollButtons="on"
                indicatorColor="primary"
                textColor="secondary"
                >{ fileComponents }</Tabs>
}

const VerticalTab = ({
        reports, 
        currentReport, 
        setCurrentReport,
        ...tableMethods
      }) => {
  const classes = useStyles();

  const handleTabChange = (event, i) => {
    setCurrentReport(reports[i]);
  };

  return (
    <div className={classes.root}>
      { fileTabs(currentReport, handleTabChange, reports) }
      { 
        reports.map((x,i) => 
          <TabPanel key={`rep-tabpan-${i}`} currentReport={currentReport} report={x} 
          child={
          <Report report={x} {...tableMethods} />
            } />
        )      
      }

    </div>
  );
}

export default VerticalTab;
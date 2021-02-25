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

const fileTabs = (currentReport, handleChange, reports) => {
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
                width="20%"
                orientation="vertical"
                variant="scrollable"
                value={0}
                onChange={handleChange}
                scrollButtons="on"
                indicatorColor="primary"
                textColor="secondary"
                >{ fileComponents }</Tabs>
}

const addTabPanels = (currentReport, reports) => {
  let reportTabPanels = []
  for(let i in reports){
    reportTabPanels.push(
      <TabPanel key={`rep-tabpan-${i}`} currentReport={currentReport} report={reports[i]} child={<Report report={reports[i]} />} />
    )
  }
  return <> { reportTabPanels } </>
}

const VerticalTab = ({reports, currentReport, setCurrentReport}) => {
  const classes = useStyles();

  const handleChange = (event, i) => {
    setCurrentReport(reports[i]);
  };

  return (
    <div className={classes.root}>
      { fileTabs(currentReport, handleChange, reports) }
      { addTabPanels(currentReport, reports) }
      
    </div>
  );
}

export default VerticalTab;
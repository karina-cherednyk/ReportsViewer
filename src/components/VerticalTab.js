import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Report from './Report'

function TabPanel(props) {
  const { child, value, i, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== i}
      id={`vertical-tabpanel-${i}`}
      aria-labelledby={`vertical-tab-${i}`}
      {...other}
    >
      {value === i && (
        child
      )}
    </div>
  );
}

TabPanel.propTypes = {
  child: PropTypes.node,
  i: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
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

const fileTabs = (value, handleChange, files) => {
    let fileComponents = []
    for(let i in files){
        fileComponents.push(
            <Tab 
            label={files[i]}      
            key={  `vtab-${i}`}
            id={`vertical-tab-${i}`}
            aria-controls={`vertical-tabpanel-${i}`}
            />
        )
    }
    return  <Tabs 
                width="10%"
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                scrollButtons="on"
                indicatorColor="primary"
                textColor="secondary"
                >{ fileComponents }</Tabs>
}

const files = [
    'file1'
]
export default function VerticalTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) =>  setValue(newValue);

  return (
    <div className={classes.root}>
      { fileTabs(value, handleChange, files) }
      <TabPanel  value={value} i={0} child={<Report/>} />
    </div>
  );
}

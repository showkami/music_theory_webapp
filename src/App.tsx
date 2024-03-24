import React, {useState} from 'react';
import ScaleApp from './scale/ScaleApp'
import {Tabs, Tab} from '@mui/material';

type AppType = "Overtone" | "Scale";

const App = () => {
  const [showingApp, setShowingApp] = useState<AppType>("Scale");
  const handleChangeApp = (event: React.SyntheticEvent, newValue: string) => {
    console.log("Event:", event)
    console.log("newValue:", newValue)
    setShowingApp(newValue as AppType);
  };

  const TabContent = () => {
    console.log(showingApp)
    switch (showingApp) {
      case "Overtone":
        return <Overtone />
      case ("Scale"):
        return <ScaleApp />
      default:
        return <></>
    }
  }

  return (
    <>
      <Tabs value={showingApp} onChange={handleChangeApp}>
        <Tab value={"Scale"} label={"Scale"} />
      </Tabs>

      <TabContent />
    </>
  )
}

export default App;
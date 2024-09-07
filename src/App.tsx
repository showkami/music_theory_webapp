import React, {useState} from 'react';
import {Tabs, Tab} from '@mui/material';
import ScaleApp from './scale/ScaleApp';
import OvertoneApp from './overtone/overtone_app'

type AppType = "Overtone" | "Scale";

const App = () => {
  const [showingApp, setShowingApp] = useState<AppType>("Scale");
  const handleChangeApp = (event: React.SyntheticEvent, newValue: string) => {
    setShowingApp(newValue as AppType);
  };

  const TabContent = () => {
    switch (showingApp) {
      case "Overtone":
        return <OvertoneApp />
      case ("Scale"):
        return <ScaleApp />
      default:
        return <></>
    }
  }

  return (
    <>
      <Tabs value={showingApp} onChange={handleChangeApp}>
        <Tab value={"Overtone"} label={"Overtone"} />
        <Tab value={"Scale"} label={"Scale"} />
      </Tabs>

      <TabContent />
    </>
  )
}

export default App;
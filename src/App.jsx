import { AppNavigation } from "./navigation/AppNavigation";
import { StateContextProvider } from "./context";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <StateContextProvider>
        <AppNavigation />
      </StateContextProvider>
      </DndProvider>
    </>
  );
}

export default App;

import { AppNavigation } from "./navigation/AppNavigation";
import { StateContextProvider } from "./context";

function App() {
  return (
    <>
      <StateContextProvider>
        <AppNavigation />
      </StateContextProvider>
    </>
  );
}

export default App;

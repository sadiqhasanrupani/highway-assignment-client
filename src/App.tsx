import { Toaster } from "sonner";
import Router from "./routes";

function App() {
  return (
    <>
      <Router />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;

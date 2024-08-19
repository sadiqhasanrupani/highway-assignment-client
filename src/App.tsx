import { Toaster } from "sonner";
import Router from "./routes";

function App() {
  return (
    <>
      <Router />
      <Toaster richColors />
    </>
  );
}

export default App;

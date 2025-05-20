import { Switch, Route } from "wouter";
import HomePage from "./pages/HomePage";
import NotFound from "@/pages/not-found";
import MolecularMascot from "./components/MolecularMascot";
import { Toaster } from "@/components/ui/toaster";
import { TranslationProvider } from "./contexts/TranslationContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TranslationProvider>
      <Router />
      <MolecularMascot />
      <Toaster />
    </TranslationProvider>
  );
}

export default App;

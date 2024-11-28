import "./App.css";
import { useAuth } from "@frontegg/react";
import SignInTab from "./SignTab";
function App() {
  const { isAuthenticated } = useAuth();
 
  return (
    <div>
      {isAuthenticated && (
        <>
          <SignInTab />
        </>
      )}
    </div>
  );
}

export default App;

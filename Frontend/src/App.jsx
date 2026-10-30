import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/pages/Login";
import RegisterPage from "./features/auth/pages/Register";
import { AuthProvider } from "./features/auth/auth.context";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import { InterviewProvider } from "./features/interview/interview.context";

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route element={<Protected />}>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/interview/:interviewId"
            element={<Interview />}
          />
        </Route>
      </Routes>
      </InterviewProvider>
    </AuthProvider>
  );
}

export default App;

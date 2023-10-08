import './Styles/App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TestQNA from './Components/TestQNA';
import Home from './Pages/LandingPage/Home';
import Login from './Pages/LandingPage/Login';
import Spinner from './Components/ErrorHandling/LoadingScreen'
import MainDrawer from './Components/MainDrawer';
import { QueryClient, QueryClientProvider } from 'react-query';
import TestMcq from './Components/TestMcq';

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
            <Route path="*" element={<h1>404 PAGE NOT FOUND</h1>} />
          </Route>

          <Route path="/dashboard/*" element={<MainDrawer />} />

          <Route path="/loading" element={<Spinner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<TestQNA />} />
          <Route path="/test-mcq/:moduleName/:subjectName/:testType" element={<TestMcq />} />
          <Route path="/test/:moduleName/:subjectName/:testType" element={<TestQNA />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

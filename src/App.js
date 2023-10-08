import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TestQNA from './Components/TestQNA';
// import { cnEntryTest } from './Data/QNA Entry Tests/ALL_ENTRY_TEST';
import Home from './Components/Home';
import Login from './Components/Login';
import Spinner from './Components/Spinner'
import MainDrawer from './Components/MainDrawer';
import { QueryClient, QueryClientProvider } from 'react-query';
<<<<<<< HEAD
import Explore from './Components/Explore';
=======
import TestMcq from './Components/TestMcq';
>>>>>>> origin/first-review

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

          {/* {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/loading" element={<Spinner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/test" element={<TestQNA />} />
          <Route path="/test-mcq/:moduleName/:subjectName/:testType" element={<TestMcq />} />
          <Route path="/test/:moduleName/:subjectName/:testType" element={<TestQNA />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

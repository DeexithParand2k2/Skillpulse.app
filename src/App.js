import './App.css';
import Dashboard from './Components/Dashboard';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TestQNA from './Components/TestQNA';
// import { cnEntryTest } from './Data/QNA Entry Tests/ALL_ENTRY_TEST';
import Home from './Components/Home';
import Login from './Components/Login';
import Spinner from './Components/Spinner'
import MainDrawer from './Components/MainDrawer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}>
          <Route index element={<Home />} />
          <Route path="*" element={<h1>404 PAGE NOT FOUND</h1>} />
        </Route>
        <Route path="/dashboard" element={<MainDrawer />} />
        {/* {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/loading" element={<Spinner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<TestQNA />} />
        <Route path="/test/:moduleName/:subjectName/:testType" element={<TestQNA />} />
      </Routes>
    </Router>
  );
}

export default App;

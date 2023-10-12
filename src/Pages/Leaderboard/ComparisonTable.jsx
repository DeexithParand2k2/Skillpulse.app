import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, Fragment } from "react";
import '../../Styles/App.css'

//name is user2's name
const Row = ({ row, name }) => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <TableRow id="comparisonModalComponent" sx={{ "& > *": { borderBottom: "unset" }, height: '80px' }} onClick={() => setOpen(!open)} >
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row[0][0]}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Subject</TableCell>
                    <TableCell>You</TableCell>
                    <TableCell align="center">{name.split('@')[0]}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.map((entry, index) => (
                    <TableRow key={index} style={{ height: '50px' }}>
                      {/* subject Name */}
                      <TableCell component="th" scope="row">
                        {entry[1]}
                      </TableCell>
                      {/* user1 marks */}
                      <TableCell>{entry[2]}</TableCell>
                      {/* user2 marks */}
                      <TableCell align="center">{entry[3]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};


const ComparisonTable = ({ user1, user2 }) => {
  const func = (moduleType, testType, title, arr, sub, index) => {
    const u1 = user1?.[moduleType]?.[testType]?.[sub]?.["totalMarks"];
    const u2 = user2?.[moduleType]?.[testType]?.[sub]?.["totalMarks"];

    arr[index] = [
      title,
      sub,
      u1 === undefined || u1 === -1 ? "N/A" : u1,
      u2 === undefined || u2 === -1 ? "N/A" : u2,
    ];
  };

  let module2_entry_test = [];
  let module2_exit_test = [];
  const module2_subjects = ["cn", "os", "dbms"];
  module2_subjects.forEach(
    func.bind(
      null,
      "m2",
      "entry_test",
      "MODULE 2 - ENTRY TEST",
      module2_entry_test
    )
  );
  module2_subjects.forEach(
    func.bind(
      null,
      "m2",
      "exit_test",
      "MODULE 2 - EXIT TEST",
      module2_exit_test
    )
  );

  const module1_subjects = ["c/c++", "java", "oops", "dsa"];
  let module1_entry_test = [];
  let module1_exit_test = [];
  module1_subjects.forEach(
    func.bind(
      null,
      "m1",
      "entry_test",
      "MODULE 1 - ENTRY TEST",
      module1_entry_test
    )
  );
  module1_subjects.forEach(
    func.bind(
      null,
      "m1",
      "exit_test",
      "MODULE 1 - EXIT TEST",
      module1_exit_test
    )
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table aria-label="collapsible table" size="small">
          <TableBody>
            <Row row={module1_entry_test} name={user2.name} />
            <Row row={module1_exit_test} name={user2.name} />
            <Row row={module2_entry_test} name={user2.name} />
            <Row row={module2_exit_test} name={user2.name} />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ComparisonTable;

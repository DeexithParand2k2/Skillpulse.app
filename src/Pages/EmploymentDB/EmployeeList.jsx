import EmployeeItem from "./EmployeeItem";

const EmployeeList = ({ seniors }) => {
  
  return (
    <div>
      {
        seniors &&
        seniors.length !== 0 ? (
            seniors.map((d, idx) => (
              <EmployeeItem
                name={d.name}
                eis={d.eis}
                company={d.company}
                ctc={d.ctc}
                key={idx}
              />
            ))
        ) : (
          <p>No seniors data here</p>
        )
      }
    </div>
  );
};

export default EmployeeList;

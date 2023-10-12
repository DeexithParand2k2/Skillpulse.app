import { useEffect, useState } from "react";
import SubjectCardSplitWise from "./SubjectCardSplitWise";

const ModuleAnalysis = ({ testTypeSplitWise, moduleTypeSplitWise, totalMarks }) => {
  const [subjectCards, setSubjectCards] = useState([]);

  useEffect(() => {
    let cardsToRender = [];
    if (testTypeSplitWise === 'entryTest') {
      if (moduleTypeSplitWise === 'm1') {
        cardsToRender = Object.keys(totalMarks.entryTest.m1).map((element) => (
          <SubjectCardSplitWise key={element} singleSubject={totalMarks.entryTest.m1[element]} subjectName={element} />
        ));
      } else {
        cardsToRender = Object.keys(totalMarks.entryTest.m2).map((element) => (
          <SubjectCardSplitWise key={element} singleSubject={totalMarks.entryTest.m2[element]} subjectName={element} />
        ));
      }
    } else {
      if (moduleTypeSplitWise === 'm1') {
        cardsToRender = Object.keys(totalMarks.exitTest.m1).map((element) => (
          <SubjectCardSplitWise key={element} singleSubject={totalMarks.exitTest.m1[element]} subjectName={element} />
        ));
      } else {
        cardsToRender = Object.keys(totalMarks.exitTest.m2).map((element) => (
          <SubjectCardSplitWise key={element} singleSubject={totalMarks.exitTest.m2[element]} subjectName={element} />
        ));
      }
    }
    setSubjectCards(cardsToRender);
  }, [testTypeSplitWise, moduleTypeSplitWise, totalMarks]);

  return (
    <div style={{ minWidth: '200px', minHeight: '100px', display: 'flex', flexDirection: 'column' }}>
      {subjectCards}
    </div>
  );
};

export default ModuleAnalysis;

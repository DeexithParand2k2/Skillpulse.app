import ExploreCard from "./ExploreCard";
import { modules,subjectIconLinks,SubjectContents } from "../Data/ModulesData";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Explore = () =>{

    return(
        <>
            <h1>
            <strong className="font-extrabold text-yellow-700 sm:block ml-72 mt-5 mb-5">
                   Ready to Explore these Technologies?...
            </strong>
            </h1>
            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                <Grid container item spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <ExploreCard head={modules.m1.s1} img={subjectIconLinks['c/c++']} content={SubjectContents['c/c++']} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ExploreCard head={modules.m1.s2} img={subjectIconLinks.java} content={SubjectContents.java} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ExploreCard head={modules.m1.s3} img={subjectIconLinks.oops} content={SubjectContents.oops} />
                </Grid>
                </Grid>
                <Grid container item spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <ExploreCard head={modules.m1.S4} img={subjectIconLinks.dsa} content={SubjectContents.dsa} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ExploreCard head={modules.m2.s1} img={subjectIconLinks.dbms} content={SubjectContents.dbms} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ExploreCard head={modules.m2.s2} img={subjectIconLinks.cn} content={SubjectContents.cn} />
                </Grid>
                </Grid>
                <Grid container item spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <ExploreCard head={modules.m2.s3} img={subjectIconLinks.os} content={SubjectContents.os} />
                </Grid>
                <h1>
                <strong className="font-extrabold sm:block ml-20 mt-40 mb-5">
                   Login / Register to Get Started !!!
                </strong>
                <a
                    className="block w-1/3 text-center rounded-[30px] bg-slate-600 px-8 py-3 text-sm font-medium text-white shadow hover:bg-slate-700 focus:outline-none focus:ring active:bg-slate-500 ml-60"
                    href="/login"
                  >
                    <strong>Get Started</strong>
                  </a>
                </h1>
                </Grid>
            </Grid>
            </Box>
        </>
    );

}
export default Explore
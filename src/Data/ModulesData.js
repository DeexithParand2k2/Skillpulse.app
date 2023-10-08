var modules = {
    m1 : {
        s1 : "C/C++",
        s2 : "JAVA",
        s3 : "OOPS",
        S4 : "DSA"
    },
    m2 : {
        s1 : "DBMS",
        s2 : "CN",
        s3 : "OS"
    }
}


const subjectIconLinks = {
    "c/c++": `/images/cc++.png`,
    "java": `/images/java.png`,
    "oops": `/images/oops.png`,
    "dsa": `/images/dsa.png`,
    "dbms": `/images/dbms.jpg`,
    "cn": `/images/cn.png`,
    "os": `/images/os.png`,
    "entry test": `/images/entrytest.png`,
    "exit test": `/images/exittest.png`,
    "m1":  `/images/mcq.png`,
    "m2":  `/images/theory.png`,
};

const SubjectContents = {
    "c/c++": 'C is a procedural programming language known for its simplicity and efficiency, while C++ is an extension of C that adds object-oriented features, making it a versatile language for developing a wide range of applications.',
    "java": 'Java is a versatile, platform-independent programming language known for its "write once, run anywhere" capability, making it popular for developing cross-platform applications.',
    "oops": 'Object-Oriented Programming (OOP) is a programming paradigm that organizes code into reusable and self-contained objects, each representing a real-world entity with data and behavior.',
    "dsa": 'Data Structures and Algorithms (DSA) are fundamental concepts in computer science that involve organizing and processing data efficiently to solve complex problems.Proficiency in DSA is crucial for solving a wide range of computational problems.',
    "dbms": 'A Database Management System (DBMS) is software that facilitates the creation, management, and manipulation of databases, enabling efficient storage and retrieval of data.',
    "cn": 'Computer Networking (CN) is the field of study and practice that involves the interconnection of multiple computing devices to enable data communication and resource sharing.',
    "os": 'An Operating System (OS) is software that manages computer hardware, software resources, and provides essential services for user programs, such as task scheduling and file management.'
}


export {modules, subjectIconLinks, SubjectContents}
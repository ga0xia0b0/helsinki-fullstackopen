import React from "react";

const Header = ({ course }) =>
    <h2>{course.name}</h2>

const Part = ({ part }) => (
    < >
        <td>{part.name}</td>
        <td>{part.exercises}</td>
    </ >
)

const Content = ({ course }) => {
    const alter = course.parts.map(elem => elem.exercises)
    const total = alter.reduce((previous, current) => previous + current)
    const partItems = course.parts.map(
        elem => 
        <tr key={elem.id}><Part part={elem}></Part></tr>
    )

    return (
        <>
            <table>
                <tbody>
                    {partItems}
                </tbody>
            </table>
            <p>  <b>total of {total} exercises</b></p>
        </>
    )
}

const Course = ({ course }) => {

    return (
        <div>
            <Header course={course}></Header>
            <Content course={course}></Content>
        </div>
    )
}
export default Course
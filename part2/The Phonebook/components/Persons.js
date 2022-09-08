import React from "react";

const Persons = ({persons,filter}) => (
    <>
        {persons.map(person=>{
        if(person.name.toUpperCase().indexOf(filter.toUpperCase())!==-1)
        return <>{person.name} {person.number}<br /></>
        else return <></>
        })}
    </>
)

export default Persons
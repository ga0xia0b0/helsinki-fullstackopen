const Persons = ({ props }) => (
    props.persons.map(
        person => {
            if (person.name.toUpperCase().indexOf(props.filter.toUpperCase()) !== -1)
                return (
                    <p key={person.id}>
                        {person.name} {person.number}
                        <button onClick={()=>{props.delPerson(person.name)}}>
                            delete
                        </button>
                    </p>
                )
            else return (
                <p key={person.id}></p>
            )
        }
    )
)

export default Persons
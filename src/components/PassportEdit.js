import { useState } from "react";

function PassportEdit({ person, onEdit, onSubmit }) {

    const [name, setName] = useState(person.name)
    const [surname, setSurname] = useState(person.surname)

    const handleChange = (e) => {
        setName(e.target.value)
        setSurname(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit(person.id, name,surname);
        onSubmit();
    }
    return (
        <form onSubmit={handleSubmit} className="edit-form">
            <input onChange={handleChange} />
            <button>Save</button>
        </form>
    )
}
export default PassportEdit;
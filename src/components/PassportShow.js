import { useState } from "react";
import PassportEdit from './PassportEdit';

function PassportShow({ person, onDelete,onEdit }) {
    const [showEdit, setShowEdit] = useState(false);

    const handleDeleteClick = () => {
        onDelete(person.id);
    }
    const handleEditClick = () => {
        setShowEdit(!showEdit)
    }

    const handleSubmit =()=>{
        setShowEdit(false)
    }
    let content = <p>{person.name}</p>
    let surname = <p>{person.surname}</p>
    let fathername = <p>{person.fathername}</p>
    if (showEdit) {
        content = <PassportEdit onSubmit={handleSubmit} onEdit={onEdit} person={person} />
        surname = <PassportEdit onSubmit={handleSubmit} onEdit={onEdit} person={person} />
        fathername = <PassportEdit onSubmit={handleSubmit} onEdit={onEdit} person={person} />
    }

    return (
        <div className="person-data">
            <div>
                <span>Ad:</span>
                {content}
            </div>
            <div>
                <span>Soyad:</span>
                {/* {person.surname} */}
                {surname}
            </div>
            <div>
                <span>Ata adı:</span>
                {fathername}
            </div>
            <div>
                <span>Doğum tarixi:</span>
                {person.birthdate}
            </div>
            <div>
                <span>Cins:</span>
                {person.cins}
            </div>
            <div>
                <button className="delete-button" onClick={handleEditClick}>
                Edit
                </button>
                <button className="delete-button" onClick={handleDeleteClick}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default PassportShow;
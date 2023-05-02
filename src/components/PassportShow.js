import { useState } from "react";
import PassportEdit from './PassportEdit';

function PassportShow({ person, onDelete, onEdit }) {
    const [showEdit, setShowEdit] = useState(false);

    const handleDeleteClick = () => {
        onDelete(person.id);
    }
    const handleEditClick = () => {
        setShowEdit(!showEdit)
    }

    return (
        <>
            {showEdit ?

                <div className="data-container">
                    <PassportEdit onEdit={onEdit} person={person} setShowEdit={setShowEdit} />
                </div>
                :

                <div className="list-container">

                    <div className="image">
                        <img
                            alt="books"
                            src={`https://picsum.photos/seed/${person.id}/200/150`}
                        />
                    </div>


                    <div className="data-container">

                        <div className="data-box">
                            <label>Ad:</label>
                            <p>{person.name}</p>
                        </div>

                        <div className="data-box">
                            <label>Soyad:</label>
                            <p>{person.surname}</p>
                        </div>

                        <div className="data-box">
                            <label>Ata adı:</label>
                            <p>{person.fathername}</p>
                        </div>

                        <div className="data-box">
                            <label>Doğum tarixi:</label>
                            <p>{person.birthdate}</p>
                        </div>

                        <div className="data-box">
                            <label>Cins:</label>
                            <p>{person.cins}</p>
                        </div>

                    </div>


                    <div className="edit-delete">
                        <button className="edit-button" onClick={handleEditClick}>
                            Edit
                        </button>
                        <button className="delete-button" onClick={handleDeleteClick}>
                            Delete
                        </button>
                    </div>
                </div>
            }
        </>

    )
}

export default PassportShow;
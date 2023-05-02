import { useState } from "react";

function PassportEdit({ person, onEdit, setShowEdit }) {

    const [name, setName] = useState(person.name)
    const [surname, setSurname] = useState(person.surname)
    const [fathername, setFathername] = useState(person.fathername)
    const [birthdate, setBirthdate] = useState(person.birthdate)
    const [cins, setCins] = useState(person.cins)


    const handleSubmit = (e) => {
        e.preventDefault();
        onEdit(person.id, name, surname, fathername, birthdate, cins);
        setShowEdit(false);
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="data-box">
                <label className="label">Ad:</label>
                <input
                    className="input is-capitalized"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="data-box">
                <label>Soyad:</label>
                <input
                    className="input is-capitalized"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)} />
            </div>

            <div className="data-box">
                <label>Ata adı:</label>
                <input
                    className="input is-capitalized"
                    value={fathername}
                    onChange={(e) => setFathername(e.target.value)} />
            </div>

            <div className="data-box">
                <label>Doğum tarixi</label>
                <input
                    className="input is-capitalized"
                    value={birthdate}
                    type="date"
                    onChange={(e) => setBirthdate(e.target.value)} />
            </div>

            <div className="data-box">
                <label>Cins:</label>
                <select
                    className="input is-expanded"
                    name="colors"
                    value={cins}
                    onChange={(e) => { setCins(e.target.value) }}
                >
                    <option value="">Seçin...</option>
                    <option value="Kişi">Kişi</option>
                    <option value="Qadın">Qadın</option>
                </select>
            </div>
            <button className="save-button" type="submit">Save</button>
        </form>

    )
}

export default PassportEdit;
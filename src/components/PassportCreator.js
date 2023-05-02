import { useState } from "react";

function PassportCreator({ onCreate }) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [fathername, setFathername] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [cins, setCins] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(name, surname, fathername, birthdate, cins)
        setName('')
        setSurname('')
        setFathername('')
        setBirthdate('')
        setCins('')
    }
    return (
        <div className="passport panel">
            <h4 className="title is-3">Add Passport</h4>
            <form onSubmit={handleSubmit}>
                <div className="field-group">
                    <div className="field">
                        <label className="label">Ad</label>
                        <input
                            className="input is-expanded is-capitalized	"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} />
                    </div>
                </div>
                <div className="field-group">
                    <div className="field">
                        <label className="label">Soyad</label>
                        <input
                            className="input is-expanded is-capitalized	"
                            value={surname}
                            onChange={(e) => { setSurname(e.target.value) }} />
                    </div>
                </div>
                <div className="field-group">
                    <div className="field">
                        <label className="label">Ata adı</label>
                        <input
                            className="input is-expanded is-capitalized	"
                            value={fathername}
                            onChange={(e) => { setFathername(e.target.value) }} />
                    </div>
                </div>
                <div className="field-group">
                    <div className="field">
                        <label className="label">Doğum tarixi</label>
                        <input
                            className="input is-expanded "
                            value={birthdate}
                            type="date" onChange={(e) => { setBirthdate(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="field-group">
                    <div className="field">
                        <label className="label">Cins</label>
                        <select
                            className="input is-expanded"
                            name="colors"
                            value={cins}
                            onChange={(e) => { setCins(e.target.value) }}
                        >
                            <option value="">Seçin...</option>
                            <option value="kisi">Kişi</option>
                            <option value="qadın">Qadın</option>
                        </select>
                    </div>
                </div>
                <div className="field">
                    <button className="button is-link">Create !</button>
                </div>
            </form>
        </div>

    )
}
export default PassportCreator;
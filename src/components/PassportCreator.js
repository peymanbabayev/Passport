import { useState } from "react";

function PassportCreator({ onCreate }) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [fathername, setFathername] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [cins, setCins] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(name, surname, fathername,birthdate,cins)
        setName('')
        setSurname('')
        setFathername('')
        setBirthdate('')
        setCins('')
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input value={name} onChange={(e) => { setName(e.target.value) }} />

                <label>Surname</label>
                <input value={surname} onChange={(e) => { setSurname(e.target.value) }} />

                <label>Father Name</label>
                <input value={fathername} onChange={(e) => { setFathername(e.target.value) }} />

                <label>Birth date</label>
                <input value={birthdate} type="date" onChange={(e) => { setBirthdate(e.target.value) }} />

                <label>Cins</label>
                <input value={cins} onChange={(e) => { setCins(e.target.value) }} />

                <button className="create-button">Create !</button>
            </form>
        </div>

    )
}
export default PassportCreator;
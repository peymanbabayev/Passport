import { useState } from "react";
import PassportCreator from "./components/PassportCreator";
import PassportList from "./components/PassportList"

function App() {

  const [personinfo, setPersoninfo] = useState([]);

  const editPersonById = (id, newName, newSurname) => {
    const updatedInfo = personinfo.map((person) => {
      if (person.id === id) {
        return { ...person, name: newName, surname: newSurname };
      }
      return person;
    });
    setPersoninfo(updatedInfo)
  }

  const deletePerson = (id) => {
    const updatedInfo = personinfo.filter((person) => {
      return person.id !== id;
    });
    setPersoninfo(updatedInfo)
  }

  const createInfo = (name, surname, fathername, birthdate, cins) => {
    const updatedInfo = [
      ...personinfo,
      {
        id: Math.round(Math.random() * 9999),
        name,
        surname,
        fathername,
        birthdate,
        cins
      }
    ];
    setPersoninfo(updatedInfo)
  }

  return (
    <div>
      <PassportCreator onCreate={createInfo} />
      <div>
        <PassportList onEdit={editPersonById} personinfo={personinfo} onDelete={deletePerson} />
      </div>
    </div>
  );
}

export default App;

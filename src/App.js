import { useState } from "react";
import PassportCreator from "./components/PassportCreator";
import PassportList from "./components/PassportList"
import PassportSearch from "./components/PassportSearch";

function App() {
  const [personinfo, setPersoninfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const editPersonById = (id, newName, newSurname, newFathername, newBirthdate, newCins) => {
    const updatedInfo = personinfo.map((person) => {
      if (person.id === id) {
        return { ...person, name: newName, surname: newSurname, fathername: newFathername, birthdate: newBirthdate, cins: newCins };
      }
      return person;
    });
    setPersoninfo(updatedInfo);
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
        id: Math.random() * 9999,
        name,
        surname,
        fathername,
        birthdate,
        cins
      }
    ];
    setPersoninfo(updatedInfo);
  }

  const renderPersons = () => {
    if (searchTerm === "") {
      return personinfo;
    }

    const searchedPersons = personinfo.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  })
    return searchedPersons;
  }

  return (
    <div className="container is-fluid">
      <PassportCreator onCreate={createInfo} />
      <PassportSearch  searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PassportList onEdit={editPersonById} personinfo={renderPersons()} onDelete={deletePerson} />
    </div>
  );
}

export default App;


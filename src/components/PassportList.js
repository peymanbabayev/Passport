import PassportShow from './PassportShow';

function PassportList({ personinfo, onDelete,onEdit }) {

    const renderedInfo = personinfo.map((person) => {
        return <PassportShow onEdit={onEdit} onDelete={onDelete} key={person.id} person={person} />
    });

    console.log(personinfo)
    return (
        <div>
            {renderedInfo}
        </div>
    )
}
export default PassportList;
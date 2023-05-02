
function PassportSearch({ searchTerm, setSearchTerm }) {

    return (
        <div className="list-header">
            <h3 className="title is-3">Passport Search</h3>
            <div className="search field is-horizontal">
                <label className="label"> Search</label>
                <input
                    className="input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    )

}
export default PassportSearch;
import PropTypes from 'prop-types';

import PassportForm from './PassportForm';

function PassportCreator({ onCreate }) {
  return (
    <section className="passport panel">
      <h2 className="title is-4">Yeni pasport əlavə et</h2>
      <PassportForm submitLabel="Əlavə et" resetOnSuccess onSubmit={onCreate} />
    </section>
  );
}

PassportCreator.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default PassportCreator;

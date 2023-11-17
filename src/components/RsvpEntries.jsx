import PropTypes from "prop-types";
import RsvpEntry from "components/RsvpEntry";

function RsvpEntries({ rsvps }) {
  const yesRsvps = rsvps.filter((rsvp) => rsvp.content === "yes");
  const maybeRsvps = rsvps.filter((rsvp) => rsvp.content === "maybe");
  const noRsvps = rsvps.filter((rsvp) => rsvp.content === "no");

  const yesPlusOnes = yesRsvps.reduce((acc, rsvp) => {
    const numberOfPlusOnes = rsvp?.tags?.filter(
      (tag) => tag[0] === "joined_by"
    );
    if (numberOfPlusOnes.length > 0) {
      acc += parseInt(numberOfPlusOnes[0][1]);
    }
    return acc;
  }, 0);

  const maybePlusOnes = maybeRsvps.reduce((acc, rsvp) => {
    const numberOfPlusOnes = rsvp?.tags?.filter(
      (tag) => tag[0] === "joined_by"
    );
    if (numberOfPlusOnes.length > 0) {
      acc += parseInt(numberOfPlusOnes[0][1]);
    }
    return acc;
  }, 0);

  const noPlusOnes = noRsvps.reduce((acc, rsvp) => {
    const numberOfPlusOnes = rsvp?.tags?.filter(
      (tag) => tag[0] === "joined_by"
    );
    if (numberOfPlusOnes.length > 0) {
      acc += parseInt(numberOfPlusOnes[0][1]);
    }
    return acc;
  }, 0);

  return (
    <div className="card">
      <h1 className="mb-4">
        <span className="font-bold">🧑🏽‍🤝‍🧑🏻 Participantes</span> (
        <span className="text-green-500">{yesRsvps.length + yesPlusOnes}</span>/
        <span className="text-yellow-500">
          {maybeRsvps.length + maybePlusOnes}
        </span>
        /<span className="text-red-500">{noRsvps.length + noPlusOnes}</span>)
      </h1>
      <hr className="my-4" />
      <div className="flex flex-col gap-2">
        <ul className="flex flex-wrap gap-2">
          {yesRsvps.map((rsvp) => (
            <RsvpEntry key={rsvp.id} message={rsvp} />
          ))}
        </ul>
        <ul className="flex flex-wrap gap-2">
          {maybeRsvps.map((rsvp) => (
            <RsvpEntry key={rsvp.id} message={rsvp} />
          ))}
        </ul>
        <ul className="flex flex-wrap gap-2">
          {noRsvps.map((rsvp) => (
            <RsvpEntry key={rsvp.id} message={rsvp} />
          ))}
        </ul>
      </div>
    </div>
  );
}

RsvpEntry.propTypes = {
  rsvps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      pubkey: PropTypes.string.isRequired,
      created_at: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RsvpEntries;

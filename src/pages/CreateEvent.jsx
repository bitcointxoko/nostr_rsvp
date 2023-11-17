import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useNostr } from "nostr-react";
import { createEvent, updateUserProfileIfNameChanged } from "helpers/actions";

export default function CreateEvent() {
  const { publish } = useNostr();
  const navigate = useNavigate();

  const { setEvents, user, setUser, username, setUsername } =
    useOutletContext();

  const [event, setEvent] = useState({
    name: "",
    description: "",
    start: "",
    end: "",
    location: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    // make sure that user profile is up to date
    updateUserProfileIfNameChanged({
      name: username,
      user,
      setUser,
      publish,
    });

    // we add the event on nostr
    const createdEvent = await createEvent({
      data: event,
      publish,
      publicKey: user.publicKey,
      privateKey: user.privateKey,
    });

    setEvents((prev) => [...prev, createdEvent]);

    navigate(`/${createdEvent.id}`);
  };

  // only update the react date when its valid
  const handleDateChange = (e, type) => {
    if (!e.target["validity"].valid) return;

    setEvent((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  };

  return (
    <div className="mt-8 mb-8 border-b md:mt-16 md:mb-16">
      <h1 className="px-4 mb-4 font-serif text-3xl font-bold md:text-5xl text-sky-700">
        ¿Visitantes sorpresa? <br />
        ¡Sólo si traen pizza!
      </h1>
      <p className="max-w-xl px-5 mb-4 text-lg text-gray-700">
        Una sencilla solución de RSVP para recibir las confirmaciones de tus eventos y
        saber quién va a venir.
      </p>
      <strong className="block px-4 pt-4 pb-2 font-serif text-xl text-gray-700">
        Crea tu primer Evento:
      </strong>
      <form
        className="flex flex-col grid-cols-3 gap-2 md:grid card"
        onSubmit={submitHandler}>
        <label>Tu nombre:</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="col-span-2 mb-2 input"
          placeholder="Juan Nadie"
          required
        />
        <label>Nombre del evento:</label>
        <input
          onChange={(e) =>
            setEvent((prev) => ({ ...prev, name: e.target.value }))
          }
          value={event.name}
          placeholder="Mi fiesta de cumpleaños"
          className="col-span-2 mb-2 input"
          required
        />
        {/* <label>Event Description:</label>
        <input
          onChange={(e) =>
            setEvent((prev) => ({ ...prev, description: e.target.value }))
          }
          value={event.description}
          className="input"
        /> */}

        <label>Fecha de inicio del evento:</label>
        <input
          type="datetime-local"
          onChange={(e) => handleDateChange(e, "start")}
          className="col-span-2 mb-2 input"
          required
        />

        {/* <label>Event End Date:</label>
        <input
          type="datetime-local"
          onChange={(e) => handleDateChange(e, "end")}
          className="input"
        /> */}

        <label>Lugar del evento:</label>
        <input
          onChange={(e) =>
            setEvent((prev) => ({ ...prev, location: e.target.value }))
          }
          value={event.location}
          className="col-span-2 mb-2 input"
          placeholder="Mi casa"
          required
        />
        <div />
        <small className="col-span-2 pb-2 -mt-2 font-sans md:px-4 text-stone-600">
          Por favor, no compartas información que quieras mantener en privado.
        </small>
        <div className="col-span-2">
          <button className="text-left text-white bg-amber-600 input">
            Crear Evento
          </button>
        </div>
      </form>
    </div>
  );
}

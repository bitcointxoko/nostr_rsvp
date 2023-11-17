import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { getPublicKey, generatePrivateKey } from "nostr-tools";

import { useLocalStorage } from "helpers/hooks";

import DropDown from "./components/DropDown";
import Modal from "./components/Modal";
import Features from "components/Features";

export default function Container() {
  // we store user info + events in local storage
  const [events, setEvents] = useLocalStorage("events", []);
  const [user, setUser] = useLocalStorage("user", null);
  const [username, setUsername] = useLocalStorage("username", "");

  // get location
  const location = useLocation();

  // if somebody wants to use their nostr user, we give the possibility
  const [showNostrSettings, setShowNostrSettings] = useState(false);

  // if there is no user, we automatically generate a new one
  useEffect(() => {
    if (!user || user.privateKey === "" || user.publicKey === "") {
      const privateKey = generatePrivateKey();
      const publicKey = getPublicKey(privateKey);

      setUser({
        name: username,
        publicKey,
        privateKey,
      });
    }
  }, [user, username, setUser]);

  useEffect(() => {
    const standalone = window.navigator.standalone;
    const userAgent = window.navigator.userAgent.toLowerCase();
    const safari = /safari/.test(userAgent);
    const ios = /iphone|ipod|ipad/.test(userAgent);

    if (ios) {
      if (!standalone && safari) {
        // Safari
      } else if (!standalone && !safari) {
        // iOS webview
        if (
          confirm("Para una mejor experiencia, abre el sitio en el navegador.")
        ) {
          window.open(location.href, "_system");
        }
      }
    } else {
      if (userAgent.includes("wv")) {
        // Android webview
        alert("Para una mejor experiencia, abra el sitio en el navegador.");
        window.open(location.href, "_system");
      } else {
        // Chrome
      }
    }
  }, [location]);

  const updateProfileHandler = (e) => {
    e.preventDefault();

    // @todo: check if the keys are valid

    setShowNostrSettings(false);
  };

  const removeEventHandler = (e, event) => {
    e.preventDefault();

    if (!confirm("¿Estás seguro de que deseas eliminar este evento?")) return;

    setEvents((prev) => prev.filter((ee) => ee.id !== event.id));
  };

  const generateHandler = (e) => {
    e.preventDefault();

    if (!confirm("¿Estás seguro de que deseas generar nuevas credenciales?")) return;

    const privateKey = generatePrivateKey();
    const publicKey = getPublicKey(privateKey);

    setUser({
      name: username,
      publicKey,
      privateKey,
    });
  };

  return (
    <div className="w-full">
      <nav className="flex items-center max-w-5xl gap-2 mx-auto mt-4 mb-6">
        <Link
          className="flex items-center pl-4 font-mono text-lg font-bold text-gray-200"
          to="/">
          <img src="/logo-pill.png" className="h-12 mr-2" />
          RSVPlease
        </Link>
        <DropDown
          events={events}
          setNostrOpen={setShowNostrSettings}
          removeEventHandler={removeEventHandler}
        />
      </nav>

      <main className="max-w-5xl mx-auto">
        <div className="">
          <Outlet
            context={{
              events,
              setEvents,
              user,
              setUser,
              username,
              setUsername,
            }}
          />
        </div>
      </main>

      {location.pathname === "/" && <Features />}
      <footer className="max-w-5xl pb-16 mx-auto">
        <p className="px-4 pt-4 italic text-gray-300">
          Esta aplicación se ejecuta en el protocolo nostr, que es un protocolo descentralizado
          y resistente a la censura en Internet. Si deseas
          saber más sobre nostr, visita{" "}
          <a
            href="https://nostr.com"
            className="underline"
            target="_blank"
            rel="noreferrer">
            nostr.com
          </a>
          . Recuerda que lo que compartes es público y todo el mundo puede verlo, así que
          piensa antes de publicar.
        </p>
        <p className="px-4 py-2 italic text-gray-300">
          Hecho por{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className="underline"
            href="https://github.com/flobauer">
            flobauer
          </a>{" "}
          &{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className="underline"
            href="https://github.com/mtsarah">
            mtsarah
          </a>{" "}
          en Viena.{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className="underline"
            href="https://github.com/flobauer/nostr_rsvp">
            Código fuente en Github
          </a>
        </p>
      </footer>
      <Modal open={showNostrSettings} setOpen={setShowNostrSettings}>
        <form
          className="flex flex-col gap-2 font-mono"
          onSubmit={updateProfileHandler}>
          <h1 className="text-lg font-bold">Nostr Settings</h1>
          <p className="font-sans text-sm text-gray-800">
            El protocolo Nostr, abreviatura de "Notes and Other Stuff Transmitted by Relays", es un sistema de comunicación digital sencillo y abierto. Este sistema garantiza que ninguna empresa o servidor controle la conversación, defendiendo la libertad de expresión y asegurándose de que tu capacidad de comunicación no sea fácilmente bloqueada por una sola entidad.
          </p>
          <p className="mb-4 font-sans text-sm text-gray-800">
            Dicho esto, también es transparente, lo que significa que este evento y
            todos los que se unen a él están en algún lugar del protocolo. Si desea
            saber más sobre Nostr, echa un vistazo a{" "}
            <a
              href="https://nostr.com"
              className="text-purple-800 underline"
              target="_blank"
              rel="noreferrer">
              nostr.com
            </a>
            .
          </p>
          <label className="font-bold">Clave Pública</label>
          <input
            className="input"
            value={user?.publicKey}
            onChange={(e) => setUser({ ...user, publicKey: e.target.value })}
          />
          <label className="mt-4 font-bold">Clave Privada</label>
          <input
            type="password"
            className="input"
            value={user?.privateKey}
            onChange={(e) => setUser({ ...user, privateKey: e.target.value })}
          />
          <button className="text-white bg-emerald-600 input">
            Guardar credenciales de Nostr
          </button>
          <button className="text-white bg-emerald-600 input" onClick={generateHandler}>
            Generar nuevas credenciales
          </button>
        </form>
      </Modal>
    </div>
  );
}

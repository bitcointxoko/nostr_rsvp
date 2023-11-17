import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "De uso gratuito.",
    description:
      "La herramienta es de uso gratuito. Puedes crear tantos eventos como quieras e invitar a tanta gente como desees.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "No es necesario registrarse.",
    description:
      "No es necesario registrarse, basta con crear un evento y compartir el enlace con tus amigos. Así podrán confirmar y ver quién viene y quién no.",
    icon: LockClosedIcon,
  },
  {
    name: "Descentralizado y seguro.",
    description:
      "RSVPlease se basa en el protocolo nostr. Esto significa que tus datos se almacenan en una red criptográfica y resistente a la censura. Organizar una fiesta de cumpleaños nunca ha sido tan fácil.",
    icon: ServerIcon,
  },
];

export default function Example() {
  return (
    <div className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-gray-200">
                Planificación del registro de eventos
              </h2>
              <p className="mt-2 text-3xl font-bold font-serif tracking-tight text-amber-500 sm:text-4xl">
                Sepa quién viene.
              </p>
              <p className="mt-6 text-lg leading-6 text-gray-200">
               Hoy en día es difícil planificar un evento. Nunca se sabe quién vendrá o no. Con RSVPlease, puedes crear fácilmente un evento y compartirlo con tus amigos. Ellos pueden aceptar o rechazar y tú puedes saber quién va a venir.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-200 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-300">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-gray-100"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="sm:px-6 lg:px-0">
            <div className="relative isolate overflow-hidden bg-amber-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
              <div
                className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
                aria-hidden="true"
              />
              <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <img
                  src="/screenshot.jpg"
                  alt="Product screenshot"
                  width={2432}
                  height={1442}
                  className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

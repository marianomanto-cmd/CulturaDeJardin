'use client';

import { useState, type FormEvent } from 'react';

// El alta todavía no tiene endpoint: el envío no llama a ningún servicio y lo
// declara en voz alta en vez de simular un éxito que no ocurrió.
const AVISO =
  'Alta pendiente: todavía no hay endpoint conectado. Escribinos por WhatsApp mientras tanto.';

export default function FormularioBitacora() {
  const [aviso, setAviso] = useState('');

  const alEnviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAviso(AVISO);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <form onSubmit={alEnviar} className="flex flex-wrap gap-2">
        <input
          type="email"
          required
          aria-label="Correo electrónico"
          placeholder="tu correo"
          className="min-h-[44px] min-w-0 flex-[1_1_150px] border-0 border-b border-[rgba(244,239,230,.3)] bg-transparent px-0.5 py-[9px] font-[family-name:inherit] text-[13.5px] text-papel transition-colors duration-300 placeholder:text-[rgba(244,239,230,.6)] focus:border-papel"
        />
        <button type="submit" className="cj-pildora cj-pildora--solida flex-none">
          Sumarme
        </button>
      </form>
      <p
        role="status"
        className="m-0 max-w-[40ch] text-[12.5px] leading-[1.65] text-[rgba(244,239,230,.7)]"
      >
        {aviso}
      </p>
    </div>
  );
}

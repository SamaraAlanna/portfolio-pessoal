"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Campo de telefone com máscara, escrita à mão.
 *
 * SÓ ESTE CAMPO É CLIENT COMPONENT, e não o formulário inteiro. Máscara precisa reagir a
 * cada tecla, então aqui o JavaScript é inevitável; o resto do formulário não tem estado
 * nem handler e continua sendo renderizado no servidor. Subir o `"use client"` para o
 * formulário mandaria os cinco campos para o navegador para resolver um.
 *
 * SEM BIBLIOTECA, por decisão registrada no CLAUDE.md. São três funções puras e um efeito.
 */

/**
 * Formata pelos dígitos, e não pelo que está escrito.
 *
 * O valor é reduzido a dígitos antes de qualquer coisa, então colar "41 99999-8888",
 * "(41)999998888" ou "+55 41 99999 8888" dá o mesmo resultado. O limite de 11 é o do
 * telefone brasileiro com nono dígito.
 *
 * O CORTE MUDA COM O TAMANHO, e é isso que faz fixo e celular conviverem. Até o décimo
 * dígito o número ainda pode ser fixo, então sai 4 mais 4, como (41) 3333-4444. Quando
 * chega o décimo primeiro, ele só pode ser celular, e o grupo vira 5 mais 4, como
 * (41) 99999-8888. O campo se reorganiza sozinho na hora em que a dúvida acaba.
 *
 * O 55 DA FRENTE CAI, E ISSO NÃO É CAPRICHO. Quem copia o número do WhatsApp cola com
 * código do país, e sem esta regra o corte pegava os dois primeiros dígitos como DDD:
 * "+55 41 99999-8888" virava "(55) 41999-9988", um número errado com cara de certo, que é
 * o pior defeito possível num campo de contato.
 *
 * A condição é o comprimento, e não o 55 sozinho, porque 55 também é DDD de verdade, do
 * Rio Grande do Sul. Número brasileiro tem 10 ou 11 dígitos; passando disso e começando
 * com 55, o 55 só pode ser país. Um (55) 99999-8888 legítimo tem 11 e não é tocado.
 */
function formatar(valor: string) {
  const todos = valor.replace(/\D/g, "");
  const semPais = todos.length > 11 && todos.startsWith("55") ? todos.slice(2) : todos;
  const digitos = semPais.slice(0, 11);
  if (digitos.length === 0) return "";

  const ddd = digitos.slice(0, 2);
  if (digitos.length <= 2) return `(${ddd}`;

  const resto = digitos.slice(2);
  if (resto.length <= 4) return `(${ddd}) ${resto}`;

  const corte = resto.length > 8 ? 5 : 4;
  return `(${ddd}) ${resto.slice(0, corte)}-${resto.slice(corte)}`;
}

/** Quantos dígitos existem antes de uma posição do texto. */
function digitosAte(texto: string, posicao: number) {
  return texto.slice(0, posicao).replace(/\D/g, "").length;
}

/** A posição logo depois do n-ésimo dígito, para devolver o cursor ao lugar certo. */
function posicaoApos(texto: string, quantidade: number) {
  if (quantidade <= 0) return 0;

  let vistos = 0;
  for (let i = 0; i < texto.length; i += 1) {
    if (texto[i] >= "0" && texto[i] <= "9") {
      vistos += 1;
      if (vistos === quantidade) return i + 1;
    }
  }
  return texto.length;
}

export default function CampoTelefone({
  id,
  name,
  className,
}: {
  id: string;
  name: string;
  className?: string;
}) {
  const [valor, setValor] = useState("");
  const campo = useRef<HTMLInputElement>(null);
  const cursor = useRef<number | null>(null);

  function aoDigitar(evento: React.ChangeEvent<HTMLInputElement>) {
    const bruto = evento.currentTarget.value;
    const posicao = evento.currentTarget.selectionStart ?? bruto.length;
    const formatado = formatar(bruto);

    cursor.current = posicaoApos(formatado, digitosAte(bruto, posicao));
    setValor(formatado);
  }

  /**
   * DEVOLVE O CURSOR PARA ONDE ELE ESTAVA, e é por isto que este componente não é três
   * linhas. Num campo controlado, reescrever o valor joga o cursor para o fim, então
   * quem corrigisse o DDD de um número já digitado seria cuspido no fim da linha a cada
   * tecla. É o defeito clássico de máscara feita à mão.
   *
   * A âncora é a contagem de dígitos antes do cursor, e não a posição em caracteres: os
   * separadores entram e saem sozinhos, e contar caracteres erraria toda vez que a
   * formatação mudasse de tamanho, que é justamente quando o cursor mais importa.
   *
   * `useLayoutEffect` porque a correção precisa acontecer antes da pintura. Num `useEffect`
   * o cursor apareceria no fim por um quadro e voltaria, o que se vê.
   */
  useLayoutEffect(() => {
    if (cursor.current === null || campo.current === null) return;

    campo.current.setSelectionRange(cursor.current, cursor.current);
    cursor.current = null;
  });

  return (
    <input
      ref={campo}
      id={id}
      name={name}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      /* SEM `maxLength`, E ISSO É DELIBERADO. Ele parece o reforço óbvio e sabota a regra
         do código do país: "+55 41 99999-8888" tem 17 caracteres, o navegador corta em 15
         antes de o `onChange` disparar, e a máscara recebe "+55 41 99999-88" já mutilado,
         devolvendo "(55) 4199-9998". O limite real é de dígitos, não de caracteres, e ele
         mora no `formatar`, que é o único lugar onde os dois se conhecem. */
      value={valor}
      onChange={aoDigitar}
      placeholder="(41) 99999-8888"
      className={className}
    />
  );
}

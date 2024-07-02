"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/board.module.css";
import { TurnsType } from "../types/TurnsType";
import { winningCombinations } from "../constants/consts";

export function Board() {
  const [board, setBoard] = useState<any>(
    Array.from({ length: 3 }, (_, i) => Array.from({ length: 3 }, (_, j) => ""))
  );
  const [turns, setTurns] = useState<TurnsType>({
    playerX: true,
    playerO: false,
  });
  const [boardMap, setBoardMap] = useState<Map<string, string>>(new Map());
  const [winner, setWinner] = useState<string | null>(null);
  const [draw, setDraw] = useState<boolean>(false);

  useEffect(() => {
    checkWinner();
  }, [board]);

  const checkWinner = () => {
    const allCombinations = [
      ...Object.values(winningCombinations.filas),
      ...Object.values(winningCombinations.columnas),
      ...Object.values(winningCombinations.diagonales),
    ];

    for (const combination of allCombinations) {
      const [a, b, c] = combination;
      const keyA = a;
      const keyB = b;
      const keyC = c;

      if (
        boardMap.get(keyA) &&
        boardMap.get(keyA) === boardMap.get(keyB) &&
        boardMap.get(keyA) === boardMap.get(keyC)
      ) {
        setWinner(boardMap.get(keyA)!);
        return;
      }
    }

    if (boardMap.size === 9 && !winner) {
      setDraw(true);
    }
  };

  const clearBoard = () => {
    setBoardMap(new Map());
    setBoard(
      Array.from({ length: 3 }, (_, i) =>
        Array.from({ length: 3 }, (_, j) => "")
      )
    );
    setWinner("");
    setDraw(false);
  };

  const toggleTurns = () => {
    setTurns({
      playerX: !turns.playerX,
      playerO: !turns.playerO,
    });
  };

  const handleClick = (e: any) => {
    let i = Number(e.target.id.split(",")[0]);
    let j = Number(e.target.id.split(",")[1]);

    if (board[i][j] === "" && !winner) {
      const newBoard = board.map((row: any) => [...row]);
      const key = `${i},${j}`;

      if (turns.playerX) {
        newBoard[i][j] = "X";
        setBoard(newBoard);
        setBoardMap(new Map(boardMap.set(key, "X")));
      } else {
        newBoard[i][j] = "O";
        setBoard(newBoard);
        setBoardMap(new Map(boardMap.set(key, "O")));
      }

      toggleTurns();
    }
  };

  return (
    <>
      <div className={styles.options}>
        {turns.playerX ? (
          <h3>Turno del jugador 'X'</h3>
        ) : (
          <h3>Turno del jugador 'O'</h3>
        )}
      </div>
      <div className={styles.board}>
        {board.length > 0 &&
          board.map((s: [], i: number) => {
            return s.map((square, j: number) => {
              return (
                <div
                  id={`${i},${j}`}
                  key={i * 3 + j + 1}
                  onClick={(e) => handleClick(e)}
                  className={
                    square !== ""
                      ? square === "X"
                        ? `${styles.x} ${styles.show}`
                        : `${styles.o} ${styles.show}`
                      : ""
                  }
                >
                  {square}
                </div>
              );
            });
          })}
      </div>
      <button className={styles.button} onClick={() => clearBoard()}>
        Reiniciar
      </button>
      <div className={styles.winner}>
        {winner && !draw && `Ganó el Jugador '${winner}'!`}
        {!winner && draw && `Empate!`}
      </div>
    </>
  );
}

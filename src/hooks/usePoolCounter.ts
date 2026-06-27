import { useState, useEffect, useMemo } from "react";
import { getAllMinions } from "@/lib/minions";
import {
  createEmptyState,
  computePoolCounters,
  saveState,
  loadState,
  clearState,
  type PoolCounterState,
  type ShopLogEntry,
} from "@/lib/pool-counter";

export function usePoolCounter() {
  const minions = useMemo(() => getAllMinions(), []);
  const [state, setState] = useState<PoolCounterState>(() => createEmptyState());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadState();
    if (loaded) setState(loaded);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveState(state);
  }, [state, hydrated]);

  const counters = useMemo(
    () => computePoolCounters(state, minions),
    [state, minions]
  );

  function reset() {
    if (confirm("Aktuelles Spiel zurücksetzen?")) {
      setState(createEmptyState());
      clearState();
    }
  }

  function logShop(offered: string[]) {
    setState((s) => ({
      ...s,
      turn: s.turn + 1,
      shopLog: [
        ...s.shopLog,
        { turn: s.turn, offered, bought: null, sold: null, discovered: null },
      ],
    }));
  }

  function buyMinion(entry: ShopLogEntry, minionId: string) {
    setState((s) => ({
      ...s,
      shopLog: s.shopLog.map((e) =>
        e === entry ? { ...e, bought: minionId } : e
      ),
    }));
  }

  function sellMinion(entry: ShopLogEntry, minionId: string) {
    setState((s) => ({
      ...s,
      shopLog: s.shopLog.map((e) =>
        e === entry ? { ...e, sold: minionId } : e
      ),
    }));
  }

  function addBoardMinion(minionId: string) {
    setState((s) => {
      const existing = s.board.find((b) => b.minionId === minionId && !b.golden);
      if (existing) {
        const newCopies = Math.max(existing.copies + 1, 3);
        if (newCopies >= 3) {
          const others = s.board.filter(
            (b) => !(b.minionId === minionId && !b.golden)
          );
          return {
            ...s,
            board: [...others, { minionId, golden: true, copies: 1 }],
          };
        }
        return {
          ...s,
          board: s.board.map((b) =>
            b === existing ? { ...b, copies: newCopies } : b
          ),
        };
      }
      return {
        ...s,
        board: [...s.board, { minionId, golden: false, copies: 1 }],
      };
    });
  }

  function removeBoardMinion(index: number) {
    setState((s) => ({
      ...s,
      board: s.board.filter((_, i) => i !== index),
    }));
  }

  return {
    state,
    setState,
    hydrated,
    minions,
    counters,
    reset,
    logShop,
    buyMinion,
    sellMinion,
    addBoardMinion,
    removeBoardMinion,
  };
}

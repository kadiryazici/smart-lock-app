import React, { useCallback, useEffect, useRef } from "react";

export type Process = (() => void) | (() => Promise<void>)

export function useProcessQueue() {
  const activeProcessId = useRef<number | null>(-1);

  const run = useCallback(async (processes: Process[]) => {
    const id = Math.random();
    activeProcessId.current = id;

    for (const process of processes) {
      if (id !== activeProcessId.current) {
        return;
      }

      await Promise.resolve(process())
    }

    activeProcessId.current = null;
  }, []);

  useEffect(() => () => {
    activeProcessId.current = -1;
  }, []);

  return {
    run,
  }
}

export function useStateAsRef<T>(value: T) {
  const ref = useRef(value);

  React.useLayoutEffect(() => {
    ref.current = value;
  })

  return ref;
}
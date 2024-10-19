import React, { useCallback, useEffect, useRef } from "react";

export type Process = () => Promise<void | unknown> | void | unknown;
type ProcessList = Process | ProcessList[];

export function useProcessQueue() {
  const activeProcesses = useRef<Set<number>>(new Set());

  const run = useCallback(async (processes: ProcessList[]) => {
    const id = Math.random();
    activeProcesses.current.add(id);

    // @ts-expect-error Infinity confuses typescript
    for (const process of processes.flat(Infinity) as Process[]) {
      if (!activeProcesses.current.has(id)) {
        return;
      }

      await Promise.resolve(process())
    }

    activeProcesses.current.delete(id);
  }, []);

  useEffect(() => () => {
    activeProcesses.current.clear();
  }, []);

  function repeat(times: number, queue: ProcessList) {
    return Array.from({ length: times }, () => queue);
  }

  return {
    run,
    repeat
  }
}

export function useStateAsRef<T>(value: T) {
  const ref = useRef(value);

  React.useLayoutEffect(() => {
    ref.current = value;
  })

  return ref;
}
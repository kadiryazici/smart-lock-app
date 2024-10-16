"use client";

import cn from "classnames";
import React, { useCallback, useState } from "react";
import styles from './SmartLockDevice.module.scss'
import { SmartLockIcon } from "./SmartLockIcon";
import { useProcessQueue } from "./SmartLockDevice.hooks";
import { sleep } from "./SmartLockDevice.utils";

enum LockState {
  Success,
  Failure,
  None,
}

const digitGrid = [
  [{ type: 'digit', value: 1 }, { type: 'digit', value: 2 }, { type: 'digit', value: 3 }],
  [{ type: 'digit', value: 4 }, { type: 'digit', value: 5 }, { type: 'digit', value: 6 }],
  [{ type: 'digit', value: 7 }, { type: 'digit', value: 8 }, { type: 'digit', value: 9 }],
  [{ type: 'digit', value: 0 }, { type: 'buttonApply', value: '✓' }],
] as const;

const demoPins = ['1234', '4567', '8899'];

type Props = {
  outline?: boolean;
  showcase?: boolean;
  showcasePins?: number[];
}

export function SmartLockDevice(props: Props) {
  const [pressedDigits, setPressedDigits] = useState('');
  const [digitState, setDigitState] = useState(LockState.None);
  const [checkButtonState, setCheckButtonState] = useState(LockState.None);
  const queue = useProcessQueue();

  function handleDigitPress(digit: number) {
    if (pressedDigits.includes(digit.toString())) {
      return
    }

    setPressedDigits((previous) => previous + digit.toString());
  }

  const blink = useCallback(async (state: LockState.Failure | LockState.Success) => {
    setCheckButtonState(state);
    await sleep(150)
    setCheckButtonState(LockState.None);
  }, [])

  function validateAccessCodeInput() {
    const result = demoPins.includes(pressedDigits) ? LockState.Success : LockState.Failure;

    queue.run([
      () => setDigitState(result),
      () => blink(result),
      () => sleep(150),
      () => blink(result),
      () => sleep(150),
      () => blink(result),
      () => {
        setPressedDigits('');
        setDigitState(LockState.None);
      }
    ])
  }

  return (
    <div className={cn([
      "rounded-[60px] p-[8px] font-geist-mono text-[18px] inline-flex",
      {
        'bg-gray': !props.outline,
        'bg-transparent border-[2px] border-text-light border-dashed': props.outline,
      }
    ])}>
      <div className={cn([
        "rounded-[52px] flex flex-col flex-nowrap p-[24px]",
        {
          "bg-dark border border-solid border-darker": !props.outline,
          "bg-transparent border-[2px] border-text-light border-dashed": props.outline,
        }
      ])}>
        <div className="flex flex-col gap-[16px]">
          {
            digitGrid.map((col, rowIndex) => (
              <div
                key={rowIndex}
                className="w-full flex flex-row justify-end gap-[16px]"
              >
                {
                  col.map((row, index) => {
                    const baseStyles = "shrink-0 transition text-text-light size-[56px] rounded-full border-[2px]";
                    const baseClasses = cn([
                      baseStyles,
                      !props.outline && styles.button,
                      !props.outline && "border-solid border-darker",
                      props.outline && "border-text-light border-dashed",
                    ])

                    if (row.type === 'digit') {
                      return (
                        <button
                          key={index}
                          className={cn([
                            baseClasses,
                            pressedDigits.includes(row.value.toString()) && [
                              styles.button_pressed,
                              digitState === LockState.Success || digitState === LockState.None ? "!text-green-400" : "!text-red-500"
                            ],
                          ])}
                          onClick={() => handleDigitPress(row.value)}
                        >
                          {row.value}
                        </button>
                      )
                    }

                    return (
                      <button
                        className={cn([
                          baseClasses,
                          "text-[30px]",
                          {
                            "!text-green-400": checkButtonState === LockState.Success,
                            "!text-fail": checkButtonState === LockState.Failure,
                          }
                        ])}
                        key={index}
                        onClick={validateAccessCodeInput}
                      >
                        {row.value}
                      </button>
                    )
                  })
                }
              </div>
            ))
          }
        </div>

        <div className="flex w-full justify-center mt-[30px]">
          <SmartLockIcon outline={props.outline} />
          {/* <div className="border inline-flex justify-center items-center border-darker rounded-full size-[50px]">
            🌐
          </div> */}
        </div>
      </div>
    </div>
  );

}
"use client";

import cn from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from './SmartLockDevice.module.scss'
import { SmartLockIcon } from "./SmartLockIcon";
import { useProcessQueue, useStateAsRef } from "./SmartLockDevice.hooks";
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

type Props = {
  outline?: boolean;
  preview?: string[];
  validPins: string[];
}

export function SmartLockDevice(props: Props) {
  const [pressedDigits, setPressedDigits] = useState('');
  const [checkButtonState, setCheckButtonState] = useState(LockState.None);
  const queue = useProcessQueue();
  const digitElements = useRef<Record<number, HTMLButtonElement>>({});

  function handleDigitPress(digit: number, preview = false) {
    if (props.preview != null && preview === false) return;

    if (preview) {
      const element = digitElements.current[digit];

      queue.run([
        () => element?.classList.add(styles.button_pressed),
        () => sleep(100),
        () => element?.classList.remove(styles.button_pressed),
      ])
    }

    setPressedDigits((prev) => prev + digit.toString());
  }

  const blink = useCallback(async (state: LockState.Failure | LockState.Success) => {
    setCheckButtonState(state);
    await sleep(150)
    setCheckButtonState(LockState.None);
  }, [])

  const enteredDigitsRef = useStateAsRef(pressedDigits);

  async function validateAccessCodeInput() {
    const digits = enteredDigitsRef.current;
    const result = props.validPins.includes(digits) ? LockState.Success : LockState.Failure;

    await queue.run([
      queue.repeat(2, [
        () => blink(result),
        () => sleep(150),
      ]),
      () => blink(result),
      () => {
        setPressedDigits('');
      }
    ])
  }

  useEffect(() => {
    if (props.preview == null) return;

    let timeout = -1;
    let current = 0;

    function loop() {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(async () => {
        const pin = props.preview![current];
        const digits = enteredDigitsRef.current;

        if (digits.length < pin.length) {
          handleDigitPress(parseInt(pin[digits.length]), true);
        } else {
          await validateAccessCodeInput();
          current = (current + 1) % props.preview!.length
        }

        loop();
      }, 500)
    }

    loop();

    return () => {
      window.clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.preview])

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
                          ])}
                          ref={(element) => {
                            digitElements.current[row.value] = element!
                          }}
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
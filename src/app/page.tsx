"use client";

import { SmartLockDevice } from "./components/SmartLockDevice/SmartLockDevice";
import { useScramble } from 'use-scramble'

const arrowRight = (
  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path style={{ fill: 'currentcolor' }} fillRule="evenodd" clipRule="evenodd" d="M10.2929 5.29289C10.6834 4.90237 11.3166 4.90237 11.7071 5.29289L15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071L11.7071 14.7071C11.3166 15.0976 10.6834 15.0976 10.2929 14.7071C9.90237 14.3166 9.90237 13.6834 10.2929 13.2929L12.5858 11L5 11C4.44772 11 4 10.5523 4 10C4 9.44772 4.44772 9 5 9H12.5858L10.2929 6.70711C9.90237 6.31658 9.90237 5.68342 10.2929 5.29289Z" fill="#FBFBFB" />
  </svg>
)


export default function Home() {
  const { ref, } = useScramble({
    text: 'mRPzMrBW45hVRMDJCbmwpk9mGTkLGubnYev1eiRZ5TvUbf6RyuTkbuFGUiuBpffBfwxXrwBfXKJXeHVHE9qjPaeqzJzZZPFqkVTj',
    overdrive: true,
  })

  return <>
    <div className="py-[82px] max-w-[804px] w-full mx-auto border-l border-r border-dashed border-stroke min-h-full">
      <div className="gap-[20px] w-full flex flex-col md:flex-row flex-nowrap md:justify-between max-md:items-center border-b border-t border-dashed border-stroke">
        <div className="md:pl-[82px] max-md:text-center my-auto block w-full ">
          <div className="max-md:mx-auto mb-[34px] max-w-[350px]">
            <div className="text-[#353642] header1-inter">
              Create access codes for any smart lock using Seam API.
            </div>

            <div className="text-[#6A6B82] header1-inter">
              Just set up time and let us handle the rest
            </div>
          </div>

          <div className="hover:bg-[#FBFBFB] hover:text-[#353642] rounded-[50px] cursor-pointer bg-[#353642] text-[#FBFBFB] py-0.5 px-6 regular-text-mono font-bold inline-flex items-center gap-1">
            {"Learn more"}{arrowRight}
          </div>
        </div>

        <div className="relative">
          <div className="max-md:hidden w-[1px] left-[-1px] bottom-0 border-r border-dashed border-stroke absolute h-[100vh]"></div>
          <SmartLockDevice validPins={['1234', '4567', '8899']} preview={['2345', '1234', '5473', '1903', '8899']} />
        </div>
      </div>

      <div className="py-[82px] w-full flex regular-text-inter ">
        <div className="md:pl-[82px] max-md:px-5 mx-auto text-[#6A6B82] w-full">
          <div className="max-w-[590px]">
            Seam makes it easy to integrate IoT devices with your applications. We have integrated many door locks, thermostats, and other device brands, and we have created simple application programming interfaces (APIs) for interacting with these devices.
          </div>
          <a href="#" className="text-[#353642] inline-flex items-center whitespace-nowrap">
            {"Read docs"}{arrowRight}
          </a>
        </div>
      </div>

      <div
        className="relative border-t border-b border-dashed border-stroke text-[#9E9EB4] regular-text-mono w-full mx-auto max-w-[804px] whitespace-nowrap overflow-hidden"
      >
        <div

          className="border-r border-stroke border-dashed left-0 top-0 absolute h-full w-[calc(100%-68px)]"
        >
          <div
            className="opacity-[0.4] w-full h-full"
            style={{
              background: 'linear-gradient(to right, #fbfbfb33 20%, #D4D4EA 100%)'
            }}
          />
        </div>

        <div ref={ref} className="relative w-full" />
      </div>
    </div>
  </>
}

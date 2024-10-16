import React from "react";

type Props = {
  outline?: boolean;
}

export const SmartLockIcon = React.memo(function SmartLockIcon(props: Props) {
  if (props.outline) {
    return (
      <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="56" height="56" rx="28" stroke="#B5B5BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" />
        <circle cx="29" cy="37" r="12" stroke="#B5B5BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" />
        <path d="M27 17C27 15.8954 27.8954 15 29 15V15C30.1046 15 31 15.8954 31 17V24.5388C31 24.9537 30.9139 25.3641 30.7472 25.7441L28.709 30.3898C28.2714 31.3873 28.4088 32.5436 29.0681 33.4107L31.5708 36.7026C32.1543 37.4701 32.3334 38.4712 32.0522 39.3933L31.1305 42.4159C31.044 42.6996 31 42.9945 31 43.291V55H27V43.291C27 42.9945 27.044 42.6996 27.1305 42.4159L28.0522 39.3933C28.3334 38.4712 28.1543 37.4701 27.5708 36.7026L25.0681 33.4107C24.4088 32.5436 24.2714 31.3873 24.709 30.3898L26.7472 25.7441C26.9139 25.3641 27 24.9537 27 24.5388V17Z" stroke="#B5B5BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" />
      </svg>

    )
  }

  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="54" height="54" rx="27" fill="#3B3B45" />
      <rect x="1" y="1" width="54" height="54" rx="27" stroke="#35353E" strokeWidth="2" />
      <g filter="url(#filter0_ii_4406_70)">
        <circle cx="28" cy="36" r="12" fill="#3C3C47" />
      </g>
      <path d="M26 16C26 14.8954 26.8954 14 28 14C29.1046 14 30 14.8954 30 16V23.5388C30 23.9537 29.9139 24.3641 29.7472 24.7441L27.709 29.3898C27.2714 30.3873 27.4088 31.5436 28.0681 32.4107L30.5708 35.7026C31.1543 36.4701 31.3334 37.4712 31.0522 38.3933L30.1305 41.4159C30.044 41.6996 30 41.9945 30 42.291V54H26V42.291C26 41.9945 26.044 41.6996 26.1305 41.416L27.0522 38.3933C27.3334 37.4712 27.1543 36.4701 26.5708 35.7026L24.0681 32.4107C23.4088 31.5436 23.2714 30.3873 23.709 29.3898L25.7472 24.7441C25.9139 24.3641 26 23.9537 26 23.5388V16Z" fill="#35353E" />
      <defs>
        <filter id="filter0_ii_4406_70" x="12" y="20" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.211979 0 0 0 0 0.211979 0 0 0 0 0.246354 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_4406_70" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="-4" dy="-4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.207843 0 0 0 0 0.207843 0 0 0 0 0.243137 0 0 0 1 0" />
          <feBlend mode="normal" in2="effect1_innerShadow_4406_70" result="effect2_innerShadow_4406_70" />
        </filter>
      </defs>
    </svg>

  )
})
import React from 'react'

export const ArrowButton = ({seeMoreReview,onClick}) => {
    return (
        <div className='absolute' style={{left:"50%"}}>
            <div class={` flex justify-center`} style={{marginTop:"-40px"}}>
                <button onClick={onClick} class={`bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center ${seeMoreReview ? '' : 'transform rotate-180'}`}>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

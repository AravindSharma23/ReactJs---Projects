import React from 'react'

export const ProductReviews = ({val}) => {
    return (
        <div>
            <div class="flex space-x-4 text-sm text-gray-500">
                <div class="flex-none py-10">
                    <img src="" alt="" class="size-10 rounded-full bg-gray-100" />
                </div>
                <div class=" py-6">
                    <h3 class="font-medium text-gray-900">{val.reviewerName}</h3>
                    <p><time datetime="2021-07-12">{val.date.split("T")[0]}</time></p>

                    <div class="mt-4 flex items-center">
                        {/* <!-- Active: "text-yellow-400", Default: "text-gray-300" --> */}
                        <svg class={`size-5 shrink-0 ${val.rating >=1 ? 'text-yellow-400' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
                        </svg>
                        <svg class={`size-5 shrink-0 ${val.rating >=2 ? 'text-yellow-400' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
                        </svg>
                        <svg class={`size-5 shrink-0 ${val.rating >=3 ? 'text-yellow-400' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
                        </svg>
                        <svg class={`size-5 shrink-0 ${val.rating >=4 ? 'text-yellow-400' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
                        </svg>
                        <svg class={`size-5 shrink-0 ${val.rating ===5 ? 'text-yellow-400' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <p class="sr-only">{val.rating} out of 5 stars</p>

                    <div class="mt-4 text-sm/6 text-gray-500">
                        <p>{val.comment}</p>
                    </div>
                </div>
            </div>

            {/* <!-- More reviews... --> */}
        </div>
          
    
  )
}

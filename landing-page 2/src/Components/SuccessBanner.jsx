import React from 'react'
import { Navigate } from 'react-router-dom'

export const SuccessBanner = () => {
    const viewOrderedHistory = ()=>{
        Navigate('/ordereditems')
    }
    return (
        <div>
            <div class="rounded-md bg-green-50 p-4">
                <div class="flex">
                    <div class="shrink-0">
                        <svg class="size-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-green-800">Added successfully </p>
                    </div>
                    <div class="ml-auto pl-3">
                        <a onClick={viewOrderedHistory} class="whitespace-nowrap font-medium text-green-700 hover:text-green-600">
                            view cart
                            <span aria-hidden="true"> &rarr;</span>
                        </a>

                    </div>
                </div>
            </div>

        </div>
    )
}

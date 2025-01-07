import React from 'react';

export const DressSizeSelection = () => {
  return (
    <div>
        <div class="mt-10">
            <div class="flex items-center justify-between ">
              <h3 class="text-sm font-medium text-gray-900">Size</h3>
              <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
            </div>

            <fieldset aria-label="Choose a size" class="mt-4">
              <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
                <label class="group relative flex cursor-not-allowed items-center justify-center rounded-md border bg-gray-50 px-4 py-3 text-sm font-medium uppercase text-gray-200 hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                  <input type="radio" name="size-choice" value="XXS" disabled class="sr-only" />
                  <span>XXS</span>
                  <span aria-hidden="true" class="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                    <svg class="absolute inset-0 size-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                      <line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
                    </svg>
                  </span>
                </label>
                {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
                <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                  <input type="radio" name="size-choice" value="XS" class="sr-only"/>
                  <span>XS</span>
                  {/* <!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                  --> */}
                  <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                </label>
                {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
                <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                  <input type="radio" name="size-choice" value="S" class="sr-only"/>
                  <span>S</span>
                  {/* <!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                  --> */}
                  <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                </label>
                {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
                <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                  <input type="radio" name="size-choice" value="M" class="sr-only"/>
                  <span>M</span>
                  {/* <!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                  --> */}
                  <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                </label>
                {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
                <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                  <input type="radio" name="size-choice" value="L" class="sr-only"/>
                  <span>L</span>
                  {/* <!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                  --> */}
                  <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                </label>
                {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
                <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                  <input type="radio" name="size-choice" value="XL" class="sr-only"/>
                  <span>XL</span>
                  {/* <!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                  --> */}
                  <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                </label>
                {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
                <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                  <input type="radio" name="size-choice" value="2XL" class="sr-only"/>
                  <span>2XL</span>
                  {/* <!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                  --> */}
                  <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                </label>
                {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
                <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                  <input type="radio" name="size-choice" value="3XL" class="sr-only"/>
                  <span>3XL</span>
                  {/* <!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                  --> */}
                  <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                </label>
              </div>
            </fieldset>
          </div>
    </div>
  )
}

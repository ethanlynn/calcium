<script lang="ts">
  const searchResults = [
    {
      favIcon: "https://tailwindcss.com/favicons/favicon-32x32.png?v=3",
      title: "Customizing Colors - Tailwind CSS",
      titleSegments: [
        { highlighted: true, text: "Customizing" },
        { highlighted: false, text: " Colors - Tailwind CSS" },
      ],
      segments: [
        { highlighted: false, text: "Tailwind " },
        { highlighted: true, text: "i" },
        { highlighted: false, text: "n" },
        { highlighted: true, text: "cludes" },
        {
          highlighted: false,
          text: " an expertly-crafted default color palette out-of-the-box that is a great starting point if you don’t have your own specific branding in mind.",
        },
      ],
    },
  ];
  const selectedSearchResult = 0;
</script>

<div class="bg-slate-800 flex flex-col extension-container">
  <div
    class="px-4 pt-4 pb-2 bg-slate-100 focus-within:border-slate-400 border-b-8 border-transparent"
  >
    <label class="relative block text-slate-800">
      <div class="absolute h-full left-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-full"
        >
          <path
            fill-rule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search..."
        class="appearance-none rounded bg-transparent w-full pl-9 text-lg leading-5 leading-none text-slate-800 placeholder-slate-400 focus:outline-none"
      />
    </label>
  </div>
  <div class="p-4">
    {#each searchResults as { title, titleSegments, segments, favIcon }, i}
      <div
        class="flex gap-2 bg-slate-700 rounded px-2 cursor-pointer select-none items-center ring-lime-300"
        class:ring-2={i === selectedSearchResult}
      >
        <div
          class="w-8 h-8 p-2 mt-1 bg-slate-100 text-slate-800 rounded-full flex items-center justify-center"
        >
          <img alt={title} src={favIcon} />
        </div>
        <div class="relative flex-1 pt-2 max-h-20 overflow-hidden">
          <h2 class="text-slate-200 text-sm pb-1">
            {#each titleSegments as { highlighted, text }}
              {#if highlighted}
                <span class="bg-lime-300 text-slate-700 px-0.5 rounded-sm"
                  >{text}</span
                >
              {:else}
                {text}
              {/if}
            {/each}
            <span class="text-slate-400">
              (<span class="text-lime-300">4</span> exact)
            </span>
          </h2>
          <div class="pb-2">
            <p class="text-slate-500 text-sm">
              {#each segments as { highlighted, text }}
                {#if highlighted}
                  <span class="bg-lime-300 text-slate-700 px-0.5 rounded-sm"
                    >{text}</span
                  >
                {:else}
                  {text}
                {/if}
              {/each}
            </p>
          </div>
          <div
            class="absolute bg-gradient-to-b from-transparent to-slate-700 w-full h-4 bottom-0"
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="fill-slate-400 w-10 h-10"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    {/each}
  </div>
</div>

<style>
  .extension-container {
    width: 640px;
    height: 480px;
  }
</style>

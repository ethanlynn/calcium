<script lang="ts">
  const searchResults = [
    {
      favIcon: "https://tailwindcss.com/favicons/favicon-32x32.png?v=3",
      title: "Customizing Colors - Tailwind CSS",
      segments: [
        { isMatch: false, text: "Tailwind " },
        { isMatch: true, text: "includes" },
        {
          isMatch: false,
          text: " an expertly-crafted default color palette out-of-the-box that is a great starting point if you don’t have your own specific branding in mind.",
        },
      ],
    },
  ];
</script>

<div class="bg-slate-800 w-96 h-96 p-4 flex flex-col gap-4">
  <label class="relative block text-slate-400 focus-within:text-lime-400">
    <div class="absolute p-2 h-full right-0">
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
      class="appearance-none rounded w-full bg-slate-600 p-2 pr-7 text-lg leading-5 leading-none text-lime-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
    />
  </label>
  {#each searchResults as { title, segments, favIcon }}
    <div
      class="flex gap-2 bg-slate-700 rounded p-2 cursor-pointer select-none"
    >
      <div
        class="w-8 h-8 p-2 mt-1 bg-slate-100 text-slate-800 rounded-full flex items-center justify-center"
      >
        <img alt={title} src={favIcon} />
      </div>
      <div class="flex-1">
        <h1 class="text-slate-200">{title}</h1>
        <p class="text-slate-500 text-sm">
          {#each segments as { isMatch, text }}
            {#if isMatch}
              <span class="text-lime-300">{text}</span>
            {:else}
              <span>{text}</span>
            {/if}
          {/each}
        </p>
      </div>
    </div>
  {/each}
</div>

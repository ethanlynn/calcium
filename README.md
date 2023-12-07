![Calcium](docs/banner.png)

![Calcium Demo](calcium-site/static/demo.gif)

🔎 Low latency fuzzy-find on browser tabs, bookmarks, history

🏃 Search and jump to common developer docs

Coming soon...

⚙️  Directives 

🤖 AI clipboard

## Usage

- Open with `Cmd+Period`
- Fuzzy search by tab title, URL, or any portion of visible text on a tab
- A small list of experimental directives starting with `@` search common repositories of developer documentation:
    - @mdn searches articles from https://developer.mozilla.org/
    - @caniuse searches browser compatibility data from https://caniuse.com/
    - ...more to come


## Installation (BETA)

Calcium is in beta and currently only supports Chrome. It is not yet published to the Chrome Web Store. If you'd still like to try it out and give your feedback, you can build and install the extension locally assuming you have a Node.js environment configured (>=LTS):

```
git clone https://github.com/ethanlynn/calcium
cd calcium/calcium-extension
npm install
npm run build
```

After building, the `dist/` directory can be installed manually in Chrome as follows:

- Navigate to `chrome://extensions`
- Ensure "Developer Mode" is toggled on in the top right corner
- Click "Load Unpacked" in the top left corner
- Select the `calcium-extension/dist/` directory

Note that you will need to restart your browser before the extension is able to properly index all of your tabs.

## Contributing

Right now, the best way to contribute is to try out Calcium and share your feedback.

Directives starting with `@` will likely be expanded, so if you have ideas for a specific data source or behavior that you feel would be helpful to integrate into Calcium, submit a proposal via a Github Issue or submit a PR following the template of the existing `adapters/`. Please bear in mind:
- Any data source used must be publicly available on the internet and licensed appropriately
- Directives should generally be applicable to a wide audience of developers (very niche use cases will be rejected)
- The interface for building adapters is unstable. I would like to pilot a few good use cases and define the appropriate constraints before creating many specialized adapters.

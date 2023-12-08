![Calcium](docs/banner.png)

![Calcium Demo](calcium-site/static/demo.gif)

🔎 Low latency fuzzy-find on browser tabs, bookmarks, history

🏃 Search and jump to common developer docs

Coming soon...

⚙️  Plugins 

🤖 AI clipboard

## Usage

- Open with `Cmd+Period`
- Fuzzy search by tab title, URL, or any portion of visible text on a tab
- A small list of experimental plugins starting with `@` search common repositories of developer documentation:
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

## Roadmap

Below is an incomplete roadmap of ideas I may or may not end up incorporating. This list may change.

- [x] Search by tab title, URL
- [x] Search by tab page content
- [ ] Search by bookmarks
- [ ] Search by browser history
- [ ] Create a more hackable architecture
  - [ ] Release calcium as an NPM package that can bundle itself into an extension given a config containing a set of plugins
    - [ ] Extension build process `calcium build` should bundle all plugins into a directory that can be loaded as an unpacked extension
    - [ ] Users should be able to define their profile with config and plugins in `calcium.profile.js` or `calcium.profile.ts`
      - [ ] theme
      - [ ] plugins
      - [ ] keybindings 
    - [ ] Plugin architecture should be well defined so that users can create their own plugins or install 3rd-party plugins from NPM
    - [ ] Plugin architecture should support the notion of `$PATH`
      - [ ] `$PATH` would work similar to shell environments, providing certain plugins only within the context of a given domain or URL
    - [ ] Plugins should be isolated within a service worker to protect the user's privacy and prevent malicious plugins from gaining access to the browser's resources or data within other plugins
    - [ ] Plugin architecture should support authentication into 3rd party APIs like Github
- [ ] Establish a quality set of core themes and plugins for navigating to common developer resources and performing common development tasks
  - [x] mdn
  - [x] caniuse
  - [ ] npm
  - [ ] pip
  - [ ] dockerhub

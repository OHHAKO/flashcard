# Environment

- pods: 1.15.2
- ruby: 2.6.10p210
- jdk: 17.0.9

# Let's run!

Clone repository and run in below commands. you could run application on simulator/emulator

```bash
# install dependencies
yarn install
npx pod-install

# run Metro
yarn start

yarn ios
yarn android
```

# Maintaining the main feature

Pull main branch and run below commands.
If dependencies(package.json or .lock) are changed, run `yarn install && npx pod-install` before.

```bash
yarn start
yarn ios
yarn android

```

# Unit test

```bash
yarn jest

```

<!--
For Android: Press the R key twice or select "Reload" from the Developer Menu (Ctrl + M (on Window and Linux) or Cmd ⌘ + M (on macOS)) to see your changes!

For iOS: Hit Cmd ⌘ + R in your iOS Simulator to reload the app and see your changes!
-->

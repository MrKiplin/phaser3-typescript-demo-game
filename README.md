# Phaser3 Demo

Phaser 3 demo game in TypeScript. Based off [ourcade/phaser3-typescript-parcel-template](https://github.com/ourcade/phaser3-typescript-parcel-template) and [making your first phaser3 game](http://phaser.io/tutorials/making-your-first-phaser-3-game/part1) tutorial.

![License](https://img.shields.io/badge/license-MIT-green)

## Setup

### Prerequisites

To write and test code you will need [NodeJS](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/lang/en/) installed. If your on a Mac, use [Homebrew](https://docs.brew.sh/Installation) for installation.

```
brew install node
brew install yarn
```

Will also need [TypeScript](https://www.typescriptlang.org/) installed.

```bash
npm install -g typescript
```

Then install Parcel:

```bash
npm install -g parcel-bundler
```

### Installing

Install project dependencies

```
yarn
```

### Getting Started

Start development server:

```
yarn start
```

To create a production build:

```
yarn build
```

Production files will be placed in the `dist` folder. Then upload those files to a web server. 🎉

## TypeScript ESLint

This template uses a basic `typescript-eslint` set up for code linting.

It does not aim to be opinionated.

## Dev Server Port

You can change the dev server's port number by modifying the `start` script in `package.json`. We use Parcel's `-p` option to specify the port number.

The script looks like this:

```
parcel src/index.html -p 8000
```

Change 8000 to whatever you want.

## Other Notes

[parcel-plugin-clean-easy](https://github.com/lifuzhao100/parcel-plugin-clean-easy) is used to ensure only the latest files are in the `dist` folder. You can modify this behavior by changing `parcelCleanPaths` in `package.json`.

[parcel-plugin-static-files](https://github.com/elwin013/parcel-plugin-static-files-copy#readme) is used to copy static files from `public` into the output directory and serve it. You can add additional paths by modifying `staticFiles` in `package.json`.

## License

[MIT License](https://github.com/ourcade/phaser3-typescript-parcel-template/blob/master/LICENSE)

## Authors

![](docs/mrkiplin-icon.gif)

**Theo Jones** - _Initial work_ - [MrKiplin](https://github.com/MrKiplin)

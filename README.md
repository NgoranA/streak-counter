# `@aristidenf/streak-counter` - basic streak counter

This is a streak counter for the browser, inspired by Duolingo written in Typescript (uses `localStorage`).

## Install

```shell
npm install @aristidenf/streak-counter
```

```shell
yarn add @aristidenf/streak-counter
```

## Usage

```
import { streakCounter } from "@aristidenf/streak-counter";

const today = new Date();
const streak = streakCounter(localStorage, today);
// streak returns an object:
// {
//    currentCount: 1,
//    lastLoginDate: "6/12/2022",
//    startDate: "6/12/2021",
// }

```

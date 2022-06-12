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
import { streakCounter } from "@jsjoeio/streak-counter";

const today = new Date();
const streak = streakCounter(localStorage, today);
// streak returns an object:
// {
//    currentCount: 1,
//    lastLoginDate: "11/11/2021",
//    startDate: "11/11/2021",
// }

```

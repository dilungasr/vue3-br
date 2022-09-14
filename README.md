# vue3-br

Tiny vue 3 plugin for creating media query breakpoints in your vue 3 application and use them as boolean values. This package is a successor to `vue3-breakpoint` which works the sameway but depends on vuex to provide the results. **Vue3-br** is self-contained and exposing its breakpoints variables in a simple and reactive way!

> ## Features

- Simple
- Reactive
- Customizable
- Realtime height change detection
- Realtime width change detection
- Boolean-based
- Vue3-friendly

> ## Installation

Make sure Vue 3 is installed on your machine before any extra steps!
Then run the following commands in your existing vue project to add the package.

```sh
yarn add vue3-br
#OR
npm install vue3-br
```

Install as a plugin to your Vue app. In your main.js file:

```js
import { createApp } from "vue";
import { createBr } from "vue3-br";

const app = createApp({});

const br = createBr();

app.use(br);
```

Now you will be able to use the package accross your app.
<br>
<br>

> ## Defining Breakpoints

Defining your breakpoints is as simple as passing an object containing your breakpoints to `createBr()` function in your main.js file. Each breakpoint is a property with an array of one or two number type elements as pixel unit values.

Syntax of the definition object:

```js
  {
    breakpoint1: [min,max],
    breakpoint2: [min,max],
    breakpoint3: [min],
    breakpoint4: [min,max],
    ...
  }
```

> Example (Main.js)

```js
import { createApp } from "vue";
import { createBr } from "vue3-br";

const app = createApp({});

const br = createBr({
  min: [0, 700],
  mid: [701, 1024],
  somewhere: [900, 1024]
  max: [1025],
});

app.use(br);
```

<br>
<br>

> ## Using Inside Vue Components

You can use your breakpoints inside vue components as follows:

_With script setup syntax_

```html
<template>
  <div class="column items-center justify-center q-gutter-y-md">
    <!-- breakpoints -->
    <div v-if="min">On smaller screen</div>
    <div v-if="mid" :class="`${somewhere ? 'text-red' : 'text-black'}`">
      On Medium screen
    </div>
    <div v-if="max">On Bigger screen!!</div>
  </div>
</template>

<script setup>
  import { br } from "vue3-br";

  const { min, mid, max, somewhere } = br;
</script>
```

_With setup function syntax_
  
```html
<template>
  <div class="column items-center justify-center q-gutter-y-md">
    <!-- breakpoints -->
    <div v-if="min">On smaller screen</div>
    <div v-if="mid" :class="`${somewhere ? 'text-red' : 'text-black'}`">
      On Medium screen
    </div>
    <div v-if="max">On Bigger screen!!</div>
  </div>
</template>

<script>
  import { br } from "vue3-br";

  export default {
    setup() {
      const { min, mid, max, somewhere } = br;

      return { min, mid, max, somewhere };
    },
  };
</script>
```

<br>
<br>
<br>

> ## Working With Height

**vue3-br** is capable of tracking the device height. We work with height the sameway we work with width but the only difference is in naming our breakpoints in the definition object. We suffix our names with `H`(capital H) to tell `vue3-br` that the breakpoint should track the device height.

As follows,

```js
import { createApp } from "vue";
import { createBr } from "vue3-br";

const app = createApp({});

const br = createBr({
  minH: [0, 700],
  midH: [701, 1024],
  somewhereH: [900, 1024]
  maxH: [1025],
});

app.use(br);
```

<br>
<br>

> ## Default Breakpoints

**vue3-br** comes with default breakpoints but you are neither tied to them nor unable to redefine them. You can use them, redefine them or even create the new one.

Here is a default definition,

```js
const defns = {
  min: [0, 699],
  mid: [700, 1023],
  mode: [1024, 1299],
  max: [1300],
  xminH: [499],
  minH: [500, 699],
  midH: [700, 849],
  modeH: [850, 999],
  maxH: [1000],
};
```

---

<br/>
<br/>

_Please star this plugin on github if you find it useful!_
<a href="https://github.com/dilungasr/vue3-br">vue3-br by Dilunga SR</a>

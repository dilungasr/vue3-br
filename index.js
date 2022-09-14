import { ref, reactive } from "vue";

// breakpoint definitions
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

// breakpoint states goes here
export const br = {};

// br global properties on the vue app globalProperties
const brGlobal = { br: {} };

// caller calls all all the media query watcher functions to test the media query (Call Of Duty)
function caller() {
  for (let i = mediaQueryHandlers.length; i--; ) {
    mediaQueryHandlers[i]();
  }
}

// sizeWatcher the watchman for the breakpoints
export function sizeWatcher() {
  // test the media query just after instantiating the store
  caller();
  // test media query onresize
  window.onresize = caller;
}

// mediaQueryHandlers stores the function that tests the defined media queries
const mediaQueryHandlers = [];

// Vue plugin for configuring breakpoints and accessing vuex store
export const createBr = (options = defns) => {
  //update configurations
  const configuredOpts = Object.entries(options);
  for (let i = configuredOpts.length; i--; ) {
    const key = configuredOpts[i][0];
    const val = configuredOpts[i][1];

    // update the defns configurations
    defns[key] = val;
  }

  // create updators and media query watchers for each configuration
  const allDefns = Object.entries(defns);
  allDefns.forEach((opt) => {
    const key = opt[0];
    const val = opt[1];

    // check if value is of array type
    if (!Array.isArray(val)) {
      throw new Error(`breakpoint ${key} should be defined using an array`);
    }

    //add configuration to the module state with an initial state
    br[key] = ref(false);

    // INTERPRET VALUES TO CREATE MEDIA QUERY STRING
    const measure = key.charAt(key.length - 1) === "H" ? "height" : "width";

    //   media query string
    let mqlStr = "";
    const boundCount = val.length;

    // both upper and lower bound defined
    if (boundCount === 2) {
      //if both upper and lower bound defined
      if (typeof val[0] === "number" && typeof val[1] === "number") {
        mqlStr = `(min-${measure}: ${val[0]}px) and (max-${measure}: ${val[1]}px)`;
      }
      //invalid value
      else {
        throw new Error(`breakpoint '${key}' has one or more invalid value `);
      }
    }

    // only lower bound defined
    else if (boundCount === 1) {
      if (typeof val[0] === "number") {
        mqlStr = `(min-${measure}: ${val[0]}px)`;
      }
      //invalid value
      else {
        throw new Error(`breakpoint '${key}' has one or more invalid value`);
      }
    }

    // invalid syntaxy
    else {
      throw new Error(`breakpoint ${key} should only have  1 or 2 values`);
    }

    // CREATE MEDIA QUERY HANDLER FUNCTION
    const mediaQueryHandler = () => {
      const mql = window.matchMedia(mqlStr);

      // fire the mutation to update breakpoint
      br[key].value = mql.matches;
      brGlobal.br[key] = mql.matches;
    };
    // add media query watcher handler
    mediaQueryHandlers.push(mediaQueryHandler);
  });

  // CREATE VUE PLUGIN TO RUN THIS PACKAGE BEFORE THE VUE APP INSTANCE GETS INSTANTIATED
  return (app) => {
    //inject br's global property in the vue app instance
    app.config.globalProperties.$br = reactive({});

    // keep the reference for media query handlers
    brGlobal.br = app.config.globalProperties.$br;

    // initialize all the definitions in the brGlobal
    const allDefns = Object.entries(defns);
    allDefns.forEach((objEntry) => {
      const key = objEntry[0];
      const val = objEntry[1];

      brGlobal.br[key] = val;
    });
    // start the sizeWatcher
    sizeWatcher();
  };
};

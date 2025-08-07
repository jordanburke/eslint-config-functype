
import recommended from "./configs/recommended"
import strict from "./configs/strict"

// ESLint 9.x Flat Config Plugin
const plugin = {
  configs: {
    recommended,
    strict,
  },
  // Meta information
  meta: {
    name: "eslint-config-functype",
    version: "1.2.0",
  },
}

export = plugin
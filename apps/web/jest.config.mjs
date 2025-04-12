import nextJest from "next/jest.js";

import config from "@maw/jest-preset/base";

const createJestConfig = nextJest({
  dir: "./",
});

export default createJestConfig(config);

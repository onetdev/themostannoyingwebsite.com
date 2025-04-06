import nextJest from "next/jest.js";

import config from "@maw/testing/jest/base.config";

const createJestConfig = nextJest({
  dir: "./",
});

export default createJestConfig(config);

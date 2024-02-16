import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    info: {
      title: "team-project-durian-backend",
      version: "1.0.0",
      description: "team-project-durian-backend",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Krit Kasemtewin",
        url: "https://github.com/Fakepng",
        email: "contact@fakepng.com",
      },
    },
    produces: ["application/json"],
  },
  apis: ["./src/routes/*.ts"],
};

export { swaggerOptions };

import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import httpCode from "./constants/http.code.constant";
import httpReason from "./constants/http.reason.constant";
import { checkENV } from "./utils/environment.util";
import { logger } from "./utils/logger.util";
import { corsOptions } from "./config/cors.config";
import { swaggerOptions } from "./config/swagger.config";
import basePath from "./routes/base.route";
import durianV1 from "./routes/v1/durian.route";

dotenv.config();
checkENV();

const app = express();
const specs = swaggerJsdoc(swaggerOptions);

app.use(helmet()); //Security
app.disable("x-powered-by"); //Reduce Fingerprinting

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(httpCode.INTERNAL_SERVER_ERROR)
    .send(httpReason.INTERNAL_SERVER_ERROR);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  logger.http(`${ip} [${req.method}] ${req.url}`);
  next();
});

app.use("/", basePath);
app.use("/v1/durian", durianV1);

if (process.env.NODE_ENV !== "production") {
  console.log("Swagger UI is running at /api-docs");
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
}

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpCode.NOT_FOUND).send(httpReason.NOT_FOUND);
});

app.listen(parseInt(process.env.PORT || "3000"), () => {
  console.log(`Server running at port ${process.env.PORT || "3000"} 🚀`);
});

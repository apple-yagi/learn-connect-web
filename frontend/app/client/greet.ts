import {
  createConnectTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";
import { GreetService } from "~/greet/v1/greet_connectweb";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8888/",
});

export const client = createPromiseClient(GreetService, transport);

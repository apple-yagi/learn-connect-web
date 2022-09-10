import {
  createConnectTransport,
  createPromiseClient,
} from "@bufbuild/connect-web";
import { useEffect, useState } from "react";
import type { GreetResponse } from "~/greet/v1/greet_pb";
import { GreetService } from "../greet/v1/greet_connectweb";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8888/",
});

const client = createPromiseClient(GreetService, transport);

export default function Index() {
  const [res, setRes] = useState<GreetResponse>();

  useEffect(() => {
    const init = async () => {
      const r = await client.greet({ name: "名前" });
      setRes(r);
    };
    init();
  }, []);

  return <div>{res?.greeting}</div>;
}

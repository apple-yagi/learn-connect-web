import { useEffect, useState } from "react";
import { client } from "~/client/greet";
import type { GreetResponse } from "~/greet/v1/greet_pb";

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

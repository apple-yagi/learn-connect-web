import { json, type MetaFunction, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "~/client/greet";
import type { GreetResponse } from "~/greet/v1/greet_pb";

export const loader: LoaderFunction = async ({ params }) => {
  const greet = await client.greet({ name: params.name });
  return json(greet);
};

export const meta: MetaFunction = ({ params }) => ({
  title: `Hello ${params.name}`,
  description: `greet ${params.name}`,
});

export default function $name() {
  const data = useLoaderData<GreetResponse>();

  return <div>{data.greeting}</div>;
}

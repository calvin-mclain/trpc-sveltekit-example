import { browser } from '$app/env';
import type { Router } from '$lib/server/trpc';
import trpcTransformer from '$lib/trcpTransformer';
import type { TRPCClient } from '@trpc/client';
import * as trpc from '@trpc/client';
import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server';

let client: TRPCClient<Router>;
export default (loadFetch?: typeof fetch) => {
  if (!client) {
    const url = browser ? '/trpc' : 'http://localhost:3000/trpc';
    client = trpc.createTRPCClient<Router>({
      url: loadFetch ? '/trpc' : url,
      transformer: trpcTransformer,
      ...(loadFetch && { fetch: loadFetch })
    });
  }
  return client;
};

export type Query = keyof Router['_def']['queries'];
export type Mutation = keyof Router['_def']['mutations'];

export type InferQueryOutput<RouteKey extends Query> = inferProcedureOutput<
  Router['_def']['queries'][RouteKey]
>;
export type InferQueryInput<RouteKey extends Query> = inferProcedureInput<
  Router['_def']['queries'][RouteKey]
>;
export type InferMutationOutput<RouteKey extends Mutation> = inferProcedureOutput<
  Router['_def']['mutations'][RouteKey]
>;
export type InferMutationInput<RouteKey extends Mutation> = inferProcedureInput<
  Router['_def']['mutations'][RouteKey]
>;

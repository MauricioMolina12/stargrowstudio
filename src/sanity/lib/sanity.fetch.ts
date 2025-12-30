import { sanityResponse } from "../models/sanity-response";
import { client } from "./client";


export async function sanityFetch<T>({query, params = {}, tags = [], revalidate = false}: sanityResponse) {
  return client.fetch<T>(query, params)
}
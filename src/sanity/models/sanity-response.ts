export interface sanityResponse {
    query: string
    params?: Record<string, any>
    tags?: string[]
    revalidate?: number | false
}


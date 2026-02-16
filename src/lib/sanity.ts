import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 't1vzj9vq',
    dataset: 'production',
    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: '2026-02-16', // use current date (YYYY-MM-DD) to target the latest API version
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}

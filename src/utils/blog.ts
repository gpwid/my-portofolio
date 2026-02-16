import { client } from '../lib/sanity';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  authorImage?: any; // Sanity image object for author
  thumbnail?: any; // Sanity image object
  description?: string;
  tags?: string[];
  body: any; // Portable Text
}

export async function getPosts(): Promise<BlogPost[]> {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    "date": publishedAt,
    "author": author->name,
    "authorImage": author->image,
    "thumbnail": mainImage,
    "description": body[0].children[0].text,
    "tags": categories[]->title,
    body
  }`);

  return posts;
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    "date": publishedAt,
    "author": author->name,
    "authorImage": author->image,
    "thumbnail": mainImage,
    "tags": categories[]->title,
    body
  }`, { slug });

  return post;
}

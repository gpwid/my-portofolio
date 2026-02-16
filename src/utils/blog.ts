import frontMatter from 'front-matter';

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    author: string;
    thumbnail?: string;
    description?: string;
    tags?: string[];
    body: string; // The raw markdown content
}

export interface FrontMatterAttributes {
    title: string;
    date: string;
    author: string;
    thumbnail?: string;
    description?: string;
    tags?: string[];
}

export function getAllPosts(): BlogPost[] {
    const modules = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true });

    const posts: BlogPost[] = Object.keys(modules).map((path) => {
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        const content = modules[path] as string;
        const { attributes, body } = frontMatter<FrontMatterAttributes>(content);

        return {
            slug,
            title: attributes.title,
            date: attributes.date,
            author: attributes.author || 'Gusti Panji Widodo',
            thumbnail: attributes.thumbnail,
            description: attributes.description,
            tags: attributes.tags,
            body
        };
    });

    // Sort by date descending
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
    const posts = getAllPosts();
    return posts.find((post) => post.slug === slug);
}

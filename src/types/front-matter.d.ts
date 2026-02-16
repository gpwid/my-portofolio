declare module 'front-matter' {
    interface FrontMatterResult<T> {
        attributes: T;
        body: string;
        bodyBegin: number;
        frontmatter: string;
    }
    function frontMatter<T>(markdown: string): FrontMatterResult<T>;
    export = frontMatter;
}

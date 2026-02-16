import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/blog';
import { format } from 'date-fns';
import { User, Tag } from 'lucide-react';

export default function Blog() {
    const [activeTag, setActiveTag] = useState<string>('all');

    const [currentPage, setCurrentPage] = useState(1);
    const POSTS_PER_PAGE = 10;

    const posts = useMemo(() => getAllPosts(), []);

    // Extract unique tags from all posts
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        posts.forEach(post => {
            post.tags?.forEach(tag => tags.add(tag));
        });
        return ['all', ...Array.from(tags)];
    }, [posts]);

    // Reset page when tag changes
    const handleTagChange = (tag: string) => {
        setActiveTag(tag);
        setCurrentPage(1);
    };

    const filteredPosts = useMemo(() => {
        if (activeTag === 'all') return posts;
        return posts.filter(post => post.tags?.includes(activeTag));
    }, [activeTag, posts]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const currentPosts = filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-12 border-b border-white/10 pb-6">
                <h1 className="text-4xl font-bold mb-2 text-white">
                    <span className="text-red-600">/</span> TRANSMISSIONS
                </h1>
                <p className="text-gray-400 font-mono text-sm">
          // ACCESSING ARCHIVED LOGS...
                </p>
            </div>

            {/* Tags Filter */}
            <div className="flex flex-wrap gap-4 mb-8 font-mono text-sm">
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => handleTagChange(tag)}
                        className={`px-4 py-2 border transition-all uppercase tracking-wider ${activeTag === tag
                                ? 'border-red-500 text-red-500 bg-red-500/10'
                                : 'border-white/10 text-gray-500 hover:border-gray-500 hover:text-gray-300'
                            }`}
                    >
                        {`[ ${tag} ]`}
                    </button>
                ))}
            </div>

            {/* Blog List */}
            <div className="space-y-4">
                {currentPosts.map((post) => (
                    <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="block group border border-white/5 bg-white/5 hover:border-red-500/50 hover:bg-white/10 transition-all p-4 md:flex items-center gap-6"
                    >
                        {/* Date - Compact */}
                        <div className="md:w-32 shrink-0 font-mono text-xs text-gray-500 group-hover:text-red-400 transition-colors mb-2 md:mb-0">
                            {format(new Date(post.date), 'yyyy-MM-dd')}
                        </div>

                        {/* Content */}
                        <div className="grow">
                            <h3 className="text-lg text-gray-200 font-bold group-hover:text-white transition-colors mb-1">
                                {post.title}
                            </h3>
                            <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                                <span className="flex items-center gap-1">
                                    <User size={12} /> {post.author}
                                </span>
                                {post.tags && post.tags.length > 0 && (
                                    <span className="flex items-center gap-1 opacity-50">
                                        <Tag size={12} /> {post.tags.join(', ')}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Arrow/Action */}
                        <div className="text-gray-600 group-hover:text-red-500 font-mono text-xs">
                            &gt; READ_ENTRY
                        </div>
                    </Link>
                ))}

                {currentPosts.length === 0 && (
                    <div className="text-center py-12 text-gray-600 font-mono">
                // NO_DATA_FOUND
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/10 font-mono text-sm">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 border border-white/10 hover:border-red-500 hover:text-red-500 transition-colors disabled:opacity-50 disabled:hover:border-white/10 disabled:hover:text-gray-500 disabled:cursor-not-allowed`}
                    >
                        &lt; PREV
                    </button>

                    <span className="text-gray-500">
                        PAGE {currentPage} / {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 border border-white/10 hover:border-red-500 hover:text-red-500 transition-colors disabled:opacity-50 disabled:hover:border-white/10 disabled:hover:text-gray-500 disabled:cursor-not-allowed`}
                    >
                        NEXT &gt;
                    </button>
                </div>
            )}
        </div>
    );
}

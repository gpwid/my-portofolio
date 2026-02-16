import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/blog';
import { format } from 'date-fns';
import { User, Tag } from 'lucide-react';

export default function Blog() {
    const [activeTab, setActiveTab] = useState<'all' | 'tech' | 'personal'>('all');

    // In a real app, we'd filter based on tags/categories in frontmatter.
    // For now, since we don't have tags in the sample, we'll just show all or mock it.
    // Let's assume 'layout' or specific tags are used.
    // For this MVF (Minimum Viable Feature), tabs might just filter by arbitrary logic or be placeholders.
    // I will add a TODO to implement real filtering.

    const posts = useMemo(() => getAllPosts(), []);

    const filteredPosts = useMemo(() => {
        if (activeTab === 'all') return posts;
        // content filtering logic would go here
        return posts;
    }, [activeTab, posts]);

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

            {/* Tabs */}
            <div className="flex gap-4 mb-8 font-mono text-sm">
                {['all', 'tech', 'personal'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-4 py-2 border transition-all uppercase tracking-wider ${activeTab === tab
                            ? 'border-red-500 text-red-500 bg-red-500/10'
                            : 'border-white/10 text-gray-500 hover:border-gray-500 hover:text-gray-300'
                            }`}
                    >
                        {`[ ${tab} ]`}
                    </button>
                ))}
            </div>

            {/* Blog List */}
            <div className="space-y-4">
                {filteredPosts.map((post) => (
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
                                {/* Placeholder for tags if we had them */}
                                <span className="flex items-center gap-1 opacity-50">
                                    <Tag size={12} /> LOG
                                </span>
                            </div>
                        </div>

                        {/* Arrow/Action */}
                        <div className="text-gray-600 group-hover:text-red-500 font-mono text-xs">
                            &gt; READ_ENTRY
                        </div>
                    </Link>
                ))}

                {filteredPosts.length === 0 && (
                    <div className="text-center py-12 text-gray-600 font-mono">
                // NO_DATA_FOUND
                    </div>
                )}
            </div>
        </div>
    );
}

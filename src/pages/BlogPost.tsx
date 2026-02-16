import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from '../utils/blog';
import { format } from 'date-fns';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const post = getPostBySlug(slug || '');

    useEffect(() => {
        if (!post) {
            // Typically we might redirect or show 404
            // navigate('/blog'); 
        }
    }, [post, navigate]);

    if (!post) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center font-mono text-red-500">
                <h1 className="text-4xl mb-4">404 :: ERROR</h1>
                <p>FILE_NOT_FOUND</p>
                <Link to="/blog" className="mt-8 border border-red-500 px-6 py-2 hover:bg-red-500 hover:text-black transition-colors">
                    &lt; RETURN_TO_ROOT
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-red-500 mb-8 font-mono text-sm transition-colors group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                BACK_TO_LOGS
            </Link>

            <article>
                {/* Header */}
                <header className="mb-12 border-b border-white/10 pb-8">
                    <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-500 mb-4">
                        <span className="flex items-center gap-1 text-red-500">
                            <Calendar size={12} />
                            {format(new Date(post.date), 'MMMM dd, yyyy')}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {format(new Date(post.date), 'HH:mm')} LOCAL
                        </span>
                        <span className="flex items-center gap-1">
                            <User size={12} />
                            {post.author}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {post.thumbnail && (
                        <div className="w-full h-64 md:h-96 overflow-hidden border border-white/10 rounded-sm mb-8 bg-white/5">
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>
                    )}
                </header>

                {/* Content */}
                <div className="prose prose-invert prose-red max-w-none font-mono">
                    <ReactMarkdown
                        components={{
                            // Using 'any' cast for now as react-markdown types are complex with the 'node' prop
                            h1: ({ node, ...props }: any) => <h1 className="text-2xl font-bold mb-4 text-white" {...props} />,
                            h2: ({ node, ...props }: any) => <h2 className="text-xl font-bold mb-3 text-white border-l-2 border-red-500 pl-4" {...props} />,
                            p: ({ node, ...props }: any) => <p className="mb-4 text-gray-300 leading-relaxed" {...props} />,
                            ul: ({ node, ...props }: any) => <ul className="list-disc list-inside mb-4 text-gray-300" {...props} />,
                            ol: ({ node, ...props }: any) => <ol className="list-decimal list-inside mb-4 text-gray-300" {...props} />,
                            a: ({ node, ...props }: any) => <a className="text-red-500 hover:underline" {...props} />,
                            code: ({ node, ...props }: any) => <code className="bg-white/10 text-red-300 px-1 py-0.5 rounded text-sm" {...props} />,
                            pre: ({ node, ...props }: any) => <pre className="bg-black border border-white/10 p-4 rounded overflow-auto mb-4" {...props} />,
                            blockquote: ({ node, ...props }: any) => <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-400 my-4" {...props} />,
                        }}
                    >
                        {post.body}
                    </ReactMarkdown>
                </div>
            </article>

            {/* Footer / Signature */}
            <div className="mt-16 pt-8 border-t border-white/10 text-right font-mono text-xs text-gray-600">
          // END_OF_TRANSMISSION
            </div>
        </div>
    );
}

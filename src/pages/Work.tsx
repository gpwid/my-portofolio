import { useState, useMemo } from 'react';
import { ArrowRight, Search, Filter } from 'lucide-react';
import { projects } from '../data/projects';

export default function Work() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Derive unique tags from all projects
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        projects.forEach(p => p.tags.forEach(t => tags.add(t)));
        return Array.from(tags).sort();
    }, []);

    // Filter projects
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch =
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.desc.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true;

            return matchesSearch && matchesTag;
        });
    }, [searchQuery, selectedTag]);

    return (
        <div className="min-h-screen pt-24 px-6 md:px-12 font-mono text-gray-300">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-12 border-b border-white/10 pb-8">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                        ALL <span className="text-red-600">PROJECTS</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl">
                        A comprehensive archive of my development work, experiments, and prototypes.
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-start md:items-center justify-between">

                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-3 focus:outline-none focus:border-red-500 transition-colors font-mono"
                        />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${selectedTag === null
                                    ? 'bg-red-600 border-red-600 text-white'
                                    : 'bg-transparent border-white/10 text-gray-400 hover:border-red-500/50'
                                }`}
                        >
                            All
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                                className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${selectedTag === tag
                                        ? 'bg-red-600 border-red-600 text-white'
                                        : 'bg-transparent border-white/10 text-gray-400 hover:border-red-500/50'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, idx) => (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={idx}
                                className="group bg-white/5 border border-white/10 hover:border-red-500/50 transition-colors duration-300 rounded-sm overflow-hidden flex flex-col"
                            >
                                <div className="h-48 w-full relative overflow-hidden bg-black">
                                    <img src={project.img} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-red-400 text-[10px] font-mono px-3 py-1 border border-red-500/30 rounded-full">
                                        {project.status}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-display font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                                            {project.title}
                                        </h3>
                                        <ArrowRight size={18} className="text-gray-500 group-hover:text-red-400 transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                                    </div>
                                    <p className="text-sm text-gray-400 mb-6 leading-relaxed font-mono line-clamp-3">
                                        {project.desc}
                                    </p>
                                    <div className="mt-auto flex gap-2 flex-wrap">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-mono uppercase bg-white/5 text-gray-300 px-2 py-1 rounded-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-500 border border-dashed border-white/10">
                            <Filter size={32} className="mx-auto mb-4 opacity-50" />
                            <p>No projects found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
                                className="mt-4 text-red-500 hover:underline text-sm uppercase tracking-wider"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

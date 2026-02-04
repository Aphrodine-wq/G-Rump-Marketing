import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { motion } from 'framer-motion';
import { Menu, X, ChevronRight, Search, FileText, Hash } from 'lucide-react';
import DocsSidebar from '../components/DocsSidebar';
import { getDocContent } from '../utils/docsLoader';

// CSS for code highlighting
import 'highlight.js/styles/github.css'; // Switched to light theme highlighting

const DocsPage: React.FC = () => {
  const params = useParams();
  // If no slug, default to README
  const slug = params['*'] || 'README';
  
  const [content, setContent] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      // Small delay to smooth transition
      await new Promise(r => setTimeout(r, 50));
      
      const md = getDocContent(slug);
      
      if (md) {
        setContent(md);
      } else {
        setContent('# 404 - Document Not Found\n\nThe requested documentation page could not be found.');
      }
      setIsLoading(false);
    };

    loadContent();
    window.scrollTo(0, 0);
  }, [slug]);

  // Extract title from slug or content
  const title = slug.split('/').pop()?.replace(/_/g, ' ').replace(/-/g, ' ') || 'Documentation';

  return (
    <div className="pt-20 min-h-screen bg-app text-[#1a1a2e] font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:gap-12 lg:gap-16">
          
          {/* Mobile Sidebar Toggle */}
          <div className="md:hidden mb-6 flex items-center justify-between border-b border-[#e5e7eb] pb-4">
             <div className="flex items-center gap-2 text-[#1a1a2e] font-bold">
               <FileText size={18} className="text-[#7c3aed]" />
               <span>{title}</span>
             </div>
             <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-[#4a4a5a] hover:bg-[#f5f5f7] rounded-lg transition-colors"
             >
                <Menu size={20} />
             </button>
          </div>

          {/* Sidebar (Desktop) */}
          <aside className="hidden md:block w-64 shrink-0 border-r border-[#e5e7eb] sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-6 custom-scrollbar">
             <div className="relative mb-8 group">
                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280] group-focus-within:text-[#7c3aed] transition-colors" />
                 <input 
                    type="text" 
                    placeholder="Search docs..." 
                    className="input-field w-full pl-9 pr-4 py-2 rounded-lg text-sm"
                 />
             </div>
             <DocsSidebar />
          </aside>

          {/* Mobile Sidebar Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 bg-app md:hidden animate-fade-in-up flex flex-col">
               <div className="flex items-center justify-between p-4 border-b border-[#e5e7eb]">
                  <span className="font-bold text-lg text-[#1a1a2e]">Documentation</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-[#f5f5f7] rounded-full text-[#4a4a5a]">
                     <X size={24} />
                  </button>
               </div>
               <div className="flex-1 overflow-y-auto p-4">
                  <DocsSidebar onCloseMobile={() => setIsMobileMenuOpen(false)} />
               </div>
            </div>
          )}

          {/* Main Content */}
          <motion.main 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 min-w-0 pb-24"
          >
            {/* Breadcrumbs */}
            <nav className="flex items-center text-xs font-medium text-[#6b7280] mb-8 overflow-x-auto whitespace-nowrap pb-2">
              <Link to="/docs" className="hover:text-[#7c3aed] transition-colors">Docs</Link>
              {slug.split('/').map((part, i, arr) => (
                <React.Fragment key={i}>
                  <ChevronRight size={12} className="mx-2 shrink-0 text-[#e5e7eb]" />
                  <span className={i === arr.length - 1 ? 'text-[#1a1a2e] font-bold bg-[#f5f5f7] px-2 py-0.5 rounded-md' : 'hover:text-[#1a1a2e] transition-colors'}>
                    {part.replace(/_/g, ' ').replace(/-/g, ' ')}
                  </span>
                </React.Fragment>
              ))}
            </nav>

            {isLoading ? (
               <div className="space-y-6 animate-pulse max-w-3xl">
                  <div className="h-12 bg-[#f5f5f7] rounded-lg w-3/4"></div>
                  <div className="space-y-3">
                     <div className="h-4 bg-[#f5f5f7] rounded w-full"></div>
                     <div className="h-4 bg-[#f5f5f7] rounded w-5/6"></div>
                     <div className="h-4 bg-[#f5f5f7] rounded w-4/6"></div>
                  </div>
                  <div className="h-40 bg-[#f5f5f7] rounded-xl w-full mt-8"></div>
               </div>
            ) : (
              <article className="prose prose-lg prose-slate max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#1a1a2e] 
                prose-h1:text-4xl prose-h1:mb-8
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-[#e5e7eb] prose-h2:pb-2
                prose-p:text-[#4a4a5a] prose-p:leading-7 prose-p:mb-6
                prose-a:text-[#7c3aed] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-code:text-[#7c3aed] prose-code:bg-[rgba(124,58,237,0.1)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-code:border prose-code:border-[rgba(124,58,237,0.2)]
                prose-pre:bg-[#1a1a2e] prose-pre:border prose-pre:border-[#e5e7eb] prose-pre:rounded-xl prose-pre:shadow-lg
                prose-img:rounded-xl prose-img:shadow-md prose-img:border prose-img:border-[#e5e7eb]
                prose-table:border prose-table:border-[#e5e7eb] prose-table:rounded-lg prose-table:overflow-hidden
                prose-th:bg-[#f5f5f7] prose-th:text-[#1a1a2e] prose-th:p-4 prose-th:font-semibold
                prose-td:p-4 prose-td:text-[#4a4a5a] prose-td:border-t prose-td:border-[#e5e7eb]
                prose-li:text-[#4a4a5a] prose-li:marker:text-[#7c3aed]
              ">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]} 
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                  components={{
                    // Custom link renderer to handle internal links
                    a: ({ node, ...props }) => {
                       const href = props.href || '';
                       if (href.startsWith('http')) {
                          return <a {...props} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1" />;
                       }
                       // Handle internal markdown links
                       if (href.endsWith('.md')) {
                          const newHref = `/docs/${href.replace('.md', '')}`;
                          return <Link to={newHref}>{props.children}</Link>;
                       }
                       return <a {...props} />;
                    }
                  }}
                >
                  {content || ''}
                </ReactMarkdown>
              </article>
            )}
            
            <div className="mt-20 pt-8 border-t border-[#e5e7eb] flex flex-col sm:flex-row justify-between text-sm text-[#6b7280] gap-4">
               <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7c3aed]"></span>
                  <span>Version 2.1.0 · Last updated: February 2026</span>
               </div>
               <a href="#" className="flex items-center gap-2 hover:text-[#7c3aed] transition-colors font-medium">
                  Edit this page on GitHub <ChevronRight size={14} />
               </a>
            </div>
          </motion.main>

          {/* Table of Contents (Right Sidebar) */}
          <div className="hidden xl:block w-64 shrink-0 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pl-8 border-l border-[#e5e7eb]">
             <div className="flex items-center gap-2 text-xs font-bold text-[#1a1a2e] uppercase tracking-widest mb-6">
                <Hash size={12} className="text-[#7c3aed]" />
                On this page
             </div>
             <ul className="space-y-3 text-sm relative border-l border-[#e5e7eb] ml-1.5 pl-4">
                <li className="text-[#7c3aed] font-bold -ml-[17px] border-l-2 border-[#7c3aed] pl-4 transition-all">Overview</li>
                <li className="text-[#4a4a5a] hover:text-[#1a1a2e] cursor-pointer transition-colors">Prerequisites</li>
                <li className="text-[#4a4a5a] hover:text-[#1a1a2e] cursor-pointer transition-colors">Installation</li>
                <li className="text-[#4a4a5a] hover:text-[#1a1a2e] cursor-pointer transition-colors">Configuration</li>
                <li className="text-[#4a4a5a] hover:text-[#1a1a2e] cursor-pointer transition-colors">Next Steps</li>
             </ul>
             <div className="mt-8 p-4 badge rounded-xl">
                <h6 className="font-bold text-[#7c3aed] text-sm mb-1">Need help?</h6>
                <p className="text-xs text-[#7c3aed] mb-3 leading-relaxed">Join our Discord community for real-time support.</p>
                <a href="#" className="block w-full py-1.5 btn-primary text-center text-xs font-bold rounded-lg">
                   Join Discord
                </a>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DocsPage;

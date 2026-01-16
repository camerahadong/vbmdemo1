import React, { useState } from 'react';
import { BLOG_POSTS } from '../constants';
import { Calendar, User, ArrowRight, Tag, Search } from 'lucide-react';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1552674605-469523f9bc9d?auto=format&fit=crop&q=80&w=800'; // Fallback to group run image
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Tin tức & Blog</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">Chia sẻ kinh nghiệm, kiến thức chạy bộ, dinh dưỡng và những câu chuyện truyền cảm hứng từ cộng đồng.</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
         <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-orange-600 text-white shadow-md' 
                    : 'bg-white text-slate-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
         </div>

         <div className="relative w-full md:w-64">
           <input 
             type="text" 
             placeholder="Tìm kiếm bài viết..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
           />
           <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
         </div>
      </div>

      {/* Featured Post (First one) */}
      {selectedCategory === 'All' && !searchTerm && BLOG_POSTS.length > 0 && (
        <div className="mb-12 group cursor-pointer">
           <div className="relative h-96 rounded-2xl overflow-hidden">
             <img 
              src={BLOG_POSTS[0].imageUrl} 
              alt={BLOG_POSTS[0].title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              onError={handleImageError}
            />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
             <div className="absolute bottom-0 left-0 p-8 md:p-12">
               <span className="inline-block px-3 py-1 bg-orange-600 text-white text-xs font-bold uppercase tracking-wider rounded-md mb-3">
                 {BLOG_POSTS[0].category}
               </span>
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-orange-300 transition-colors">
                 {BLOG_POSTS[0].title}
               </h2>
               <p className="text-slate-200 text-lg mb-6 max-w-2xl line-clamp-2">
                 {BLOG_POSTS[0].excerpt}
               </p>
               <div className="flex items-center text-slate-300 text-sm space-x-6">
                 <span className="flex items-center"><User size={16} className="mr-2" /> {BLOG_POSTS[0].author}</span>
                 <span className="flex items-center"><Calendar size={16} className="mr-2" /> {BLOG_POSTS[0].date}</span>
               </div>
             </div>
           </div>
        </div>
      )}

      {/* Grid Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, idx) => {
          // Skip first post if we are showing the featured one
          if (idx === 0 && selectedCategory === 'All' && !searchTerm) return null;
          
          return (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  onError={handleImageError}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-slate-800 uppercase">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-slate-500 mb-3 space-x-3">
                  <span className="flex items-center"><Calendar size={14} className="mr-1" /> {post.date}</span>
                  <span className="flex items-center"><User size={14} className="mr-1" /> {post.author}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <button className="flex items-center text-orange-600 font-semibold text-sm hover:underline mt-auto">
                  Đọc tiếp <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredPosts.length === 0 && (
         <div className="text-center py-20">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4 text-slate-400">
               <Search size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Không tìm thấy bài viết nào</h3>
            <p className="text-slate-500">Vui lòng thử từ khóa hoặc danh mục khác.</p>
         </div>
      )}
    </div>
  );
};

export default Blog;
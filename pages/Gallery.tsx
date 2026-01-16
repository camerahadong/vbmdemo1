import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_ALBUMS } from '../constants';
import { Album } from '../types';
import { Camera, Image as ImageIcon, X, ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Race' | 'Training' | 'Social'>('All');
  
  // Lightbox State
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const filteredAlbums = filter === 'All' 
    ? GALLERY_ALBUMS 
    : GALLERY_ALBUMS.filter(album => album.tag === filter);

  const openAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setCurrentImageIndex(0);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setSelectedAlbum(null);
    document.body.style.overflow = 'unset';
  }, []);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedAlbum) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedAlbum.images.length);
    }
  }, [selectedAlbum]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedAlbum) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedAlbum.images.length) % selectedAlbum.images.length);
    }
  }, [selectedAlbum]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, closeLightbox, nextImage, prevImage]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1552674605-469523f9bc9d?auto=format&fit=crop&q=80&w=600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center">
            <Camera className="mr-3 text-orange-600" /> Thư viện Album
          </h1>
          <p className="text-slate-500 mt-2">Lưu giữ những khoảnh khắc đẹp nhất trên đường chạy.</p>
        </div>
        
        <div className="mt-4 md:mt-0 bg-white border border-gray-200 p-1 rounded-lg flex shadow-sm">
           {['All', 'Race', 'Training', 'Social'].map((f) => (
             <button
               key={f}
               onClick={() => setFilter(f as any)}
               className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                 filter === f ? 'bg-slate-900 text-white shadow' : 'text-slate-500 hover:text-slate-900 hover:bg-gray-50'
               }`}
             >
               {f === 'All' ? 'Tất cả' : f}
             </button>
           ))}
        </div>
      </div>

      {/* Album Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAlbums.map((album) => (
          <div 
            key={album.id} 
            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            onClick={() => openAlbum(album)}
          >
            <div className="relative h-64 overflow-hidden">
               <img 
                 src={album.coverUrl} 
                 alt={album.title} 
                 className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                 onError={handleImageError}
               />
               
               {/* Overlay Content */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
               
               <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                  <ImageIcon size={14} className="mr-1" /> {album.images.length}
               </div>

               <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                 <div className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">{album.tag}</div>
                 <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-orange-200 transition-colors">{album.title}</h3>
                 <div className="flex items-center text-xs text-slate-300">
                    <Calendar size={14} className="mr-1" /> {album.date}
                 </div>
               </div>
            </div>
            <div className="p-4 bg-white">
                <p className="text-slate-500 text-sm line-clamp-2">{album.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Fancybox Custom Implementation */}
      {isLightboxOpen && selectedAlbum && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm animate-fade-in h-screen w-screen overflow-hidden">
          
          {/* 1. Lightbox Header */}
          <div className="flex-shrink-0 flex justify-between items-center p-4 text-white z-[101] bg-gradient-to-b from-black/80 to-transparent">
             <div>
                <h3 className="font-bold text-lg text-shadow">{selectedAlbum.title}</h3>
                <p className="text-xs text-slate-300 font-mono">
                  {currentImageIndex + 1} / {selectedAlbum.images.length}
                </p>
             </div>
             <button 
               onClick={closeLightbox} 
               className="p-2 bg-white/10 hover:bg-white/30 rounded-full transition-colors focus:outline-none"
             >
                <X size={24} />
             </button>
          </div>

          {/* 2. Main Image Area (Flex Grow to take available space) */}
          <div className="flex-1 min-h-0 relative flex items-center justify-center p-2 group" onClick={closeLightbox}>
             <img 
               src={selectedAlbum.images[currentImageIndex].url} 
               alt={selectedAlbum.images[currentImageIndex].caption} 
               className="max-h-full max-w-full object-contain shadow-2xl rounded-sm select-none"
               onClick={(e) => e.stopPropagation()} 
               onError={handleImageError}
             />

             {/* Caption Overlay */}
             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full text-white text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden md:block">
                <p className="font-medium text-sm">{selectedAlbum.images[currentImageIndex].caption}</p>
             </div>
             
             {/* Large Navigation Buttons */}
             <button 
               className="absolute left-2 top-1/2 transform -translate-y-1/2 p-4 text-white/50 hover:text-white hover:bg-black/20 rounded-full transition-all md:block hidden focus:outline-none"
               onClick={prevImage}
             >
               <ChevronLeft size={48} />
             </button>
             <button 
               className="absolute right-2 top-1/2 transform -translate-y-1/2 p-4 text-white/50 hover:text-white hover:bg-black/20 rounded-full transition-all md:block hidden focus:outline-none"
               onClick={nextImage}
             >
               <ChevronRight size={48} />
             </button>
          </div>

          {/* 3. Bottom Thumbnails Strip (Fixed Height) */}
          <div className="flex-shrink-0 h-24 bg-black/90 flex items-center justify-center border-t border-white/10 relative z-[101]">
             <div className="flex items-center space-x-2 overflow-x-auto px-4 py-2 w-full max-w-5xl justify-start md:justify-center scrollbar-hide h-full">
               {selectedAlbum.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                    className={`relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden transition-all duration-200 border-2 ${
                      currentImageIndex === idx 
                        ? 'border-orange-500 opacity-100 scale-105' 
                        : 'border-transparent opacity-40 hover:opacity-80 hover:scale-105'
                    }`}
                  >
                     <img 
                       src={img.url} 
                       className="w-full h-full object-cover" 
                       alt={`Thumbnail ${idx}`} 
                       onError={handleImageError} 
                     />
                  </button>
               ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
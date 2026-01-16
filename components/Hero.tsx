import React from 'react';
import { ArrowRight, Activity, Users, Trophy } from 'lucide-react';

interface HeroProps {
  onJoin: () => void;
}

const Hero: React.FC<HeroProps> = ({ onJoin }) => {
  return (
    <div className="relative bg-slate-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1552674605-469523f9bc9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Runners" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="lg:w-2/3">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Chinh phục <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Giới Hạn</span><br />
            Kết nối <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Đam Mê</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Tham gia cộng đồng chạy bộ năng động nhất Việt Nam. Theo dõi thành tích, thi đua trên bảng xếp hạng và tham gia các giải chạy hấp dẫn.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={onJoin}
              className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-lg shadow-orange-600/30 transition-all transform hover:-translate-y-1 flex items-center justify-center"
            >
              Tham gia ngay
              <ArrowRight className="ml-2" size={20} />
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-all flex items-center justify-center border border-white/20">
              Tìm hiểu thêm
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { label: 'Thành viên', value: '2,500+', icon: Users },
             { label: 'Km đã chạy', value: '150K+', icon: Activity },
             { label: 'Giải chạy', value: '45', icon: Trophy },
             { label: 'Sự kiện năm', value: '12', icon: Calendar },
           ].map((stat, idx) => {
             const Icon = stat.icon;
             return (
               <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                 <div className="flex items-center space-x-3 mb-2">
                   <Icon className="text-orange-400" size={20} />
                   <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</span>
                 </div>
                 <div className="text-2xl font-bold text-white">{stat.value}</div>
               </div>
             )
           })}
        </div>
      </div>
    </div>
  );
};

// Helper for icon
import { Calendar } from 'lucide-react';

export default Hero;

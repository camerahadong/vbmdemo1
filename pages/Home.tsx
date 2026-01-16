import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Calendar, Users, Trophy, MapPin, Shirt, Clock, ChevronRight, Zap, Target, Heart, TrendingUp } from 'lucide-react';
import { EVENTS, BLOG_POSTS, USERS } from '../constants';
import { UserLevel } from '../types';

interface HomeProps {
  onJoin: () => void;
  onNavigate: (page: string) => void;
}

// --- Animation Helper ---
const useOnScreen = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); 
      }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [ref, options]);

  return [ref, isVisible] as const;
};

const FadeIn: React.FC<{ children: React.ReactNode; className?: string; delay?: string }> = ({ children, className = '', delay = '0' }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  return (
    <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`} style={{ transitionDelay: delay }}>
      {children}
    </div>
  );
};

const Home: React.FC<HomeProps> = ({ onJoin, onNavigate }) => {
  // Use data from constants directly. USERS is already sorted by distance in constants.ts
  // Slice top 20 users
  const top20Users = USERS.slice(0, 20);

  const podium = [top20Users[1], top20Users[0], top20Users[2]]; // 2nd, 1st, 3rd
  const listRunners = top20Users.slice(3); // 4th to 20th

  return (
    <div className="font-sans overflow-x-hidden bg-white text-slate-900">
      
      {/* 1. HERO SECTION: Ấn tượng đầu tiên */}
      <div className="relative h-[90vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="VN RunClub Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <FadeIn className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span>Est. 2020 • Hanoi, Vietnam</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-bold text-white leading-tight mb-6">
              KẾT NỐI <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">ĐAM MÊ</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 font-light max-w-xl leading-relaxed">
              Không chỉ là chạy bộ. Chúng tôi là một cộng đồng, một gia đình, nơi mỗi bước chân đều kể một câu chuyện về sự nỗ lực và vinh quang.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={onJoin} className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center">
                Đăng Ký Thành Viên <ArrowRight size={20} className="ml-2" />
              </button>
              <button onClick={() => onNavigate('about')} className="px-8 py-4 border border-white/30 hover:bg-white/10 text-white font-bold rounded-lg backdrop-blur-sm transition-all">
                Tìm Hiểu CLB
              </button>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* 2. STATS BAR: Thống kê nổi bật */}
      <div className="bg-slate-900 py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Thành viên', value: '2,500+', icon: Users, color: 'text-blue-500' },
              { label: 'Tổng KM tích lũy', value: '150K+', icon: MapPin, color: 'text-orange-500' },
              { label: 'Giải thưởng', value: '45', icon: Trophy, color: 'text-yellow-500' },
              { label: 'Năm hoạt động', value: '4', icon: Calendar, color: 'text-green-500' },
            ].map((stat, idx) => (
              <FadeIn key={idx} delay={`${idx * 100}ms`} className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* 3. CLUB IDENTITY: Màu cờ sắc áo */}
      <div className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image/Visual Side */}
            <FadeIn className="relative">
              <div className="absolute -inset-4 bg-orange-100 rounded-[2rem] transform -rotate-2"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1530143311094-34d807799e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80" 
                  alt="VN RunClub Jersey" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-900/90 to-transparent">
                  <div className="flex items-center space-x-3 text-white">
                    <Shirt size={24} className="text-orange-500" />
                    <span className="font-bold uppercase tracking-widest">Official Kit 2024</span>
                  </div>
                </div>
              </div>
              
              {/* Badge/Logo Overlay */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-white rounded-full p-2 shadow-xl animate-bounce-slow">
                 <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center border-4 border-orange-500 text-white font-display font-bold text-center leading-none text-xs">
                    VN<br/><span className="text-2xl text-orange-500">RC</span><br/>2024
                 </div>
              </div>
            </FadeIn>

            {/* Text Side */}
            <FadeIn delay="200ms">
              <h2 className="text-orange-600 font-bold tracking-widest uppercase mb-4 text-sm">Bản Sắc CLB</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">MÀU CAM CỦA <br/> NHIỆT HUYẾT</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Màu áo cam của VN RunClub không chỉ để nhận diện trên đường chạy, đó là biểu tượng của năng lượng cháy bỏng, sự đoàn kết và tinh thần không bao giờ bỏ cuộc.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Kỷ Luật Thép", desc: "Chúng tôi tin rằng sự nhất quán tạo nên kết quả phi thường." },
                  { title: "Đồng Đội", desc: "Không ai bị bỏ lại phía sau. Chúng tôi cùng nhau xuất phát, cùng nhau về đích." },
                  { title: "Chuyên Nghiệp", desc: "Giáo án bài bản, tổ chức khoa học, hướng tới thành tích đỉnh cao." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mt-1">
                      {idx === 0 ? <Target size={20} /> : idx === 1 ? <Heart size={20} /> : <Zap size={20} />}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* 3.5. HALL OF FAME: Bảng vàng */}
      <div className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-orange-600 font-bold tracking-widest uppercase mb-4 text-sm">Bảng Vàng Thành Tích</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900">TOP RUNNERS THÁNG</h3>
            </div>
          </FadeIn>

          {/* Podium (Top 3) */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-6 md:gap-4 mb-12">
            {podium.map((user, idx) => {
                if (!user) return null;
                const isFirst = idx === 1; // Vị trí giữa mảng top3 là người hạng 1
                const rank = isFirst ? 1 : idx === 0 ? 2 : 3;
                
                return (
                  <FadeIn 
                    key={user.id} 
                    delay={`${rank * 200}ms`} 
                    className={`
                      relative flex flex-col items-center w-full max-w-[280px] md:max-w-xs
                      ${isFirst 
                        ? 'order-1 md:order-2 md:-mt-12 z-10'  // Mobile: order 1 (top), Desktop: order 2 (center, raised)
                        : rank === 2 
                          ? 'order-2 md:order-1'                // Mobile: order 2, Desktop: order 1 (left)
                          : 'order-3 md:order-3'                // Mobile: order 3, Desktop: order 3 (right)
                      }
                    `}
                  >
                    <div className={`relative rounded-2xl p-6 w-full text-center shadow-xl transition-transform hover:-translate-y-2 
                      ${isFirst 
                        ? 'bg-gradient-to-b from-orange-500 to-orange-600 text-white transform scale-100 md:scale-110' // Scale 110% only on desktop
                        : 'bg-white text-slate-900'
                      }`}>
                      
                      {/* Rank Badge */}
                      <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg
                        ${isFirst ? 'bg-yellow-400 text-orange-900' : rank === 2 ? 'bg-slate-300 text-slate-700' : 'bg-orange-200 text-orange-800'}`}>
                        {rank}
                      </div>

                      {/* Avatar */}
                      <div className="mt-4 mb-4 relative inline-block">
                        <img src={user.avatar} alt={user.firstName} className={`w-24 h-24 rounded-full object-cover border-4 ${isFirst ? 'border-white/30' : 'border-slate-100'}`} />
                        {isFirst && <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-orange-900 p-1.5 rounded-full shadow-sm"><Trophy size={16} /></div>}
                      </div>
                      
                      <h4 className={`text-xl font-bold mb-1 truncate px-2 ${isFirst ? 'text-white' : 'text-slate-900'}`}>{user.firstName} {user.lastName}</h4>
                      <p className={`text-sm mb-4 ${isFirst ? 'text-orange-100' : 'text-slate-500'}`}>Level {user.level}</p>
                      
                      <div className={`text-3xl font-display font-bold ${isFirst ? 'text-white' : 'text-orange-600'}`}>
                        {user.totalDistance} <span className="text-sm font-sans font-normal opacity-70">km</span>
                      </div>
                    </div>
                  </FadeIn>
                );
            })}
          </div>

          {/* Top 4-20 List */}
          <FadeIn delay="600ms" className="max-w-4xl mx-auto mt-12">
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-4 md:px-6 py-4 bg-slate-50 border-b border-gray-100 flex items-center justify-between">
                   <h4 className="font-bold text-slate-700 uppercase text-xs md:text-sm tracking-wider flex items-center">
                     <TrendingUp size={16} className="mr-2 text-orange-600" />
                     <span className="hidden sm:inline">Danh sách theo sau (Top 4 - 20)</span>
                     <span className="sm:hidden">Top 4 - 20</span>
                   </h4>
                   <span className="text-[10px] md:text-xs text-slate-500 font-medium">Cập nhật: Hôm nay</span>
                </div>
                <div className="divide-y divide-gray-50">
                   {listRunners.map((user, index) => (
                      <div key={user.id} className="flex items-center px-4 md:px-6 py-3 md:py-4 hover:bg-orange-50/50 transition-colors group">
                         <div className="w-6 md:w-8 text-center font-bold text-slate-400 text-sm">{index + 4}</div>
                         <div className="flex items-center flex-1 ml-3 md:ml-4 overflow-hidden">
                            <img src={user.avatar} className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-100 mr-2 md:mr-3 flex-shrink-0" alt="avatar" />
                            <div className="min-w-0">
                               <div className="font-bold text-slate-900 text-sm group-hover:text-orange-600 transition-colors truncate pr-2">
                                  {user.firstName} {user.lastName}
                                </div>
                               <div className="text-[10px] md:text-xs text-slate-400 truncate">Level {user.level}</div>
                            </div>
                         </div>
                         <div className="text-right flex-shrink-0">
                            <div className="font-bold text-slate-800 text-sm">{user.totalDistance} km</div>
                            {user.streak > 3 && (
                               <div className="text-[10px] text-orange-500 flex items-center justify-end">
                                  <Zap size={10} className="mr-0.5 fill-current" /> <span className="hidden sm:inline">{user.streak} day streak</span><span className="sm:hidden">{user.streak} days</span>
                                </div>
                            )}
                         </div>
                      </div>
                   ))}
                </div>
                <div className="bg-gray-50 px-6 py-3 text-center border-t border-gray-100">
                    <button onClick={() => onNavigate('leaderboard')} className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors">
                       Xem toàn bộ bảng xếp hạng &rarr;
                    </button>
                </div>
             </div>
          </FadeIn>
        </div>
      </div>

      {/* 4. WEEKLY SCHEDULE: Lịch chạy */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-slate-900">LỊCH HOẠT ĐỘNG TUẦN</h2>
            <div className="w-20 h-1.5 bg-orange-600 mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-500">Hãy tham gia cùng chúng tôi tại các điểm tập quen thuộc</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { day: 'Thứ 3', type: 'Speed / Interval', time: '18:30', loc: 'SVĐ Mỹ Đình', level: 'High Intensity' },
              { day: 'Thứ 5', type: 'Tempo Run', time: '18:30', loc: 'Công Viên Thống Nhất', level: 'Moderate' },
              { day: 'Chủ Nhật', type: 'Long Run (LSD)', time: '05:00', loc: 'Hồ Hoàn Kiếm', level: 'Endurance' },
            ].map((schedule, idx) => (
              <FadeIn key={idx} delay={`${idx * 150}ms`}>
                <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Clock size={80} className="text-orange-600" />
                  </div>
                  <div className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-2">{schedule.day}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{schedule.type}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-slate-600">
                      <Clock size={18} className="mr-3 text-slate-400" /> {schedule.time}
                    </div>
                    <div className="flex items-center text-slate-600">
                      <MapPin size={18} className="mr-3 text-slate-400" /> {schedule.loc}
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Zap size={18} className="mr-3 text-slate-400" /> {schedule.level}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <button onClick={() => onNavigate('events')} className="inline-flex items-center text-slate-600 font-bold hover:text-orange-600 transition-colors">
                Xem toàn bộ lịch sự kiện <ChevronRight size={20} className="ml-1" />
             </button>
          </div>
        </div>
      </div>

      {/* 5. LATEST NEWS: Tin tức */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl font-display font-bold text-slate-900">BẢN TIN RUNCLUB</h2>
            <button onClick={() => onNavigate('blog')} className="hidden md:block px-6 py-2 border border-slate-200 rounded-full font-bold text-slate-600 hover:bg-slate-900 hover:text-white transition-colors">
              Xem Tất Cả
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {BLOG_POSTS.slice(0, 3).map((post, idx) => (
              <FadeIn key={post.id} delay={`${idx * 150}ms`}>
                <div className="group cursor-pointer flex flex-col h-full" onClick={() => onNavigate('blog')}>
                  <div className="h-60 overflow-hidden rounded-2xl mb-6 relative">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-slate-900">
                      {post.category}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center text-xs text-slate-500 mb-3 space-x-2">
                       <span>{post.date}</span>
                       <span>•</span>
                       <span>{post.author}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-orange-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 line-clamp-2 text-sm mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                    <span className="text-orange-600 font-bold text-sm inline-flex items-center mt-auto">
                      Đọc tiếp <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* 6. FINAL CTA: Tham gia */}
      <div className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/10 transform skew-x-12 translate-x-20"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">ĐỪNG CHẠY MỘT MÌNH</h2>
          <p className="text-xl text-slate-400 mb-10 font-light">
            Gia nhập VN RunClub ngay hôm nay để kết nối với hàng nghìn runners, nhận giáo án tập luyện và tham gia các giải chạy đỉnh cao.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
             <button onClick={onJoin} className="w-full sm:w-auto px-10 py-4 bg-orange-600 text-white font-bold rounded-lg text-lg hover:bg-white hover:text-orange-600 transition-all shadow-xl shadow-orange-900/50">
               Đăng Ký Thành Viên (Miễn Phí)
             </button>
             <div className="text-slate-500 text-sm mt-4 sm:mt-0">
                Đã có tài khoản? <button className="text-white underline hover:text-orange-500">Đăng nhập ngay</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

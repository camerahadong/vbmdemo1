import React from 'react';
import { ACTIVITIES, EVENTS, USERS } from '../constants';
import { Calendar, MapPin, Clock, Trophy, ChevronRight, Heart, MessageCircle, Share2, Activity as ActivityIcon } from 'lucide-react';

interface ActivitiesProps {
  onJoin: () => void;
  onNavigate: (page: string) => void;
}

const Activities: React.FC<ActivitiesProps> = ({ onJoin, onNavigate }) => {
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: Activity Feed */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                <ActivityIcon className="mr-2 text-orange-600" />
                Hoạt động mới nhất
              </h2>
            </div>

            <div className="space-y-6">
              {ACTIVITIES.map((activity) => {
                const user = USERS.find(u => u.id === activity.userId);
                if (!user) return null;

                return (
                  <div key={activity.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center mb-4">
                        <img src={user.avatar} alt={user.firstName} className="w-10 h-10 rounded-full mr-3" />
                        <div>
                          <div className="font-semibold text-slate-800 text-sm">
                            {user.firstName} {user.lastName} 
                            <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Level {user.level}</span>
                          </div>
                          <div className="text-xs text-slate-500">{new Date(activity.date).toLocaleString('vi-VN')}</div>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-2">{activity.name}</h3>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-slate-500 uppercase">Distance</div>
                          <div className="text-xl font-bold text-slate-800">{activity.distance} km</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 uppercase">Pace</div>
                          <div className="text-xl font-bold text-slate-800">
                             {Math.floor(activity.averagePace / 60)}:{(activity.averagePace % 60).toString().padStart(2, '0')} /km
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 uppercase">Time</div>
                          <div className="text-xl font-bold text-slate-800">{formatTime(activity.movingTime)}</div>
                        </div>
                      </div>

                      {/* Map Placeholder */}
                      <div className="w-full h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-slate-400">
                         <MapPin size={24} className="mr-2" /> Map View Unavailable in Preview
                      </div>

                      <div className="flex items-center space-x-6 text-slate-500 text-sm pt-4 border-t border-gray-100">
                        <button className="flex items-center space-x-1 hover:text-orange-600">
                          <Heart size={18} /> <span>{activity.kudos} Kudos</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-600">
                          <MessageCircle size={18} /> <span>Comment</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-green-600 ml-auto">
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800 text-lg flex items-center">
                  <Calendar className="mr-2 text-orange-600" size={20} />
                  Sự kiện sắp tới
                </h3>
                <button onClick={() => onNavigate('events')} className="text-orange-600 text-sm font-medium hover:underline">Xem thêm</button>
              </div>

              <div className="space-y-4">
                {EVENTS.slice(0, 3).map(event => (
                  <div key={event.id} className="flex space-x-3 group cursor-pointer" onClick={() => onNavigate('events')}>
                    <div className="flex-shrink-0 w-14 h-14 bg-orange-50 rounded-lg flex flex-col items-center justify-center text-orange-600 border border-orange-100">
                       <span className="text-xs font-semibold uppercase">{new Date(event.date).toLocaleString('en-US', { month: 'short' })}</span>
                       <span className="text-xl font-bold leading-none">{new Date(event.date).getDate()}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-orange-600 transition-colors line-clamp-1">{event.name}</h4>
                      <div className="flex items-center text-xs text-slate-500 mt-1">
                        <MapPin size={12} className="mr-1" /> {event.location}
                      </div>
                       <div className="flex items-center text-xs text-slate-500 mt-0.5">
                        <Clock size={12} className="mr-1" /> {event.distance}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini Leaderboard */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center">
                  <Trophy className="mr-2 text-yellow-400" size={20} />
                  Top Tuần Này
                </h3>
                <button onClick={() => onNavigate('leaderboard')} className="text-slate-300 text-xs hover:text-white flex items-center">
                  Chi tiết <ChevronRight size={14} />
                </button>
              </div>

              <div className="space-y-4">
                {USERS.slice(0, 3).map((user, idx) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold 
                        ${idx === 0 ? 'bg-yellow-400 text-slate-900' : idx === 1 ? 'bg-gray-300 text-slate-900' : 'bg-amber-700 text-white'}`}>
                        {idx + 1}
                      </div>
                      <img src={user.avatar} className="w-8 h-8 rounded-full border border-white/20" alt="avt" />
                      <span className="font-medium text-sm">{user.firstName} {user.lastName}</span>
                    </div>
                    <span className="font-bold text-sm text-orange-400">{user.totalDistance} km</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Join Promo */}
            <div className="bg-orange-600 rounded-xl shadow-md p-6 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
               <h3 className="font-bold text-xl mb-2">Mục tiêu 2024?</h3>
               <p className="text-orange-100 text-sm mb-4">Tham gia thử thách "Century Club" - Chinh phục 100km tháng này!</p>
               <button className="w-full py-2 bg-white text-orange-600 font-bold rounded-lg text-sm hover:bg-gray-50 transition">Đăng ký ngay</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;

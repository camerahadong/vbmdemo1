import React from 'react';
import { User, ActivityType } from '../types';
import { USERS, ACTIVITIES, BADGES } from '../constants';
import { MapPin, Calendar, Activity, Zap, Award, Settings } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  // Mock data for charts
  const weeklyData = [
    { name: 'T2', km: 5 },
    { name: 'T3', km: 8 },
    { name: 'T4', km: 0 },
    { name: 'T5', km: 12 },
    { name: 'T6', km: 6 },
    { name: 'T7', km: 21 },
    { name: 'CN', km: 15 },
  ];

  const paceData = [
    { month: 'Jan', pace: 6.5 },
    { month: 'Feb', pace: 6.2 },
    { month: 'Mar', pace: 6.0 },
    { month: 'Apr', pace: 5.8 },
    { month: 'May', pace: 5.5 },
    { month: 'Jun', pace: 5.2 },
  ];

  return (
    <div className="animate-fade-in pb-12">
      {/* Header Profile */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
           <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
             <div className="relative">
                <img src={user.avatar} className="w-32 h-32 rounded-full border-4 border-white shadow-lg" alt="Profile" />
                <div className="absolute bottom-0 right-0 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white">
                  Lvl {user.level}
                </div>
             </div>
             
             <div className="flex-1 text-center md:text-left">
               <h1 className="text-3xl font-bold text-slate-900">{user.firstName} {user.lastName}</h1>
               <div className="flex items-center justify-center md:justify-start space-x-4 text-slate-500 mt-2 text-sm">
                 <span className="flex items-center"><MapPin size={16} className="mr-1" /> {user.city}</span>
                 <span className="flex items-center"><Calendar size={16} className="mr-1" /> Joined 2021</span>
               </div>
               
               {/* XP Bar */}
               <div className="mt-4 max-w-md">
                 <div className="flex justify-between text-xs font-semibold mb-1">
                   <span className="text-orange-600">{user.xp} XP</span>
                   <span className="text-slate-400">Next Level: 10,000 XP</span>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-2.5">
                   <div className="bg-gradient-to-r from-orange-500 to-red-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                 </div>
               </div>
             </div>

             <div className="flex space-x-3">
               <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center">
                 <Settings size={16} className="mr-2" /> Settings
               </button>
               <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 shadow-md">
                 Edit Profile
               </button>
             </div>
           </div>

           {/* Quick Stats Grid */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100">
             <div className="text-center md:text-left">
               <div className="text-slate-500 text-xs uppercase tracking-wider font-semibold mb-1">Total Distance</div>
               <div className="text-2xl font-bold text-slate-900">{user.totalDistance.toLocaleString()} <span className="text-sm font-normal text-slate-500">km</span></div>
             </div>
             <div className="text-center md:text-left">
               <div className="text-slate-500 text-xs uppercase tracking-wider font-semibold mb-1">Activities</div>
               <div className="text-2xl font-bold text-slate-900">142</div>
             </div>
             <div className="text-center md:text-left">
               <div className="text-slate-500 text-xs uppercase tracking-wider font-semibold mb-1">Avg Pace</div>
               <div className="text-2xl font-bold text-slate-900">5:24 <span className="text-sm font-normal text-slate-500">/km</span></div>
             </div>
             <div className="text-center md:text-left">
               <div className="text-slate-500 text-xs uppercase tracking-wider font-semibold mb-1">Streak</div>
               <div className="text-2xl font-bold text-orange-600 flex items-center justify-center md:justify-start">
                 <Zap size={20} className="mr-1 fill-current" /> {user.streak} days
               </div>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Stats */}
          <div className="lg:col-span-2 space-y-8">
             
             {/* Charts */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h3 className="font-bold text-slate-800 mb-6 flex items-center">
                 <Activity className="mr-2 text-orange-600" size={20} /> Hoạt động tuần này
               </h3>
               <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={weeklyData}>
                     <XAxis dataKey="name" axisLine={false} tickLine={false} />
                     <YAxis hide />
                     <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                     <Bar dataKey="km" fill="#ea580c" radius={[4, 4, 0, 0]} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
             </div>

             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-slate-800 mb-6">Tiến bộ Pace (Tốc độ)</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={paceData}>
                      <defs>
                        <linearGradient id="colorPace" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis domain={[4, 8]} hide />
                      <Tooltip />
                      <Area type="monotone" dataKey="pace" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPace)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>

             {/* Personal Records */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <h3 className="font-bold text-slate-800 mb-4">Thành tích cá nhân (PB)</h3>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                 {[
                   { dist: '5K', time: '22:15', date: 'Oct 2023' },
                   { dist: '10K', time: '46:30', date: 'Sep 2023' },
                   { dist: 'HM', time: '1:45:10', date: 'Jun 2023' },
                   { dist: 'FM', time: '3:58:20', date: 'Jan 2023' },
                 ].map((pr, i) => (
                   <div key={i} className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                     <div className="text-sm font-bold text-slate-400 mb-1">{pr.dist}</div>
                     <div className="text-xl font-bold text-slate-800">{pr.time}</div>
                     <div className="text-xs text-slate-400 mt-1">{pr.date}</div>
                   </div>
                 ))}
               </div>
             </div>

          </div>

          {/* Right Column: Badges & More */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-slate-800 flex items-center">
                   <Award className="mr-2 text-yellow-500" size={20} /> Bộ sưu tập Huy hiệu
                 </h3>
                 <span className="text-xs text-slate-500">{user.badges.length} / 20</span>
               </div>
               
               <div className="grid grid-cols-3 gap-4">
                 {user.badges.map(badge => (
                   <div key={badge.id} className="flex flex-col items-center group cursor-pointer">
                     <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-3xl shadow-sm border border-gray-200 group-hover:scale-110 transition-transform group-hover:bg-yellow-50 group-hover:border-yellow-200">
                       {badge.icon}
                     </div>
                     <div className="text-xs font-medium text-center mt-2 text-slate-600 group-hover:text-slate-900">{badge.name}</div>
                   </div>
                 ))}
                 {/* Empty placeholders */}
                 {[1,2,3].map(i => (
                    <div key={i} className="flex flex-col items-center opacity-30 grayscale">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl border border-gray-200">
                        🔒
                      </div>
                      <div className="text-xs font-medium text-center mt-2">Locked</div>
                    </div>
                 ))}
               </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl p-6 text-white shadow-lg">
               <h3 className="font-bold mb-2">Thẻ thành viên</h3>
               <div className="flex justify-between items-start mb-8">
                 <div>
                   <div className="text-xs text-indigo-300 uppercase">Member Type</div>
                   <div className="font-bold text-lg">Premium Athlete</div>
                 </div>
                 <Activity className="text-indigo-400" />
               </div>
               <div className="text-xs text-indigo-300 mb-1">Card Number</div>
               <div className="font-mono text-lg tracking-wider mb-4">8823 •••• •••• 1092</div>
               <div className="flex justify-between text-xs">
                 <span>Valid thru: 12/25</span>
                 <span>VN RunClub</span>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useMemo, useState } from 'react';
import { USERS } from '../constants';
import { User, LeaderboardEntry } from '../types';
import { Trophy, TrendingUp, Filter, Medal, Download } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const [filterPeriod, setFilterPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [sortBy, setSortBy] = useState<'distance' | 'performance' | 'elevation'>('performance');

  // Calculate scores (simulated based on USERS constant)
  // In a real app, this would be done on the backend or aggregated from Activities
  const leaderboardData: LeaderboardEntry[] = useMemo(() => {
    return USERS.map(user => {
      // Mock random stats variation based on user level for demo purposes
      const modifier = user.level * 0.5; 
      const distance = user.totalDistance * (filterPeriod === 'week' ? 0.1 : filterPeriod === 'month' ? 0.3 : 1);
      const elevation = Math.floor(distance * 10); // Rough estimate
      
      // Calculate Performance Score (Simplified from prompt formula)
      // Score = Distance * 10 * ConsistencyMultiplier + ElevationBonus
      const consistencyMult = user.streak > 7 ? 1.2 : 1.0;
      const score = Math.floor((distance * 10 * consistencyMult) + (elevation / 100 * 5));

      return {
        ...user,
        totalDistance: parseFloat(distance.toFixed(1)), // update distance for this view
        rank: 0, // will set later
        performanceScore: score,
        elevation: elevation,
        paceStr: '5:30', // Mock avg pace
      };
    }).sort((a, b) => {
        if (sortBy === 'distance') return b.totalDistance - a.totalDistance;
        if (sortBy === 'elevation') return b.elevation - a.elevation;
        return b.performanceScore - a.performanceScore;
    }).map((entry, index) => ({ ...entry, rank: index + 1 }));
  }, [filterPeriod, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Bảng Xếp Hạng</h1>
        <p className="text-slate-500 mt-2">Vinh danh những đôi chân không mỏi của CLB.</p>
      </div>

      {/* Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 items-end transform md:scale-95 lg:scale-100">
        {/* 2nd Place */}
        {leaderboardData[1] && (
          <div className="bg-white rounded-t-xl rounded-b-lg shadow-sm p-6 flex flex-col items-center border-b-4 border-slate-300 order-2 md:order-1 h-64 justify-end">
            <img src={leaderboardData[1].avatar} className="w-20 h-20 rounded-full border-4 border-slate-300 mb-3" />
            <div className="text-slate-400 font-bold text-lg flex items-center"><span className="text-2xl mr-1">2</span> nd</div>
            <h3 className="font-bold text-slate-800 text-lg text-center">{leaderboardData[1].firstName} {leaderboardData[1].lastName}</h3>
            <p className="text-orange-600 font-bold">{leaderboardData[1].performanceScore} pts</p>
          </div>
        )}
        
        {/* 1st Place */}
        {leaderboardData[0] && (
          <div className="bg-white rounded-t-xl rounded-b-lg shadow-lg p-6 flex flex-col items-center border-b-4 border-yellow-400 order-1 md:order-2 z-10 h-72 justify-end transform -translate-y-2">
            <div className="absolute -top-5"><Medal className="text-yellow-400 w-10 h-10 drop-shadow-md" fill="currentColor" /></div>
            <img src={leaderboardData[0].avatar} className="w-24 h-24 rounded-full border-4 border-yellow-400 mb-3" />
            <div className="text-yellow-500 font-bold text-xl flex items-center"><span className="text-3xl mr-1">1</span> st</div>
            <h3 className="font-bold text-slate-800 text-xl text-center">{leaderboardData[0].firstName} {leaderboardData[0].lastName}</h3>
            <p className="text-orange-600 font-bold text-lg">{leaderboardData[0].performanceScore} pts</p>
            <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500 mt-1">Level {leaderboardData[0].level}</span>
          </div>
        )}

        {/* 3rd Place */}
        {leaderboardData[2] && (
          <div className="bg-white rounded-t-xl rounded-b-lg shadow-sm p-6 flex flex-col items-center border-b-4 border-amber-600 order-3 md:order-3 h-56 justify-end">
             <img src={leaderboardData[2].avatar} className="w-16 h-16 rounded-full border-4 border-amber-600 mb-3" />
            <div className="text-amber-700 font-bold text-lg flex items-center"><span className="text-2xl mr-1">3</span> rd</div>
            <h3 className="font-bold text-slate-800 text-base text-center">{leaderboardData[2].firstName} {leaderboardData[2].lastName}</h3>
            <p className="text-orange-600 font-bold">{leaderboardData[2].performanceScore} pts</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg self-start">
          {(['week', 'month', 'year'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setFilterPeriod(p)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                filterPeriod === p ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {p === 'week' ? 'Tuần này' : p === 'month' ? 'Tháng này' : 'Năm nay'}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
           <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-gray-200 text-slate-700 py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm font-medium"
              >
                <option value="performance">Điểm thành tích</option>
                <option value="distance">Tổng quãng đường</option>
                <option value="elevation">Độ cao (Leo núi)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <Filter size={16} />
              </div>
           </div>
           
           <button className="p-2 text-slate-500 hover:text-slate-800 border border-gray-200 rounded-lg">
             <Download size={20} />
           </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Hạng</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Vận động viên</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Distance (km)</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Elevation (m)</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right hidden sm:table-cell">Avg Pace</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leaderboardData.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm 
                      ${user.rank === 1 ? 'bg-yellow-100 text-yellow-700' : 
                        user.rank === 2 ? 'bg-gray-100 text-slate-700' :
                        user.rank === 3 ? 'bg-amber-100 text-amber-800' : 'text-slate-500'}`}>
                      {user.rank}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full border border-gray-200" src={user.avatar} alt="" />
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-slate-900">{user.firstName} {user.lastName}</div>
                        <div className="text-xs text-slate-500 flex items-center">
                          Level {user.level} 
                          {user.streak > 5 && <span className="ml-2 flex items-center text-orange-500"><TrendingUp size={12} className="mr-0.5" /> {user.streak} day streak</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-slate-700">
                    {user.totalDistance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-500">
                    {user.elevation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-slate-500 hidden sm:table-cell">
                    {user.paceStr}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {user.performanceScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

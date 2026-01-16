import React, { useState } from 'react';
import { EVENTS, USERS } from '../constants';
import { Event, EventRegistrant } from '../types';
import { Calendar, MapPin, Users, ArrowRight, X, User as UserIcon, CheckCircle, Clock } from 'lucide-react';

const Events: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [registrants, setRegistrants] = useState<EventRegistrant[]>([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  // Function to open event details and generate mock registrants
  const handleOpenEvent = (event: Event) => {
    setSelectedEvent(event);
    setHasJoined(false); // Reset joined status
    
    // Parse distances from string "5K, 10K, 21K" -> ["5K", "10K", "21K"]
    const distances = event.distance.split(',').map(d => d.trim());
    
    // Generate mock registrants from USERS list
    // We randomly pick some users to be already registered
    const mockRegistrants: EventRegistrant[] = USERS.map((user, index) => {
      // Deterministic pseudo-random based on user ID + event ID
      if ((index + event.id.length) % 2 === 0) { // Take roughly half users
        return {
          user: user,
          distance: distances[index % distances.length], // Assign random distance
          bib: `${(index + 1) * 100 + Math.floor(Math.random() * 99)}`, // Fake BIB
          registrationDate: '2023-10-15',
          status: 'Confirmed'
        };
      }
      return null;
    }).filter((item): item is EventRegistrant => item !== null);

    setRegistrants(mockRegistrants);
  };

  const handleCloseEvent = () => {
    setSelectedEvent(null);
    setIsRegistering(false);
  };

  const handleJoinEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    
    // Mock adding current user
    const distances = selectedEvent.distance.split(',').map(d => d.trim());
    const currentUser = USERS[0]; // Assume current logged in user is first mock user
    
    const newRegistrant: EventRegistrant = {
        user: currentUser,
        distance: (document.getElementById('distance-select') as HTMLSelectElement).value || distances[0],
        bib: 'PENDING',
        registrationDate: new Date().toISOString().split('T')[0],
        status: 'Confirmed'
    };

    setRegistrants([newRegistrant, ...registrants]);
    setHasJoined(true);
    setIsRegistering(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, globalThis.Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1552674605-469523f9bc9d?auto=format&fit=crop&q=80&w=800'; // Fallback image
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sự kiện & Giải chạy</h1>
          <p className="text-slate-500 mt-2">Đăng ký tham gia và chinh phục thử thách cùng đồng đội.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
           <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-gray-200 text-slate-600 hover:bg-gray-50'}`}>Tất cả</button>
           <button onClick={() => setFilter('Official')} className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'Official' ? 'bg-slate-900 text-white' : 'bg-white border border-gray-200 text-slate-600 hover:bg-gray-50'}`}>Giải chính thức</button>
           <button onClick={() => setFilter('Training')} className={`px-4 py-2 rounded-full text-sm font-medium ${filter === 'Training' ? 'bg-slate-900 text-white' : 'bg-white border border-gray-200 text-slate-600 hover:bg-gray-50'}`}>Training</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EVENTS.filter(e => filter === 'all' || e.type === filter).map(event => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer" onClick={() => handleOpenEvent(event)}>
            <div className="relative h-48 overflow-hidden">
              <img 
                src={event.imageUrl} 
                alt={event.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                onError={handleImageError}
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-slate-800">
                {event.type}
              </div>
              <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-md text-xs font-bold shadow-md">
                Sắp diễn ra
              </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-start justify-between mb-4">
                 <div>
                   <div className="text-orange-600 font-bold text-sm mb-1">{new Date(event.date).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
                   <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">{event.name}</h3>
                 </div>
              </div>

              <div className="space-y-3 text-slate-600 text-sm mb-6">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-slate-400" /> {event.location}
                </div>
                <div className="flex items-center">
                   <div className="w-4 h-4 mr-2 flex items-center justify-center text-slate-400 font-bold text-[10px] border border-slate-300 rounded-sm">KM</div>
                   {event.distance}
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-2 text-slate-400" /> {event.registeredCount} runners đã đăng ký
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors font-medium">
                  Chi tiết & Đăng ký <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EVENT DETAIL MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleCloseEvent}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in-up">
            
            {/* Modal Header Image */}
            <div className="relative h-48 sm:h-64 flex-shrink-0">
               <img 
                 src={selectedEvent.imageUrl} 
                 className="w-full h-full object-cover" 
                 alt="Event cover" 
                 onError={handleImageError}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
               <button onClick={handleCloseEvent} className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-md transition-colors">
                  <X size={24} />
               </button>
               <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white">
                  <span className="bg-orange-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2 inline-block">{selectedEvent.type}</span>
                  <h2 className="text-3xl sm:text-4xl font-bold leading-tight">{selectedEvent.name}</h2>
                  <div className="flex items-center space-x-4 mt-2 text-slate-200 text-sm font-medium">
                     <span className="flex items-center"><Calendar size={16} className="mr-1.5" /> {new Date(selectedEvent.date).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                     <span className="flex items-center"><MapPin size={16} className="mr-1.5" /> {selectedEvent.location}</span>
                  </div>
               </div>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
               
               {/* Left: Info & Registration */}
               <div className="w-full md:w-1/3 bg-slate-50 p-6 overflow-y-auto border-r border-gray-100 flex-shrink-0">
                  <h3 className="font-bold text-slate-900 mb-4 text-lg">Thông tin sự kiện</h3>
                  <div className="space-y-4 mb-8">
                     <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Cự ly</div>
                        <div className="font-bold text-slate-800 text-lg">{selectedEvent.distance}</div>
                     </div>
                     <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Đã đăng ký</div>
                        <div className="font-bold text-slate-800 text-lg flex items-center">
                           {registrants.length} <span className="text-sm font-normal text-slate-500 ml-1">thành viên</span>
                        </div>
                     </div>
                  </div>

                  {!hasJoined ? (
                     !isRegistering ? (
                       <button onClick={() => setIsRegistering(true)} className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center">
                          Đăng ký ngay
                       </button>
                     ) : (
                       <form onSubmit={handleJoinEvent} className="bg-white p-4 rounded-lg shadow-md border border-orange-200 animate-fade-in">
                          <h4 className="font-bold text-slate-800 mb-3">Xác nhận đăng ký</h4>
                          <div className="mb-3">
                             <label className="block text-xs font-semibold text-slate-500 mb-1">Chọn cự ly</label>
                             <select id="distance-select" className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none">
                                {selectedEvent.distance.split(',').map(d => (
                                   <option key={d} value={d.trim()}>{d.trim()}</option>
                                ))}
                             </select>
                          </div>
                          <div className="flex space-x-2">
                             <button type="button" onClick={() => setIsRegistering(false)} className="flex-1 py-2 bg-gray-200 text-slate-700 font-bold rounded text-sm hover:bg-gray-300">Hủy</button>
                             <button type="submit" className="flex-1 py-2 bg-orange-600 text-white font-bold rounded text-sm hover:bg-orange-700">Xác nhận</button>
                          </div>
                       </form>
                     )
                  ) : (
                     <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                        <CheckCircle className="mx-auto text-green-600 mb-2" size={32} />
                        <h4 className="font-bold text-green-800">Đã đăng ký thành công!</h4>
                        <p className="text-green-600 text-sm">Hẹn gặp bạn tại vạch xuất phát.</p>
                     </div>
                  )}
               </div>

               {/* Right: Registrants List */}
               <div className="w-full md:w-2/3 bg-white flex flex-col overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                     <h3 className="font-bold text-slate-900 flex items-center text-lg">
                        <Users className="mr-2 text-orange-600" size={20} /> 
                        Danh sách thành viên ({registrants.length})
                     </h3>
                     {/* Search mock */}
                     <input type="text" placeholder="Tìm thành viên..." className="text-sm border border-gray-200 rounded-full px-4 py-1.5 focus:outline-none focus:border-orange-500 w-48" />
                  </div>
                  
                  <div className="overflow-y-auto flex-grow p-0">
                     <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 sticky top-0">
                           <tr>
                              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">VĐV</th>
                              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Cự ly</th>
                              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">BIB</th>
                              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Trạng thái</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                           {registrants.length > 0 ? registrants.map((reg, idx) => (
                              <tr key={`${reg.user.id}-${idx}`} className="hover:bg-slate-50 transition-colors">
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                       <img className="h-10 w-10 rounded-full border border-gray-200" src={reg.user.avatar} alt="" />
                                       <div className="ml-3">
                                          <div className="text-sm font-bold text-slate-900">{reg.user.firstName} {reg.user.lastName}</div>
                                          <div className="text-xs text-slate-500">Level {reg.user.level}</div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                       {reg.distance}
                                    </span>
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-center font-mono text-sm text-slate-600">
                                    {reg.bib}
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${reg.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                       {reg.status === 'Confirmed' ? 'Đã xác nhận' : 'Chờ duyệt'}
                                    </span>
                                 </td>
                              </tr>
                           )) : (
                              <tr>
                                 <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                    Chưa có thành viên nào đăng ký. Hãy là người đầu tiên!
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Events;
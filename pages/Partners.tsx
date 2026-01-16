import React from 'react';
import { Users, TrendingUp, Globe, Mail, CheckCircle } from 'lucide-react';

const Partners: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-slate-900 py-24 overflow-hidden">
         <div className="absolute inset-0">
           <img 
             src="https://images.unsplash.com/photo-1556906781-9a412961d28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
             className="w-full h-full object-cover opacity-20" 
             alt="Running Shoes" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
         </div>
         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 font-display">Hợp Tác & Tài Trợ</h1>
           <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
             Đồng hành cùng cộng đồng chạy bộ lớn mạnh nhất Việt Nam. <br/>
             Kết nối thương hiệu của bạn với hàng ngàn người đam mê thể thao.
           </p>
         </div>
      </div>

      {/* Why Sponsor Us - Stats */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Tại sao chọn VN RunClub?</h2>
              <div className="w-20 h-1.5 bg-orange-600 mx-auto rounded-full"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-slate-50 rounded-2xl text-center hover:shadow-lg transition-shadow">
                 <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users size={32} />
                 </div>
                 <h3 className="text-4xl font-bold text-slate-900 mb-2">2,500+</h3>
                 <p className="text-slate-600 font-medium">Thành viên Active</p>
                 <p className="text-sm text-slate-400 mt-2">Độ tuổi 22-45, thu nhập hạng A/B</p>
              </div>
              
              <div className="p-8 bg-slate-50 rounded-2xl text-center hover:shadow-lg transition-shadow">
                 <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp size={32} />
                 </div>
                 <h3 className="text-4xl font-bold text-slate-900 mb-2">150K+</h3>
                 <p className="text-slate-600 font-medium">Km tích lũy hàng tháng</p>
                 <p className="text-sm text-slate-400 mt-2">Engagement rate cao trên Social</p>
              </div>

              <div className="p-8 bg-slate-50 rounded-2xl text-center hover:shadow-lg transition-shadow">
                 <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe size={32} />
                 </div>
                 <h3 className="text-4xl font-bold text-slate-900 mb-2">12+</h3>
                 <p className="text-slate-600 font-medium">Sự kiện lớn hàng năm</p>
                 <p className="text-sm text-slate-400 mt-2">Offline events tại HN & TP.HCM</p>
              </div>
           </div>
        </div>
      </div>

      {/* Current Partners */}
      <div className="py-16 bg-gray-50 border-y border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Đối Tác Chiến Lược</h2>
            
            {/* Diamond Tier */}
            <div className="mb-12">
               <div className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Nhà tài trợ Kim Cương</div>
               <div className="flex justify-center items-center gap-12 flex-wrap">
                  <div className="w-48 h-24 bg-white rounded-lg shadow-sm flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all cursor-pointer">
                     <span className="text-2xl font-black italic text-slate-800">NIKE</span>
                  </div>
                  <div className="w-48 h-24 bg-white rounded-lg shadow-sm flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all cursor-pointer">
                     <span className="text-2xl font-bold text-blue-900">GARMIN</span>
                  </div>
               </div>
            </div>

            {/* Gold Tier */}
            <div>
               <div className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Nhà tài trợ Vàng & Đối tác</div>
               <div className="flex justify-center items-center gap-8 flex-wrap">
                  {[1, 2, 3, 4, 5].map((i) => (
                     <div key={i} className="w-32 h-16 bg-white rounded flex items-center justify-center shadow-sm text-slate-300 font-bold">
                        LOGO {i}
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Sponsorship Packages */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Gói Tài Trợ</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Silver */}
              <div className="border border-gray-200 rounded-2xl p-8 hover:border-slate-300 transition-colors">
                 <h3 className="text-xl font-bold text-slate-600 mb-2">Gói Silver</h3>
                 <div className="text-3xl font-bold text-slate-900 mb-6">Liên hệ</div>
                 <ul className="space-y-4 mb-8">
                    <li className="flex items-start"><CheckCircle size={18} className="text-green-500 mr-2 mt-0.5" /> <span className="text-sm text-slate-600">Logo trên website (Footer)</span></li>
                    <li className="flex items-start"><CheckCircle size={18} className="text-green-500 mr-2 mt-0.5" /> <span className="text-sm text-slate-600">1 bài post giới thiệu trên Fanpage</span></li>
                    <li className="flex items-start"><CheckCircle size={18} className="text-green-500 mr-2 mt-0.5" /> <span className="text-sm text-slate-600">Logo trên Backdrop sự kiện nhỏ</span></li>
                 </ul>
                 <button className="w-full py-3 border border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition">Nhận báo giá</button>
              </div>

              {/* Gold - Highlighted */}
              <div className="border-2 border-orange-500 rounded-2xl p-8 relative shadow-xl transform md:-translate-y-4 bg-white">
                 <div className="absolute top-0 right-0 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                 <h3 className="text-xl font-bold text-orange-600 mb-2">Gói Gold</h3>
                 <div className="text-3xl font-bold text-slate-900 mb-6">Liên hệ</div>
                 <ul className="space-y-4 mb-8">
                    <li className="flex items-start"><CheckCircle size={18} className="text-green-500 mr-2 mt-0.5" /> <span className="text-sm text-slate-600 font-medium">Logo trên áo đấu CLB (Tay áo)</span></li>
                    <li className="flex items-start"><CheckCircle size={18} className="text-green-500 mr-2 mt-0.5" /> <span className="text-sm text-slate-600">Banner độc quyền trên Website</span></li>
                    <li className="flex items-start"><CheckCircle size={18} className="text-green-500 mr-2 mt-0.5" /> <span className="text-sm text-slate-600">Gian hàng tại sự kiện Big Off</span></li>
                    <li className="flex items-start"><CheckCircle size={18} className="text-green-500 mr-2 mt-0.5" /> <span className="text-sm text-slate-600">Email Marketing tới 2,500+ members</span></li>
                 </ul>
                 <button className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition shadow-lg shadow-orange-500/30">Liên hệ ngay</button>
              </div>

              {/* Diamond */}
              <div className="border border-gray-200 rounded-2xl p-8 hover:border-slate-300 transition-colors bg-slate-50">
                 <h3 className="text-xl font-bold text-blue-900 mb-2">Gói Diamond</h3>
                 <div className="text-3xl font-bold text-slate-900 mb-6">Thương lượng</div>
                 <ul className="space-y-4 mb-8">
                    <li className="flex items-start"><CheckCircle size={18} className="text-green-500 mr-2 mt-0.5" /> <span className="text-sm text-slate-600 font-bold">Logo vị trí ngực áo đấu</span></li>
                    <li className="flex items-start"><CheckCircle size={18} className="text-green-500 mr-2 mt-0.5" /> <span className="text-sm text-slate-600">Tài trợ danh vị (Title Sponsor)</span></li>
                    <li className="flex items-start"><CheckCircle size={18} className="text-green-500 mr-2 mt-0.5" /> <span className="text-sm text-slate-600">Độc quyền ngành hàng</span></li>
                    <li className="flex items-start"><CheckCircle size={18} className="text-green-500 mr-2 mt-0.5" /> <span className="text-sm text-slate-600">Full Access dữ liệu thành viên (ẩn danh)</span></li>
                 </ul>
                 <button className="w-full py-3 border border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition">Liên hệ VIP</button>
              </div>
           </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-slate-900 py-16 text-center px-4">
         <div className="inline-block p-4 bg-white/10 rounded-full mb-6">
            <Mail size={32} className="text-white" />
         </div>
         <h2 className="text-3xl font-bold text-white mb-4">Bạn muốn trở thành đối tác?</h2>
         <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Hãy gửi email cho chúng tôi để nhận Hồ sơ năng lực (Media Kit) và báo giá chi tiết.
         </p>
         <a href="mailto:sponsorship@vnrunclub.com" className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-gray-100 transition">
            Gửi Email: sponsorship@vnrunclub.com
         </a>
      </div>
    </div>
  );
};

export default Partners;
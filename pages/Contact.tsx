import React from 'react';
import { Mail, Phone, MapPin, Facebook, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Liên hệ với chúng tôi</h1>
          <p className="text-lg text-slate-500 mb-8">
            Bạn có câu hỏi về lịch tập, đăng ký thành viên hay hợp tác tài trợ? Đừng ngần ngại liên hệ với VN RunClub.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                <MapPin size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-slate-900">Địa điểm sinh hoạt chính</h3>
                <p className="text-slate-600">Công viên Thống Nhất (Cổng Trần Nhân Tông)<br />Quận Hai Bà Trưng, Hà Nội</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <Mail size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-slate-900">Email</h3>
                <p className="text-slate-600">contact@vnrunclub.com</p>
                <p className="text-slate-600">sponsorship@vnrunclub.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                <Phone size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-slate-900">Hotline</h3>
                <p className="text-slate-600">0987 654 321 (Mr. Hùng)</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
             <h4 className="font-bold text-slate-900 mb-4">Kết nối mạng xã hội</h4>
             <div className="flex space-x-4">
                <button className="w-10 h-10 bg-[#1877F2] text-white rounded-full flex items-center justify-center hover:opacity-90 transition">
                  <Facebook size={20} />
                </button>
                <button className="w-10 h-10 bg-[#FC4C02] text-white rounded-full flex items-center justify-center hover:opacity-90 transition font-bold text-xs">
                  S
                </button>
                <button className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center hover:opacity-90 transition font-bold text-xs">
                  Z
                </button>
             </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Gửi tin nhắn</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Họ tên</label>
                 <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition" placeholder="Nguyễn Văn A" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                 <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition" placeholder="email@example.com" />
               </div>
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Chủ đề</label>
               <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition">
                 <option>Đăng ký thành viên</option>
                 <option>Hợp tác / Tài trợ</option>
                 <option>Góp ý / Báo lỗi</option>
                 <option>Khác</option>
               </select>
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Nội dung</label>
               <textarea rows={5} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition" placeholder="Nội dung tin nhắn..."></textarea>
            </div>
            <button type="button" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center shadow-lg shadow-orange-600/20">
              <Send size={18} className="mr-2" /> Gửi tin nhắn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

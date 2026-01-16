import React from 'react';
import { Users, Target, History, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative bg-slate-900 py-20 overflow-hidden">
        <div className="absolute inset-0">
           <img src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" className="w-full h-full object-cover opacity-20" alt="Team" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Về VN RunClub</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Chúng tôi không chỉ là một câu lạc bộ chạy bộ. Chúng tôi là một gia đình, nơi mọi bước chân đều được khích lệ và mọi nỗ lực đều được ghi nhận.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Sứ Mệnh</h3>
              <p className="text-slate-600">Lan tỏa tinh thần thể thao, xây dựng lối sống lành mạnh và kết nối cộng đồng yêu chạy bộ trên khắp Việt Nam.</p>
           </div>
           <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Cộng Đồng</h3>
              <p className="text-slate-600">Hơn 2,500 thành viên tích cực, hỗ trợ nhau từ những bước chạy đầu tiên đến vạch đích Marathon.</p>
           </div>
           <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Thành Tích</h3>
              <p className="text-slate-600">Top 3 CLB có thành tích tốt nhất tại các giải VnExpress Marathon và Techcombank Marathon 2023.</p>
           </div>
        </div>
      </div>

      {/* History Timeline */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-slate-900 text-center mb-12 flex items-center justify-center">
             <History className="mr-3 text-orange-600" /> Lịch sử hình thành
           </h2>
           
           <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {[
                { year: '2020', title: 'Thành lập', desc: 'Nhóm chạy nhỏ với 10 thành viên tại Công viên Thống Nhất.' },
                { year: '2021', title: 'Mở rộng', desc: 'Đạt mốc 500 thành viên và tổ chức giải chạy nội bộ đầu tiên.' },
                { year: '2022', title: 'Chuyên nghiệp hóa', desc: 'Ra mắt ban huấn luyện chuyên nghiệp và hệ thống giáo án bài bản.' },
                { year: '2023', title: 'Bứt phá', desc: 'Trở thành CLB có phong trào mạnh nhất miền Bắc với 2,000+ thành viên.' }
              ].map((item, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-hover:bg-orange-500 text-slate-500 group-hover:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10">
                     <div className="w-3 h-3 bg-current rounded-full"></div>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <time className="font-caveat font-medium text-orange-600">{item.year}</time>
                    </div>
                    <div className="text-slate-500 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Ban Điều Hành</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
           {[1, 2, 3, 4].map((i) => (
             <div key={i} className="text-center">
               <img src={`https://picsum.photos/id/${100 + i}/150/150`} alt="Member" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100" />
               <h4 className="font-bold text-slate-900">Nguyễn Văn {String.fromCharCode(64 + i)}</h4>
               <p className="text-sm text-orange-600 font-medium">Co-Founder</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default About;

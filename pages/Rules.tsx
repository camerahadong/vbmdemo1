import React from 'react';
import { Shield, Users, AlertTriangle, Heart, Book, Eye } from 'lucide-react';

const Rules: React.FC = () => {
  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-display">Quy Chế Thành Viên</h1>
          <p className="text-slate-300 text-lg">
            Để xây dựng một cộng đồng chạy bộ văn minh, an toàn và phát triển, chúng tôi mong muốn các thành viên tuân thủ các quy định dưới đây.
          </p>
          <div className="mt-6 text-sm text-slate-400">
            Cập nhật lần cuối: 01/01/2024
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 md:p-12 space-y-10">
          
          {/* Section 1 */}
          <section className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-6">
              <Users size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Tiêu chuẩn thành viên</h2>
              <ul className="space-y-3 text-slate-600 list-disc pl-5">
                <li>Công dân Việt Nam hoặc người nước ngoài đang sinh sống tại Việt Nam, không phân biệt giới tính, tôn giáo.</li>
                <li>Yêu thích bộ môn chạy bộ và mong muốn rèn luyện sức khỏe.</li>
                <li>Đăng ký tài khoản đầy đủ thông tin thật trên hệ thống VN RunClub.</li>
                <li>Kết nối tài khoản Strava (hoặc thiết bị tương đương) để đồng bộ thành tích trung thực.</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 2 */}
          <section className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mr-6">
              <Heart size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Quy tắc ứng xử (Code of Conduct)</h2>
              <ul className="space-y-3 text-slate-600 list-disc pl-5">
                <li><strong>Tôn trọng:</strong> Luôn tôn trọng ban quản trị và các thành viên khác. Không sử dụng ngôn từ kích động, xúc phạm hoặc phân biệt đối xử.</li>
                <li><strong>Fair-play:</strong> Tuyệt đối không gian lận trong việc ghi nhận thành tích (đạp xe, đi xe máy, tag sai activity type...). Vi phạm sẽ bị xóa thành tích hoặc khóa tài khoản vĩnh viễn.</li>
                <li><strong>Đoàn kết:</strong> Hỗ trợ, giúp đỡ các thành viên mới. Không lôi kéo, chia rẽ nội bộ CLB.</li>
                <li><strong>Hình ảnh:</strong> Khi mặc áo CLB tham gia giải, cần giữ gìn hình ảnh đẹp, tuân thủ quy định của Ban tổ chức giải đấu.</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 3 */}
          <section className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mr-6">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. An toàn & Sức khỏe</h2>
              <ul className="space-y-3 text-slate-600 list-disc pl-5">
                <li>Thành viên tự chịu trách nhiệm về sức khỏe của bản thân khi tham gia các hoạt động tập luyện và giải đấu.</li>
                <li>Tuân thủ luật giao thông đường bộ khi chạy ngoài đường (Road).</li>
                <li>Khuyến cáo mang theo nước, điện thoại và thông tin liên lạc khẩn cấp khi chạy Long Run hoặc Trail.</li>
                <li>Không tham gia chạy khi đang có chấn thương hoặc vấn đề nghiêm trọng về tim mạch mà chưa có chỉ định của bác sĩ.</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 4 */}
          <section className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mr-6">
              <Shield size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Quyền lợi & Nghĩa vụ</h2>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-800 mb-2">Quyền lợi</h3>
                  <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                    <li>Tham gia miễn phí các buổi Training hàng tuần.</li>
                    <li>Được vinh danh trên BXH và nhận huy hiệu ảo.</li>
                    <li>Ưu đãi khi mua BIB giải chạy và sản phẩm từ đối tác.</li>
                    <li>Tham gia các sự kiện nội bộ (Year End Party, Team Building).</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-800 mb-2">Nghĩa vụ</h3>
                  <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                    <li>Đóng quỹ CLB (nếu có - theo năm) để duy trì hoạt động.</li>
                    <li>Tích cực tham gia hoạt động và lan tỏa hình ảnh CLB.</li>
                    <li>Giữ vệ sinh chung tại các điểm tập luyện.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Section 5 */}
          <section className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mr-6">
              <Eye size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Chính sách dữ liệu</h2>
              <p className="text-slate-600 mb-3">
                VN RunClub cam kết bảo mật thông tin cá nhân của thành viên. Dữ liệu tập luyện (từ Strava) được sử dụng công khai cho mục đích:
              </p>
              <ul className="space-y-2 text-slate-600 list-disc pl-5">
                <li>Tính toán Bảng xếp hạng thành tích.</li>
                <li>Xác thực kết quả các giải chạy ảo (Virtual Race).</li>
                <li>Phân tích tổng quan hoạt động của CLB.</li>
              </ul>
              <p className="text-slate-600 mt-3 italic text-sm">
                *Thành viên có quyền yêu cầu xóa dữ liệu và rời khỏi CLB bất cứ lúc nào trong phần Cài đặt tài khoản.
              </p>
            </div>
          </section>

        </div>
        
        <div className="mt-8 text-center">
            <p className="text-slate-500 mb-4">Bạn có thắc mắc về quy chế?</p>
            <button className="text-orange-600 font-bold hover:underline">Liên hệ Ban Quản Trị</button>
        </div>
      </div>
    </div>
  );
};

export default Rules;
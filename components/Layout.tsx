import React, { useState } from 'react';
import { Menu, X, Home, Trophy, Calendar, User as UserIcon, LogIn, Activity, BookOpen, Image as ImageIcon, Info, Mail } from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate, user, onLogin, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavItem = ({ page, icon: Icon, label }: { page: string; icon: any; label: string }) => (
    <button
      onClick={() => {
        onNavigate(page);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
        currentPage === page
          ? 'text-orange-600 bg-orange-50 font-semibold'
          : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={() => onNavigate('home')}
            >
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center transform -rotate-6">
                <Activity className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
                VN RunClub
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-1">
              <NavItem page="home" icon={Home} label="Trang chủ" />
              <NavItem page="activities" icon={Activity} label="Hoạt động" />
              <NavItem page="leaderboard" icon={Trophy} label="BXH" />
              <NavItem page="events" icon={Calendar} label="Sự kiện" />
              <NavItem page="blog" icon={BookOpen} label="Blog" />
              <NavItem page="gallery" icon={ImageIcon} label="Thư viện" />
              
              <div className="h-6 w-px bg-gray-200 mx-2"></div>
              
              {user ? (
                <div className="flex items-center space-x-4 ml-2">
                  <button 
                    onClick={() => onNavigate('profile')}
                    className="flex items-center space-x-2 text-sm font-medium text-slate-700 hover:text-orange-600 transition"
                  >
                    <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-orange-100" />
                    <span>{user.firstName}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={onLogin}
                  className="flex items-center space-x-2 bg-[#FC4C02] hover:bg-[#E34402] text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg"
                >
                  <LogIn size={16} />
                  <span>Login with Strava</span>
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-2">
            <NavItem page="home" icon={Home} label="Trang chủ" />
            <NavItem page="activities" icon={Activity} label="Hoạt động" />
            <NavItem page="leaderboard" icon={Trophy} label="Bảng Xếp Hạng" />
            <NavItem page="events" icon={Calendar} label="Sự kiện" />
            <NavItem page="blog" icon={BookOpen} label="Blog" />
            <NavItem page="gallery" icon={ImageIcon} label="Thư viện Ảnh" />
            <NavItem page="about" icon={Info} label="Về Chúng Tôi" />
            <NavItem page="contact" icon={Mail} label="Liên Hệ" />
            
            <div className="pt-2 border-t border-gray-100">
               {user ? (
                <button 
                  onClick={() => { onNavigate('profile'); setIsMobileMenuOpen(false); }}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-left"
                >
                  <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                  <span className="font-semibold text-slate-700">{user.firstName} {user.lastName}</span>
                </button>
              ) : (
                <button
                  onClick={() => { onLogin(); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center space-x-2 bg-[#FC4C02] text-white px-4 py-2 rounded-md font-medium"
                >
                  <LogIn size={16} />
                  <span>Login with Strava</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <Activity className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-white">VN RunClub</span>
            </div>
            <p className="text-sm">
              Kết nối đam mê, chinh phục mọi cung đường. Cộng đồng chạy bộ sôi động nhất Việt Nam.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Khám phá</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Trang chủ</button></li>
              <li><button onClick={() => onNavigate('events')} className="hover:text-white transition-colors">Giải chạy</button></li>
              <li><button onClick={() => onNavigate('leaderboard')} className="hover:text-white transition-colors">Bảng xếp hạng</button></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">Blog chia sẻ</button></li>
              <li><button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors">Thư viện ảnh</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Cộng đồng</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">Về chúng tôi</button></li>
              <li><button onClick={() => onNavigate('rules')} className="hover:text-white transition-colors">Quy chế thành viên</button></li>
              <li><button onClick={() => onNavigate('partners')} className="hover:text-white transition-colors">Đối tác & Tài trợ</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Liên hệ</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Kết nối</h3>
            <div className="flex space-x-4">
               {/* Social placeholders */}
               <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#FC4C02] transition cursor-pointer">FB</div>
               <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#FC4C02] transition cursor-pointer">IG</div>
               <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#FC4C02] transition cursor-pointer">YT</div>
            </div>
            <p className="text-xs mt-4">© 2023 VN RunClub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import DiningSpaces from './components/DiningSpaces';
import FloorPlansCarousel from './components/FloorPlansCarousel';
import ReservationSection from './components/ReservationSection';
import MemberPrivileges from './components/MemberPrivileges';
import Footer from './components/Footer';

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState('Main Dining Hall');
  const [selectedMenu, setSelectedMenu] = useState('');

  const scrollToBooking = () => {
    const el = document.getElementById('dat-ban');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectRoom = (roomName) => {
    setSelectedRoom(roomName);
    scrollToBooking();
  };

  const handleSelectMenu = (menuName) => {
    setSelectedMenu(menuName);
    scrollToBooking();
  };

  return (
    <div className="smart-restaurant-app">
      {/* 1. Navigation */}
      <Navbar onBookClick={scrollToBooking} />

      <main>
        {/* 2. Hero Editorial Split */}
        <Hero onBookClick={scrollToBooking} />

        {/* 3. The Menu Section (Giữ nguyên cấu trúc Set Menu theo yêu cầu) */}
        <MenuSection onSelectMenuToBook={handleSelectMenu} />

        {/* 4. Dining Spaces & VIP Experience */}
        <DiningSpaces onSelectSpace={handleSelectRoom} />

        {/* 5. Room Layout Carousel Section (Sơ đồ mặt bằng 2D tương tác) */}
        <FloorPlansCarousel onSelectRoomForBooking={handleSelectRoom} />

        {/* 6. Reservation Ticket Section (Đặt bàn tại đây) */}
        <ReservationSection 
          preselectedRoom={selectedRoom} 
          preselectedMenu={selectedMenu} 
        />

        {/* 7. Member Privileges Club */}
        <MemberPrivileges />
      </main>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}

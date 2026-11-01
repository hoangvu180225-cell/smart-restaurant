import React, { useState } from 'react';
import { ArrowUpRight, Utensils, Wine, Info } from 'lucide-react';

const MENU_SETS = [
  {
    id: 'khoi',
    name: 'KHỞI SET MENU',
    price: '790.000 VND ++/pax',
    subtitle: 'From season to the table · 5 Courses',
    image: '/assets/plated_seabass.jpg',
    description: 'Cá chẽm sốt khế thanh dịu, gỏi tôm bưởi Tân Triều và súp nấm tràm đương đại.',
    dishes: [
      'Khai vị: Gỏi bưởi tôm hồ Tây sốt lá chúc',
      'Món nhẹ: Súp nấm tràm Phú Quốc & sò điệp áp chảo',
      'Món chính: Cá chẽm sốt khế rừng ăn kèm cơm gạo lúa nương',
      'Tráng miệng: Chè hạt sen nhãn lồng long nhãn Phố Hiến'
    ]
  },
  {
    id: 'giao',
    name: 'GIAO SET MENU',
    price: '950.000 VND ++/pax',
    subtitle: 'Heritage Meets Contemporary · 6 Courses',
    image: '/assets/wagyu_dish.jpg',
    description: 'Bò Wagyu nướng than hoa Tây Bắc thơm lừng, bò sốt tiêu lốt ăn kèm rau rừng luộc.',
    dishes: [
      'Khai vị: Chả tôm bao sả nướng chấm mắm ruốc pha',
      'Món nhẹ: Súp cua biển gạch son & măng tươi Sa Pa',
      'Món chính: Bò Wagyu A5 nướng than hoa sốt tiêu lốt Điện Biên',
      'Món phụ: Cơm chiên hải sản lá é Phú Yên',
      'Tráng miệng: Kem dừa sáp Trà Vinh nướng đường nâu'
    ]
  },
  {
    id: 'thinh',
    name: 'THỊNH SET MENU',
    price: '1.250.000 VND ++/pax',
    subtitle: 'Grand Culinary Symphony · 7 Courses',
    image: '/assets/hero_ambience.jpg',
    description: 'Tôm hùm Nha Trang đút lò lá chanh, bào ngư xốt thảo mộc cổ truyền và gà đồi hấp muối.',
    dishes: [
      'Khai vị: Gỏi mực nhảy Cửa Lò sốt chanh leo',
      'Khai vị nóng: Bào ngư sốt thảo mộc cổ truyền Sa Pa',
      'Món nhẹ: Canh sâm bổ lượng hải sâm Nha Trang',
      'Món chính 1: Tôm hùm bông đút lò phô mai & muối lá chanh',
      'Món chính 2: Thăn cừu non nướng hạt dổi lá móc mật',
      'Tráng miệng: Bánh flan cốt dừa nướng than và trà hoa lài cổ thụ'
    ]
  }
];

export default function MenuSection({ onSelectMenuToBook }) {
  const [activeTab, setActiveTab] = useState('set-menu');
  const [selectedSet, setSelectedSet] = useState(null);

  return (
    <section className="menu-editorial-section" id="menu">
      {/* 1. Menu Transition Banner (Giữ đúng cấu trúc từ prototype) */}
      <div className="menu-transition-banner">
        <div className="transition-content">
          <span className="banner-small-title">The Culinary Experience</span>
          <h2 className="banner-title">Thực Đơn Đương Đại</h2>
          <p className="banner-sub">DISCOVER OUR À LA CARTE & SET MENU</p>
          
          <div className="banner-actions">
            <button 
              onClick={() => setActiveTab('set-menu')}
              className={`btn-menu-tab ${activeTab === 'set-menu' ? 'active' : ''}`}
            >
              <Utensils size={15} />
              <span>Set Menu Signature</span>
            </button>
            <button 
              onClick={() => setActiveTab('drinks')}
              className={`btn-menu-tab ${activeTab === 'drinks' ? 'active' : ''}`}
            >
              <Wine size={15} />
              <span>Drink & Wine Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Menu Section Main Content */}
      <div className="menu-main-container">
        <div className="editorial-header">
          <div className="section-label center">
            <span className="accent-line"></span>
            <span className="label-text">Signature Selections</span>
            <span className="accent-line"></span>
          </div>
          <h3 className="editorial-title">SET MENU</h3>
          <p className="editorial-sub">From season to the table</p>
        </div>

        {/* 3. The 3 Set Menus with Fine Lines (Giữ nguyên cấu trúc Set Menu) */}
        <div className="editorial-grid">
          <div className="line-vertical-center"></div>

          {MENU_SETS.map((item, index) => (
            <div key={item.id} className="menu-item-block">
              <div className="menu-item-frame">
                <img src={item.image} alt={item.name} className="menu-item-img" />
                <span className="menu-item-tag">Set {index + 1}</span>
              </div>

              <div className="menu-item-content">
                <div className="menu-item-header">
                  <h4 className="menu-item-title">{item.name}</h4>
                  <div className="menu-item-price">{item.price}</div>
                </div>

                <p className="menu-item-desc">{item.description}</p>

                {/* Course preview */}
                <div className="menu-courses-list">
                  {item.dishes.map((dish, i) => (
                    <div key={i} className="course-line">
                      <span className="bullet">✦</span>
                      <span>{dish}</span>
                    </div>
                  ))}
                </div>

                <div className="menu-item-footer">
                  <button 
                    onClick={() => onSelectMenuToBook && onSelectMenuToBook(item.name)}
                    className="btn-select-menu"
                  >
                    <span>Đặt bàn với set này</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Fine Footnote */}
        <div className="menu-policy-note">
          <div className="policy-box">
            <Info size={16} className="policy-icon" />
            <p>
              Vui lòng lưu ý giá ưu đãi của các set menu không áp dụng vào các ngày lễ, Tết hoặc trong các dịp đặc biệt. 
              Tất cả nguyên liệu đều được thu hoạch hữu cơ theo mùa và chế biến trong ngày. Hãy thông báo cho chúng tôi nếu bạn có bất kỳ dị ứng thực phẩm nào.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


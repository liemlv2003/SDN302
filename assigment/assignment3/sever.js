const express = require('express');
const mongoose = require('mongoose');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const path = require('path');

const app = express();

// Cấu hình EJS & Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Kết nối MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/KaraokeDB')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Định nghĩa Routes
app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);
app.get('/', (req, res) => res.redirect('/bookings'));

// Xử lý lỗi 404 (Trang không tồn tại)
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Khởi chạy server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

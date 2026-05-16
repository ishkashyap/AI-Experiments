const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const blogRoutes = require('./blog.routes');
const bookingRoutes = require('./booking.routes');
const contentRoutes = require('./content.routes');
const announcementRoutes = require('./announcement.routes');
const teamRoutes = require('./team.routes');
const contactRoutes = require('./contact.routes');

router.use('/auth', authRoutes);
router.use('/blogs', blogRoutes);
router.use('/bookings', bookingRoutes);
router.use('/website-content', contentRoutes);
router.use('/announcements', announcementRoutes);
router.use('/team-members', teamRoutes);
router.use('/contacts', contactRoutes);

module.exports = router;

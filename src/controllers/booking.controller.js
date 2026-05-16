const { query, run } = require('../config/database');
const sanitizeHtml = require('sanitize-html');
const { sendBookingStatusEmail } = require('../services/email.service');

const getBookings = async (req, res, next) => {
    try {
        const rows = await query("SELECT * FROM bookings ORDER BY created_at DESC");
        res.json({ success: true, data: rows });
    } catch (err) {
        next(err);
    }
};

const createBooking = async (req, res, next) => {
    try {
        const { name, email, phone, service, date, time } = req.body;
        const message = req.body.message ? sanitizeHtml(req.body.message) : '';

        const result = await run(
            "INSERT INTO bookings (name, email, phone, service, date, time, message) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, email, phone, service, date, time, message]
        );

        res.status(201).json({ success: true, id: result.lastID, message: 'Booking successful' });
    } catch (err) {
        next(err);
    }
};

const updateBookingStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const existing = await query("SELECT * FROM bookings WHERE id = ?", [req.params.id]);
        if (existing.length === 0) {
            return res.status(404).json({ success: false, error: 'Booking not found' });
        }
        const booking = existing[0];
        await run("UPDATE bookings SET status = ? WHERE id = ?", [status, req.params.id]);

        try {
            await sendBookingStatusEmail(booking, status);
        } catch (emailErr) {
            console.error('Email notification failed:', emailErr.message);
        }

        res.json({ success: true, message: 'Status updated' });
    } catch (err) {
        next(err);
    }
};

const lookupBooking = async (req, res, next) => {
    try {
        const { email, date } = req.query;
        if (!email || !date) {
            return res.status(400).json({ success: false, error: 'Email and date are required' });
        }
        const rows = await query(
            "SELECT * FROM bookings WHERE email = ? AND date = ? AND status != 'cancelled'",
            [email, date]
        );
        res.json({ success: true, data: rows });
    } catch (err) {
        next(err);
    }
};

const cancelBooking = async (req, res, next) => {
    try {
        const { email, date } = req.body;
        const existing = await query(
            "SELECT * FROM bookings WHERE email = ? AND date = ? AND status != 'cancelled'",
            [email, date]
        );
        if (existing.length === 0) {
            return res.status(404).json({ success: false, error: 'Booking not found' });
        }
        const booking = existing[0];
        await run("UPDATE bookings SET status = 'cancelled' WHERE id = ?", [booking.id]);

        try {
            await sendBookingStatusEmail(booking, 'cancelled');
        } catch (emailErr) {
            console.error('Cancel email notification failed:', emailErr.message);
        }

        res.json({ success: true, message: 'Booking cancelled' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getBookings,
    createBooking,
    updateBookingStatus,
    lookupBooking,
    cancelBooking
};

import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

// Helper to parse HH:mm to minutes
const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

export const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, phone, date, time, tableNumber } = req.body;

  // Check if all required fields are present
  if (!firstName || !lastName || !email || !phone || !date || !time || !tableNumber) {
    return next(new ErrorHandler("Please fill the full reservation form", 400));
  }

  try {
    // Check for 1-hour overlap double booking
    const allBookingsOnDate = await Reservation.find({ date, tableNumber }).select('time');
    const requestedMinutes = timeToMinutes(time);
    
    const isOverlapping = allBookingsOnDate.some(booking => {
      const bookingMinutes = timeToMinutes(booking.time);
      return Math.abs(bookingMinutes - requestedMinutes) < 60;
    });

    if (isOverlapping) {
      return next(new ErrorHandler("This table is already booked within an hour of this time.", 400));
    }

    // Save reservation to the database
    await Reservation.create({
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
      tableNumber,
    });

    res.status(200).json({
      success: true,
      message: "Reservation sent successfully",
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    // Pass other errors to the error handler
    return next(error);
  }
};

export const getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    return next(error);
  }
};

export const checkAvailability = async (req, res, next) => {
  const { date, time } = req.query;
  if (!date || !time) {
    return next(new ErrorHandler("Please provide date and time", 400));
  }

  try {
    const allBookingsOnDate = await Reservation.find({ date }).select('time tableNumber');
    const requestedMinutes = timeToMinutes(time);

    const overlappingTables = allBookingsOnDate
      .filter(booking => {
        const bookingMinutes = timeToMinutes(booking.time);
        // Table is locked if the difference is strictly less than 60 minutes
        return Math.abs(bookingMinutes - requestedMinutes) < 60;
      })
      .map(booking => booking.tableNumber);

    res.status(200).json({
      success: true,
      bookedTables: overlappingTables,
    });
  } catch (error) {
    return next(error);
  }
};

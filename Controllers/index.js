const rooms = [];
const bookings = [];
const getHomePage = (req, res) => {
    res.status(200).send(`<h1>Server is listening</h1>
    <a href=https://documenter.getpostman.com/view/32502882/2s9YyvAKhi> Visit API documentation in Postman Docs</a>
    <p>Done docs as per my basic knowledge but not got the expected o/p in docs as i get in postman req and response</p>`)
}
//List all the rooms 
const getAllRooms = (req, res) => {
    res.status(200).send({message: "Fetched successfully", rooms})
}
//list all the bookings
const getAllBookings = (req, res) => {
    res.status(200).send({message: "Fetched successfully", bookings})
}
//creating a room
const createRoom = (req, res) => {
    const { roomNumber, seats, amenities, pricePerHour } = req.body;
    if (!roomNumber || !seats || !amenities || !pricePerHour) {
       return res.status(400).send({error: "Missing required fields" })
    }
    if (rooms.find(room => room.roomNumber === roomNumber)) {
       return res.status(400).send({error: "Room with the given number already exists"})
    }
    const newroom = {
        roomNumber,
        seats,
        amenities,
        pricePerHour
    }
    rooms.push(newroom);
    console.log(rooms)
    res.status(201).send({ message: "Room created successfully", newroom });
}
//booking a room
const bookRooms = (req, res) => {
    const { bookingId, customerName, date, startTime, endTime, roomId } = req.body;
        if (!customerName || !date || !startTime || !endTime || !roomId) {
            return res.status(400).send({ error: 'Missing required fields' });
        }
    const room = rooms.find(room => room.roomNumber === roomId);
        if (!room) {
            return res.status(404).send({ error: 'Room not found' });
        }

    const overlapBooking = bookings.find(booking => booking.roomId === roomId && booking.date === date
        && ((startTime >= booking.startTime && startTime < booking.endTime) ||
            (endTime > booking.startTime && endTime <= booking.endTime)));
    
    if (overlapBooking) {
        return res.status(400).send({ error: "Room already booked for the time slot" });
    }

    const newBooking = {
        bookingId,
        customerName,
        date,
        startTime,
        endTime,
        roomId,
        bookingDate: new Date().toISOString(),
        bookingStatus: "Confirmed"
    }

    bookings.push(newBooking);
    res.status(201).send({message:"Booked successfully", newBooking})

}
//list all the rooms with booked data 
const getBookedRooms = (req, res) => {
  const roomsWithBookings = rooms.map(room => {
    const roomBookings = bookings.filter(booking => booking.roomId === room.roomNumber);
    return {
        ...room,
        bookings: roomBookings
    };
  });

  res.status(200).send(roomsWithBookings);
}
//list all the customers with booked data
const bookedCustomers = (req, res) => {
  const customersWithBookings = bookings.map(booking => {
    const room = rooms.find(room => room.roomNumber === booking.roomId);
    return {
      customerName: booking.customerName,
      roomName: room ? `Room ${room.roomNumber}` : 'Room not found',
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
    };
  });

  res.status(200).send(customersWithBookings);
};

//list how many times customer booked the room with details
const allCustomerBookings = (req, res) => {
  const customerBookings = bookings.map(booking => ({
    customerName: booking.customerName,
    roomName: `Room ${booking.roomId}`,
    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime,
    bookingId: booking.bookingId,
    bookingDate: booking.bookingDate,
    bookingStatus: booking.bookingStatus,
  }));

  res.status(200).json(customerBookings);
};

export default {
    createRoom, getHomePage, bookRooms, getAllRooms, getAllBookings, getBookedRooms, bookedCustomers, allCustomerBookings
}
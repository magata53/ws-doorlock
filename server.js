var app = require("http").createServer();
// Set up the socket.io
var io = require("socket.io")(app);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// if user connect to socket
io.on("connection", function(socket) {
  // event for join room
  socket.on("join_room", room => {
    socket.join(room);
    console.log("some join");
  });
  // event for leave room
  socket.on("leave_room", room => {
    socket.leave(room);
    console.log("some leave");
  });

  // event, received data from device, send data to UI (Face feature)
  socket.on("face_event", data => {
    io.in("room_face").emit("face_data", data);
  });
  // event, received data from device, send data to UI (Fingerprint feature)
  socket.on("fingerprint_event", data => {
    io.in("room_fingerprint").emit("fingerprint_data", data);
  });
  // event, received data from device, send data to UI (Access denied feature)
  socket.on("access_denied_event", data => {
    io.in("room_access_denied").emit("access_denied_data", data);
    console.log(data);
  });
  // event, received data from device, send data to UI (Blink feature)
  socket.on("blink_event", data => {
    io.in("room_blink").emit("blink_data", data);
    console.log(data);
  });
  // event, received data from device, send data to UI (transport image)
  socket.on("image", data => {
    io.in("room_image").emit("image_data", data);
    console.log(data);
    console.log("masuk");
  });
});

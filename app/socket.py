from flask_socketio import SocketIO, emit, join_room, leave_room, send
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://ziba3436.herokuapp.com/",
        "https://ziba3436.herokuapp.com/" 
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins) 

# handle room-chat messages
@socketio.on("message")
def handle_chat(data):
    print(f'\n\n\n{data}\n\n\n')
    send({'sender_id': data['sender_id'], 'receiver_id': data['receiver_id'], 'message': data['message'], "dm_id": data['dm_id']}, room=data['room'])

# handle join chat
@socketio.on('join')
def join(data):
    join_room(data['room'])

# handle leave chat
@socketio.on("leave")
def leave(data):
    leave_room(data['room']) 
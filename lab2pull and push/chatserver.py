from simple_websocket_server import WebSocket, WebSocketServer
import json

def get_message(message):
    return json.loads(message)

class ChatServer(WebSocket):
    clients = []

    @classmethod
    def for_all_user(cls, message):
        for client in cls.clients:
            cls.send_message(client, message)

    @staticmethod
    def prepare_message(base_message):
        message_to_send = {}
        if base_message["type"] == "login":
            message_to_send['content'] = f"{base_message['username']} has been connected"
            message_to_send['color'] = "green"
        else:
            message_to_send['content'] = f"{base_message['username']}: {base_message['body']}"
        return json.dumps({"body": message_to_send})

    def handle(self):
        print(f"message received: {self.data}")
        msg_content = get_message(self.data)
        self.username = msg_content["username"]
        mes_to_send = self.prepare_message(msg_content)
        ChatServer.for_all_user(mes_to_send)

    def connected(self):
        print(f"client connected {self.address}")
        ChatServer.clients.append(self)

    def handle_close(self):
        msg = {"content": f"client Disconnected {self.username}", "color": "blue"}
        ChatServer.clients.remove(self)
        msg_to_send = json.dumps(msg)
        ChatServer.for_all_user(msg_to_send)

if __name__ == "__main__":
    print('SimpleChat server started on port 8000')
    server = WebSocketServer('', 8000, ChatServer)
    server.serve_forever()

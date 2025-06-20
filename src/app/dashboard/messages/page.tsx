'use client';

import { useState } from 'react';

interface Message {
    id: number;
    sender: string;
    content: string;
    time: string;
    unread: boolean;
}

const messages: Message[] = [
  {
    id: 1,
    sender: 'John Doe',
    content: 'Hi, how is the project going?',
    time: '10:30 AM',
    unread: true,
  },
  {
    id: 2,
    sender: 'Jane Smith',
    content: 'Can we schedule a meeting for tomorrow?',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 3,
    sender: 'Mike Johnson',
    content: 'I\'ve sent you the updated design files',
    time: '2 days ago',
    unread: false,
  },
  {
    id: 4,
    sender: 'Repon',
    content: 'I\'ve sent you the updated design files',
    time: '2 days ago',
    unread: false,
  },
];

export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Message List */}
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Messages</h2>
          </div>
          <div className="overflow-y-auto h-full">
            {messages.map((message:any) => (
              <div
                key={message.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  message.unread ? 'bg-blue-50' : ''
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <i className={"bi bi-person"}></i>
                    <div>
                    <p className="font-medium">{message.sender}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">
                        {message.content}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedMessage ? (
            <>
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <i className={"bi bi-person"}></i>
                  <div>
                  <p className="font-medium">{selectedMessage.sender}</p>
                    <p className="text-sm text-gray-500">Online</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <i className={"bi bi-person"}></i>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm">{selectedMessage.content}</p>
                      <p className="text-xs text-gray-500 mt-1">{selectedMessage.time}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                  >
                    <i className={"bi bi-airplane"}></i>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <i className={"bi bi-envelope"}></i>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No message selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a message from the list to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
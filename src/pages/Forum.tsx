import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { Chat } from "../types/Chat";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../lib/hooks";
import { getUser } from "../actions/userActions";
import { User } from "../types/User";
import { GoPaperclip } from "react-icons/go";
import { MdSend } from "react-icons/md";

import Avatar from "../components/Avatar";
import ImageUpload from "../components/ImageUpload";
import ChatAvatar from "../components/ChatAvatar";

const Forum = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Chat[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [image, setImage] = useState("");

  const [sender, setSender] = useState({} as User);
  const { user } = useSelector((state: RootState) => state.authenticatedUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getUser());
    };

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    fetchUser();
    setSender(user);

    const onMessageReceived = (msg: Chat) => {
      const newMessage: Chat = { sender: msg.sender, text: msg.text , time:msg.time };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      scrollToBottom();
    };

    socket.on("chat-message", onMessageReceived);

    return () => {
      socket.off("chat-message", onMessageReceived);
    };
  }, []);

  console.log(chatMessages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    const newMessage: Chat = { sender: user, text: message , time:new Date().toLocaleTimeString([], { hour12: false }) };
    socket.emit("chat message", newMessage);
    setMessage("");
  };

  const handleFileSelect = (image:FormData)=>{

    console.log("image selected => " , image.get("image"));
    const imgFile = image.get("image");
    if (imgFile instanceof Blob) {
      setImage(URL.createObjectURL(imgFile));
    }

  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Chat</h2>
        </div>
        <div className="overflow-y-auto max-h-96 chat-container">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`chat ${
                message.sender.username === user.username ? "chat-start" : "chat-end"
              }`}
            >
              <div className="chat-image avatar">
               <ChatAvatar username={message?.sender?.username}/>
              </div>
              <div className="chat-header">
                {message.sender.username === user.username ? <span className="p-2 text-green-600">You</span>: message.sender.username  }<time className="text-xs opacity-50">{message.time}</time>
              </div>
              <div className="chat-bubble">{message.text}</div>
              <div className="chat-footer opacity-50"> Delivered </div>
            </div>
          ))}
          <div ref={messagesEndRef} />

          {image && (<img src={image} alt="artwork"  className="w-40 h-40 object-contain"/>)}
        </div>
        <div className="flex mt-4 items-center">
  <div className="relative flex-grow">
    <input
      type="text"
      placeholder="Type your message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pr-10"
    />
    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
    <ImageUpload onFileSelect={handleFileSelect}/>
    </div>
  </div>
  <button
    onClick={handleSendMessage}
    className="text-white bg-green-400 rounded-full p-1 hover:bg-blue-600 transition-colors duration-300 ml-2"
  >
    <MdSend size={24}/>
  </button>
</div>
      </div>
    </div>
  );
};

export default Forum;
import { JamMessage } from "@/types/jamesign";

const JamMessageRow = ({ msg, isOwn }: { msg: JamMessage; isOwn: boolean }) => {
  const time = new Date(msg.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div
      className={`flex items-start gap-3 ${isOwn ? "flex-row-reverse" : ""}`}
    >
      <div className="bg-indigo-900 border border-indigo-700 rounded-full w-9 h-9 flex items-center justify-center text-sm font-bold text-indigo-300 shrink-0">
        {msg.user.charAt(0)}
      </div>
      <div
        className={`flex flex-col gap-1 max-w-xs ${isOwn ? "items-end" : ""}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {isOwn ? "You" : msg.user}
          </span>
          <span className="text-xs text-gray-600">{time}</span>
        </div>
        <div
          className={`rounded-2xl px-4 py-3 flex items-center gap-3
            ${
              isOwn
                ? "bg-indigo-700 border border-indigo-600 text-white rounded-tr-sm"
                : "bg-gray-800 border border-gray-700 text-white rounded-tl-sm"
            }`}
        >
          <span className="text-2xl">{msg.emoji}</span>
          <div>
            <p className="font-bold text-sm">{msg.translatedSign}</p>
            {msg.translatedSign !== msg.sign && (
              <p className="text-xs text-gray-400">{msg.sign}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JamMessageRow;

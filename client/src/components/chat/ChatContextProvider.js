import ChatContext from "./ChatContext";

export default function ChatContextProvider({ children }) {
    const context = useState({ ...context });
    function updateContext(arg) {
        setContext(prev => ({...prev, arg}));
    }

    return (
        <ChatContext.Provider value={{ context, updateContext }}>
            {children}
        </ChatContext.Provider>
    )
};
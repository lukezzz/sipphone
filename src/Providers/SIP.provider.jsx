import JsSIP from "jssip";
import { createContext, useState, useEffect, useRef } from "react";
import { notification } from "antd";

const callOptions = {
    mediaConstraints: {
        audio: true, // only audio calls
        video: false,
    },
};

export const SIPContext = createContext({
    phone: null,
    startCall: () => {},
    endCall: () => {},
});

JsSIP.debug.disable("JsSIP:*");

const SIPProvider = ({ user, children }) => {
    const sipClient = useRef(null);
    const didUnmmount = useRef(false);

    const [status, setStatus] = useState({
        connected: false,
        registered: false,
        sipStatus: "unknown",
    });

    const [session, setSession] = useState(null);

    useEffect(() => {
        const socket = new JsSIP.WebSocketInterface(
            `wss://${user.sipUri}:7443`
        );
        const configuration = {
            sockets: [socket],
            uri: `sip:${user.username}@${user.sipUri}`,
            password: user.password,
        };

        sipClient.current = new JsSIP.UA(configuration);
        if (!sipClient.current) {
            throw new Error("connected failed");
        }
        sipClient.current.start();
        return () => {
            didUnmmount.current = true;
        };
    }, [user]);

    useEffect(() => {
        if (sipClient.current !== null) {
            sipClient.current.on("connected", (e) => {
                setStatus({
                    ...status,
                    connected: true,
                });
            });
            sipClient.current.on("registered", (e) => {
                setStatus({
                    ...status,
                    registered: true,
                });
            });
            sipClient.current.on("newRTCSession", function (data) {
                setSession(data.session);
            });
        }
    }, [sipClient.current]);

    useEffect(() => {
        if (session && session.direction === "incoming") {
            //
            notification.open({
                message: "Incoming call",
                description: "test",
                // btn,
                // onClose: close,
            });

            // incoming call here
            session.on("accepted", function () {
                // the call has answered
            });
            session.on("confirmed", function () {
                // this handler will be called for incoming calls too
            });
            session.on("ended", function () {
                // the call has ended
            });
            session.on("failed", function () {
                // unable to establish the call
            });
            session.on("addstream", function (e) {
                // set remote audio stream (to listen to remote audio)
                // remoteAudio is <audio> element on page
                // remoteAudio.src = window.URL.createObjectURL(e.stream);
                // remoteAudio.play();
            });

            // Answer call
            // session.answer(callOptions);

            // Reject call (or hang up it)
            // session.terminate();
        } else {
            // outgoing call
        }
    }, [session]);

    // Register callbacks to desired call events
    let eventHandlers = {
        progress: function (e) {
            console.log("call is in progress");
            setStatus({
                ...status,
                sipStatus: "starting",
            });
        },
        failed: function (e) {
            console.log(e);
            // console.log("call failed with cause: " + e.data.cause);
            setStatus({
                ...status,
                sipStatus: "faled",
            });
        },
        ended: function (e) {
            console.log(e);
            console.log("call ended with cause: " + e.cause);
            setStatus({
                ...status,
                sipStatus: "ended",
            });
        },
        confirmed: function (e) {
            console.log("call confirmed");
            setStatus({
                ...status,
                sipStatus: "confirmed",
            });
        },
    };

    const startCall = (dest) => {
        if (dest && dest !== "") {
            sipClient.current.call(dest, { ...callOptions, eventHandlers });
        }
    };

    const endCall = () => {
        if (session) {
            session.terminate();
        }
    };

    return (
        <SIPContext.Provider
            value={{
                sipClient: sipClient.current,
                status,
                startCall,
                endCall,
            }}
        >
            {children}
        </SIPContext.Provider>
    );
};

export default SIPProvider;

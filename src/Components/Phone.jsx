import { SipProvider } from "@evercall/react-sip";
import { useContext } from "react";
import { UserContext } from "../Providers/User.provider";

export const Phone = ({ children }) => {
    const { user } = useContext(UserContext);
    return (
        <SipProvider
            host={user.sipUri}
            port={7443}
            pathname="" // Path in socket URI (e.g. wss://sip.example.com:7443/ws); "" by default
            secure={true} // if true, the connection will be made over `wss://` else it will default to `ws://`
            user={user.username}
            password={user.password} // usually required (e.g. from ENV or props)
            autoRegister={true} // true by default, see jssip.UA option register
            autoAnswer={false} // automatically answer incoming calls; false by default
            iceRestart={false} // force ICE session to restart on every WebRTC call; false by default
            sessionTimersExpires={120} // value for Session-Expires header; 120 by default
            // extraHeaders={{
            //     // optional sip headers to send
            //     register: ["X-Foo: foo", "X-Bar: bar"],
            //     invite: ["X-Foo: foo2", "X-Bar: bar2"],
            // }}
            iceServers={[
                // optional
                { urls: ["stun:turn.analystock.com"] },
                // {
                //     urls: "turn:example.com",
                //     username: "foo",
                //     credential: "1234",
                // },
            ]}
            debug={true} // whether to output events to console; false by default
            incomingAudioDeviceId={"default"} // default, or a deviceId obtained from navigator.mediaDevices.enumerateDevices()
            outboundAudioDeviceId={"default"} // default, or a deviceId obtained from navigator.mediaDevices.enumerateDevices()
        >
            {children}
        </SipProvider>
    );
};

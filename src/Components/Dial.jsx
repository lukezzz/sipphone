import { Result, Button, Input } from "antd";
import { sipPropType, callPropType } from "@evercall/react-sip";
import * as PropTypes from "prop-types";
import React, { useState, useContext } from "react";
import { PhoneContext } from "../Providers/User.provider";

export const Dial = (props, context) => {
    console.log(context);
    const [dest, setDest] = useState(null);
    const { user } = useContext(PhoneContext);

    const onCall = () => {
        if (dest && dest !== "") {
            context.startCall(dest);
        }
    };

    return (
        <Result
            status="success"
            title={user.username}
            extra={[
                <Input
                    placeholder="Destintaion"
                    allowClear
                    onChange={(e) => setDest(e.target.value)}
                />,
                <Button type="primary" key="startCall" onClick={onCall}>
                    call 2001
                </Button>,
                <Button key="Answer" onClick={() => context.answerCall()}>
                    Answer
                </Button>,
            ]}
        />
    );
};

Dial.contextTypes = {
    sip: sipPropType,
    call: callPropType,
    registerSip: PropTypes.func,
    unregisterSip: PropTypes.func,

    answerCall: PropTypes.func,
    startCall: PropTypes.func,
    stopCall: PropTypes.func,
    sendDTMF: PropTypes.func,
};

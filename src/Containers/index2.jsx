import { useContext, useState } from "react";
import { Descriptions, Button, Input, Space, notification } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import ProCard from "@ant-design/pro-card";
import { UserContext } from "../Providers/User.provider";
import { SIPContext } from "../Providers/SIP.provider";

const callOptions = {
    mediaConstraints: {
        audio: true, // only audio calls
        video: false,
    },
};

// JsSIP.debug.enable()
// const m = await import('path/to/module.js');

const Index2 = () => {
    const { user } = useContext(UserContext);

    const { sipClient, startCall, endCall } = useContext(SIPContext);

    const [dest, setDest] = useState(null);

    const [showMessage, setShowMessage] = useState(true);

    const onCall = () => {
        if (dest && dest !== "") {
            startCall(dest);
        }
    };

    const answerCall = () => {
        setShowMessage(false);

        // context.answerCall();
    };

    const onStop = () => {
        // context.stopCall();
        setShowMessage(true);
        // phone.terminateSessions();
    };

    const btn = (
        <Button
            type="primary"
            size="small"
            onClick={() => {
                answerCall();
                notification.close(key);
            }}
        >
            Answer
        </Button>
    );

    const close = () => {
        console.log(
            "Notification was closed. Either the close button was clicked or duration time elapsed."
        );
    };

    const key = `open${Date.now()}`;
    // if (
    //     showMessage &&
    //     call.direction === "callDirection/INCOMING" &&
    //     call.status === "callStatus/STARTING"
    // ) {
    //     notification.open({
    //         message: "Incoming call",
    //         description: call.counterpart,
    //         key,
    //         btn,
    //         onClose: close,
    //     });
    // }

    return (
        <div
            style={{
                background: "#F5F7FA",
            }}
        >
            <PageContainer
                ghost
                header={{
                    title: user.username,
                    breadcrumb: {},
                }}
                content={
                    <Descriptions column={2} style={{ marginBottom: -16 }}>
                        {/* <Descriptions.Item label="Status">
                            {sip.status}
                        </Descriptions.Item>
                        <Descriptions.Item label="Call">
                            {call.status}
                        </Descriptions.Item> */}
                    </Descriptions>
                }
            >
                <ProCard gutter={[0, 16]}>
                    <Space>
                        <Input
                            placeholder="Destintaion"
                            allowClear
                            style={{ width: 200 }}
                            onChange={(e) => setDest(e.target.value)}
                        />
                        <Button type="primary" key="startCall" onClick={onCall}>
                            {" "}
                            Make call
                        </Button>
                        {/* {call.status === "callStatus/STARTING" ? (
                            <Button key="Answer" onClick={answerCall}>
                                Answer
                            </Button>
                        ) : null} */}
                    </Space>
                </ProCard>
            </PageContainer>
        </div>
    );
};

export default Index2;

import { useContext, useState } from "react";
import { Descriptions, Button, Input, Space, notification } from "antd";
import { PageContainer } from "@ant-design/pro-layout";
import ProCard from "@ant-design/pro-card";
import { sipPropType, callPropType } from "@evercall/react-sip";
import * as PropTypes from "prop-types";
import { UserContext } from "../Providers/User.provider";

const Index = (props, context) => {
    const { sip, call } = context;
    console.log(sip.status);
    console.log({ call });

    // registerSip();
    const { user } = useContext(UserContext);

    const [dest, setDest] = useState(null);

    const [showMessage, setShowMessage] = useState(true);

    const onCall = () => {
        if (dest && dest !== "") {
            context.startCall(dest);
        }
    };

    const answerCall = () => {
        setShowMessage(false);
        context.answerCall();
    };

    const onStop = () => {
        context.stopCall();
        setShowMessage(true);
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
    if (
        showMessage &&
        call.direction === "callDirection/INCOMING" &&
        call.status === "callStatus/STARTING"
    ) {
        notification.open({
            message: "Incoming call",
            description: call.counterpart,
            key,
            btn,
            onClose: close,
        });
    }

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
                        <Descriptions.Item label="Status">
                            {sip.status}
                        </Descriptions.Item>
                        <Descriptions.Item label="Call">
                            {call.status}
                        </Descriptions.Item>
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
                        {call.status === "callStatus/ACTIVE" ? (
                            <Button
                                type="primary"
                                key="stopCall"
                                onClick={onStop}
                                danger
                            >
                                {" "}
                                Hungup
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                key="startCall"
                                onClick={onCall}
                            >
                                {" "}
                                Make call
                            </Button>
                        )}
                        {call.status === "callStatus/STARTING" ? (
                            <Button key="Answer" onClick={answerCall}>
                                Answer
                            </Button>
                        ) : null}
                    </Space>
                </ProCard>
            </PageContainer>
        </div>
    );
};

export default Index;

Index.contextTypes = {
    sip: sipPropType,
    call: callPropType,
    registerSip: PropTypes.func,
    unregisterSip: PropTypes.func,

    answerCall: PropTypes.func,
    startCall: PropTypes.func,
    stopCall: PropTypes.func,
    sendDTMF: PropTypes.func,
};

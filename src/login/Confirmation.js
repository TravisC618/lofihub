import React, { useState, useEffect } from "react";
import { emailConfirmation } from "../api/user";
import ActionAlerts from "../UI/ActionAlerts";
import { setToken } from "../utils/auth";
import { ACCOUNT_URL, ACCOUNT_DASHBOARD_URL } from "../routes/URLMAP";
import LoadingBackdrop from "../UI/LoadingBackdrop";

const Confirmation = ({
    history,
    match: {
        params: { token },
    },
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
        setIsLoading(true);
        async function verifyConfirmation() {
            try {
                const response = await emailConfirmation(token);
                const { id } = response.data.data;
                setToken(token);

                setTimeout(() => {
                    history.replace(
                        ACCOUNT_URL + `/${id}` + ACCOUNT_DASHBOARD_URL
                    );
                }, 5000);
                setIsLoading(false);
            } catch (error) {
                if (error.response) {
                    setErr(error.response.data.error);
                }
                setIsLoading(false);
            }
        }

        verifyConfirmation();
    }, []);

    const renderPage = () => {
        if (err) {
            return <ActionAlerts msg={err} />;
        }

        return (
            <h3>
                Confirmed successfully! Page is going to redirect to in 5
                seconds.
            </h3>
        );
    };

    return (
        <div>
            <h1>Email Confirmation</h1>
            {isLoading ? <LoadingBackdrop /> : renderPage()};
        </div>
    );
};

export default Confirmation;

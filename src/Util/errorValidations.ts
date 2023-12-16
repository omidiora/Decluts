import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { notify, notifyInfo } from "./notify";

export const LogOutErrors = {
    'AUTH_ERROR': '', 'INVALID_DEVICE': '', 'USER_BLOCKED': ''
};

export const TokenErrors = [
    "token has expired", "token not parsed", "invalid token"
]

export const ValidateResponseError = (error: any, token: string|null = null) => {
    // console.log(error.data, "val_error");
    if (typeof error !== 'string' && error.data) {
        if (typeof error.data !== 'string') {
            // has meta_data errors
            const hasMetaDataErrors = (error.data.meta_data && error.data.meta_data.response);
            let possibleErrors = {
                token: (error?.data.error ? TokenErrors.includes(error.data.error.trim().toLowerCase()) : false),
                auth: (hasMetaDataErrors ? Object.keys(LogOutErrors).includes(error.data.meta_data.response) : false)
            };
            // console.log(possibleErrors);
            // handle errors 
            if (possibleErrors.token || possibleErrors.auth) {
                if (token) notifyInfo("Error", "Kindly login again to verify your account.");
                return true;
            }
            // continue external validations 
             return false;
        } else {
            // notify("Request Failed", "an error occurred while completing request, kindly try again!");
            // console.log("api code break issue");
            return false;
        }
    } else {
        notify("Request Failed", "kindly check your internet connection, and try again!");
        // console.log("might be network issue");
        return false;
    }
}
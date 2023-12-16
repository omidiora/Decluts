import { showMessage, MessageType, MessageOptions } from 'react-native-flash-message';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export const notify = (message: string, description: string, type?: MessageType, options?: MessageOptions) => {
  showMessage({
    duration: 3000,
    message,
    description,
    // icon: 'danger',
    // hideStatusBar: true,
    type: type ?? 'danger',
    ...options
  });
};
export const notifySucess = (message: string, description: string) => {
  showMessage({
    duration: 3000,
    message,
    description,
    // icon: 'success',
    // hideStatusBar: true,
    type: 'success'
  });
};

export const AlertNofity=(title:string,body:string)=>{
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: title??'Success',
    textBody: body,
  })
}

export const AlertNofityError=(title:string,body:string)=>{
  Toast.show({
    type: ALERT_TYPE.DANGER,
    title: title??'Error',
    textBody: body,
  })
}
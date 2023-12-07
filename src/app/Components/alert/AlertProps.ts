export default class AlertProps {
    needConfirm: boolean = false;
    message: string = "";
    showAlert: boolean = false;
    warning: boolean = false;
    constructor(message: string = "", needConfirm: boolean = false, showAlert: boolean = false, warning: boolean = false) {
        this.message = message;
        this.needConfirm = needConfirm;
        this.showAlert = showAlert;
        this.warning = warning;
    }
}
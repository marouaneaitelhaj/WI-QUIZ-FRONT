export default class AlertProps {
    needConfirm: boolean = false;
    message: string = "";
    showAlert: boolean = false;
    warning: boolean = false;
    link: string = "";
    constructor(message: string = "", needConfirm: boolean = false, showAlert: boolean = false, warning: boolean = false, link: string = "") {
        this.message = message;
        this.needConfirm = needConfirm;
        this.showAlert = showAlert;
        this.warning = warning;
        this.link = link;
    }
}
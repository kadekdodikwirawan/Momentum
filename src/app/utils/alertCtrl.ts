import { alertController } from "@ionic/core";

alertController
const presentAlert = async (header: string, subHeader: string, message: string) => {
    const alert = await alertController.create({
        header,
        subHeader,
        message,
        buttons: ['OK']
    });
    await alert.present();
}
export default presentAlert;
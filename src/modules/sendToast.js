// importa o mensageiro do toastify:
import { toast } from 'react-toastify';

export default function sendToast(type, message) {
  // Remove todas as mensagens do toastify:
  toast.clearWaitingQueue();
  toast.dismiss();
  // verifica o tipo de toast desejado:
  switch (type) {
    case 'error':
      toast.error(message);
      break;

    case 'success':
      toast.success(message);
      break;

    case 'loading':
      toast.loading(message);
      break;

    case 'info':
      toast.info(message);
      break;

    default:
  }
}

export default interface IAlertProps {
  severity?: 'warning' | 'success' | 'error';
  message: string | undefined;
  open: boolean;
  duration?: number;
  testID?: string;
  onClose?: () => void;
}

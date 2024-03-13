import { FC, ReactNode } from 'react';

// Base components.

// Interfaces.
import { SxProps } from '@mui/material';
import BaseDialog from './base-dialog';

interface Props {
  open: boolean;
  title: string;
  icon?: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  children: ReactNode;
  sx?: SxProps;
}

const BaseConfirmDialog: FC<Props> = (props) => {
  const { open, onClose, title, children, icon, onConfirm, sx } = props;

  return (
    <BaseDialog icon={icon} open={open} title={title} onClose={onClose} onConfirm={onConfirm} sx={sx}>
      {children}
    </BaseDialog>
  );
};

export default BaseConfirmDialog;

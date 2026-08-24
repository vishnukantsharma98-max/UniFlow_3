import React from 'react';
import { PasswordGateModal } from '../passwordGate/PasswordGateModal';

interface AIPasswordModalProps {
  isOpen: boolean;
  toolName: string;
  toolUrl: string;
  onClose: () => void;
}

export const AIPasswordModal: React.FC<AIPasswordModalProps> = ({
  isOpen,
  toolName,
  toolUrl,
  onClose,
}) => {
  return (
    <PasswordGateModal
      isOpen={isOpen}
      target={{
        url: toolUrl,
        title: toolName,
      }}
      onClose={onClose}
    />
  );
};


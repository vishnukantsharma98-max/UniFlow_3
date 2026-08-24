import React from 'react';
import { PasswordGateModal } from './passwordGate/PasswordGateModal';

interface UniversalAccessModalProps {
  isOpen: boolean;
  resourceTitle: string;
  resourceUrl: string;
  onClose: () => void;
}

export const UniversalAccessModal: React.FC<UniversalAccessModalProps> = ({
  isOpen,
  resourceTitle,
  resourceUrl,
  onClose,
}) => {
  return (
    <PasswordGateModal
      isOpen={isOpen}
      target={{
        url: resourceUrl,
        title: resourceTitle,
      }}
      onClose={onClose}
    />
  );
};


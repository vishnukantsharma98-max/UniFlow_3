import React from 'react';
import { PasswordGateModal } from '../passwordGate/PasswordGateModal';

interface StudyPasswordModalProps {
  isOpen: boolean;
  resourceTitle: string;
  resourceUrl: string;
  onClose: () => void;
}

export const StudyPasswordModal: React.FC<StudyPasswordModalProps> = ({
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


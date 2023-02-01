import { PropsWithChildren, useEffect } from 'react';
import { ModalProps } from '../../types/component.type';

export interface ModalOverlayProps extends ModalProps { }

export function ModalOverlay({ isOpen, onClickCloseModal, children, modalClassName }: PropsWithChildren<ModalOverlayProps>) {

  const onClickEsc = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      onClickCloseModal();
    }
  };

  useEffect(() => {
    const displayWidthBefore = document.body.clientWidth;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const displayWidthAfter = document.body.clientWidth;
      document.body.style.paddingRight = `${displayWidthAfter - displayWidthBefore}px`;
      document.addEventListener('keydown', onClickEsc);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.removeEventListener('keydown', onClickEsc);
    };
  }, [ isOpen ]);

  return (
    <div className={ `modal ${isOpen ? 'is-active' : ''} ${modalClassName} ` }>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={ onClickCloseModal }></div>
        { children }
      </div>
    </div>
  );
}

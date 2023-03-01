import React, { ReactNode, useEffect, useRef } from 'react'

interface ModalProps {
  children: ReactNode
  closeModalCallBack: (close: boolean) => void
  is2fa?: boolean
}

export function Modal({ children, closeModalCallBack, is2fa = false }: ModalProps) {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (!modalRef.current || modalRef.current.contains(event.target) || is2fa) {
        return
      }
      closeModalCallBack(false)
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [modalRef, closeModalCallBack, is2fa])

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 mb-24'>
        <div ref={modalRef} className='relative mx-auto min-w-max '>
          {children}
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  )
}

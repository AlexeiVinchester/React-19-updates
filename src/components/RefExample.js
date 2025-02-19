import { useRef, useState } from 'react'



export const ChildRefContainer = ({ref}) => {

  const handleClickChildButton = () => {
    console.log('Child button was clicked!')
  }

  return (
    <>
      <button 
        className='btn'
        ref={(prevRef) => {
        if (prevRef) {
          console.log('Div was mounted')
          prevRef.addEventListener('click', handleClickChildButton);
          ref.current = prevRef
        }

        return () => {
          prevRef.removeEventListener('click', handleClickChildButton)
          console.log('Div was unmounted')
        }
      }}>
        Child Button
      </button>
    </>
  )
}

export const ParentRefContainer = () => {
  const [show, setShow] = useState(true);
  const divRef = useRef(null);

  const handleClickParentButton = () => {
    if (divRef.current) {
      divRef.current.click();
    }
  }

  return (
    <>
      <button
        className='btn'
        onClick={() => setShow((prev) => !prev)}
      >
        {show ? 'Close ref' : 'Open ref'}
      </button>
      <button
        className='btn'
        onClick={handleClickParentButton}
      >
        Parent Button
      </button>
      {show && <ChildRefContainer ref={divRef} />}
    </>
  );
}
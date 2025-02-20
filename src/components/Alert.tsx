interface ApplyForArtistRoleAlertProps {
    onApply: () => void;
    onClose: () => void;
  }
  
  interface AlertProps{
    message: string;
    
  }

  const Alert = ({
   message
  }: AlertProps) => {
    // const handleApply = () => {
    //   // Raise event to the parent
    //   onApply();
    // };
  
    // const handleClose = () => {
    //   // Raise event to the parent
    //   onClose();
    // };
  
    return (
      <div>
        <div role="alert" className="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{message}</span>
          <div>
            {/* <button className="btn btn-sm">
            ¡
            </button> */}
            {/* <button className="btn btn-sm btn-primary" onClick={handleApply}>
              Apply
            </button> */}
          </div>
        </div>
      </div>
    );
  };
  
  export default Alert;
  
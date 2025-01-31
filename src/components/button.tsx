export const Button = ({ children, blue, onClick = undefined }: any) => {
    const className = blue 
        ? "px-3 py-2 bg-blue-500/80 hover:bg-blue-500/100 hover:ring-2 ring-blue-500/50 rounded transition"
        : "px-3 py-2 bg-red-500/80 hover:bg-red-500/100 hover:ring-2 ring-red-500/50 rounded transition";
    
    return (
      <button title="Kidou osoi" className={className} onClick={onClick}>
        {children}
      </button>
    )
  }
  
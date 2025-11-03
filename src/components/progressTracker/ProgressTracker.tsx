export interface ProgresProps {
    radius: number, 
    strokeWidth: number, 
    arcLength: number, 
    circumference: number, 
    // progressLength: number,
    top: number,
    left: number,
    rotate: number,
    progress: number
}
const ProgressTracker: React.FC<ProgresProps> = ({radius, strokeWidth, arcLength, circumference, top, left, rotate, progress}) => {
    
  const progressLength = arcLength * progress;

  return (
    <>
     <svg style={{width: "300", height: '300', position: 'absolute', top: `${top}px`, left: `${left}px`, transform: `rotate(${rotate}deg)`}} viewBox="0 0 250 250">
           {/* Background arc */}
           <circle
             cx="100"
             cy="100"
             r={radius}
             stroke="#f0f0f0"
             strokeWidth={strokeWidth}
             fill="none"
             strokeDasharray={`${arcLength} ${circumference}`}
             strokeDashoffset={0}
             strokeLinecap="round"
             transform="rotate(45 100 100)" // adjust which quadrant it appears in
           />
     
           {/* Progress arc */}
           <circle
             cx="100"
             cy="100"
             r={radius}
             stroke="#5e909e"
             strokeWidth={strokeWidth}
             fill="none"
             strokeDasharray={`${arcLength} ${circumference}`}
             strokeDashoffset={arcLength - progressLength}
             strokeLinecap="round"
             transform="rotate(45 100 100)"
           />
         </svg> 
    </>
  )
}

export default ProgressTracker

export interface ProgresProps {
    radius: number, 
    strokeWidth: number, 
    arcLength: number, 
    circumference: number, 
    progressLength: number,
    rotate: number
}
const ProgressTracker: React.FC<ProgresProps> = ({radius, strokeWidth, arcLength, circumference, progressLength, rotate}) => {
  return (
    <>
     <svg style={{width: "300", height: '200', position: 'absolute', top: '0', left: '0', transform: `rotate(${rotate}deg)`}} viewBox="0 0 200 200">
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

import { useState, useEffect } from 'react'

function StaleClosureExample() {
  const [count, setCount] = useState(0)
  
  // Example 1: Stale closure in useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Current count in interval:', count)
      // This will always use the value of count from when the effect ran
      // If effect ran when count was 0, this will always increment from 0 to 1
      setCount(count + 1)
    }, 1000)
    
    return () => clearInterval(timer)
  }, []) // Empty dependency array means this effect runs only once
  
  // Example 2: Stale closure in event handler with timeout
  const handleDelayedIncrement = () => {
    setTimeout(() => {
      console.log('Count value when timeout was created:', count)
      // This will use the count value from when the timeout was created
      setCount(count + 1)
    }, 2000)
  }
  
  // Example 3: The correct way using functional updates
  useEffect(() => {
    const timer = setInterval(() => {
      // This will always use the latest state value
      setCount(prevCount => {
        console.log('Current count in functional update:', prevCount)
        return prevCount + 1
      })
    }, 3000)
    
    return () => clearInterval(timer)
  }, []) // Still only runs once, but doesn't suffer from stale closure
  
  return (
    <div className="stale-closure-example">
      <h2>Count: {count}</h2>
      
      <div>
        <p>Example 1: An interval is incrementing the count every second, but it's using a stale closure.</p>
        <p>Example 3: Another interval is incrementing every 3 seconds using functional updates (works correctly).</p>
      </div>
      
      <button onClick={handleDelayedIncrement}>
        Delayed Increment (Stale Closure)
      </button>
      
      <p>
        Click the button multiple times quickly. Each click schedules an update after 2 seconds.
        If you click 3 times, you might expect the count to increase by 3, but it will only increase
        by 1 each time because each timeout captures the same count value.
      </p>
      
      <button onClick={() => setCount(0)}>Reset Count</button>
    </div>
  )
}

export default StaleClosureExample

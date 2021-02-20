## use-delayed-function-queue
This hook will allow you to queue up several functions for delayed execution.

### Usage
```typescript
const { add, remove, run, queue } = useDelayedFunctionQueue();
```

### Examples

**Simulate typing in a chatbot application**
```javascript
// Define the function you wish to queue
const sendMessageFromBot = (body) => {
    setTyping(true);
    setTimeout(() => {
        setTyping(false);
        setMessages((prevMessages) => (
            [...prevMessages, { body }])
        )
    }, 500)
}


// Import the hook and destructure the add, run methods
const { add, run } = useDelayedFunctionQueue()

useEffect(() => {
    // Write Hello! wait for 1 second
    add(() => sendMessageFromBot('Hello!'), 1000)
    // Write World!
    add(() => sendMessageFromBot('World!'), 1000)

    // Start the queue
    run()

}, [])
```
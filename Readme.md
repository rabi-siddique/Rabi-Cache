# Rabi Cache

Welcome to Rabi Cache, a personal project aimed at creating an in-memory cache similar to Redis. In the current implementation, users can insert, add, delete, and update data in the cache by interacting with the commandline.

# Features and Implementation So Far:

- `User Data Caching`: `Rabi Cache` allows users to cache their data.
- `Rabi Protocol`: A text-based protocol designed for interaction with the cache.
- `Command-Line Interface (CLI)`: Interact with the cache by entering commands on terminal, in the Rabi Protocol.
- `Add Data over the Network`: `Rabi cache` provides a set of APIs to perform CRUD operations with the cache. 


# Future Enhancements

In the upcoming releases, the following functionalities are planned for incorporation:

- `Adding INCR operation`: In this operation, users can store some number in the cache and increment its value.
- `Key Expiry Timer`: Implement a timer mechanism to automatically expire keys based on a predefined timeframe.
- `Cache Eviction Policies`: Introduce policies to efficiently manage cache space and evict items when needed.
- `Accepting Mixed Cases`: Parser should handle a situation where the key and value contain a mix of single and double quotes.
- `Improving Logic`: Enhance the logic for parsing commands. Perhaps use Sliding Window to parse commands. 
- `Saving History`: Enable storing user commands history just like Bash does it. 
- `Enable Locks`: For concurrent requests, enable locking the sections of code. 
- `Escape Characters in the CLI`: Follow best practices for handling escape characters in the CLI. 
- `Design Pattern for commands`: Use some design pattern which make it easy to add new commands in the Rabi protocol. 
- `User Options`: Provide user options in the CLI. Perhaps, they can select eviction policies or size of the cache from the terminal. 
- `Load Balancer and Virtualization`: Once the cache features are complete. Allow users to spin up cache instances based on their needs. Use load Balancer for routing requests to the proper server. User docker for cache images. 


# Supported Commands

```bash
Rabi insert key value # Inserting a key-value pair in cache
Rabi update key value # Updating a key-value pair in cache
Rabi delete key # Deleting a key-value pair by passing the key
Rabi get key # Getting the value by passing the key
Rabi show # Logging the key-value pairs present in the cache
```

# CLI Snapshot

![Rabi CLI](./images/v2.png)

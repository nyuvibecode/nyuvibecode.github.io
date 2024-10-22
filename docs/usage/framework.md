# Automation framework

This section introduces our automation framework, and how we can use our framework.

# Data Loader

Our framework uses two methods to load challenges: Docker containers as challenge servers or loading from local challenge files. Details of how our dataset is orgainzed can be found [here](dataset.md)

At the start of the challenge setup, the framework scans the challenge information to determine if a Docker container exists, then loads it from the docker-compose.yml file, pulls the image, and starts it running. Once the framework solves a CTF challenge, it stops all Docker containers and removes the loaded Docker images from the environment. 

# External Tools

Our framework providing models with access to domain-specific tools to improve their capabilities in solving CTF challenges. For example: 
* `run_command`: Enables the LLM to execute commands within an Ubuntu 22.04 Docker container equipped with essential tools
* `createfile`: Generates a file inside the Docker container
* `disassemble and decompile`: Uses Ghidra to disassemble and decompile a specified function in a binary
* `check_flag`: Allows the LLM to verify the correctness of a discovered flag in a CTF challenge
* `give_up`: Allows the LLM to stop its efforts on a challenge

For some LLM models that do not support built-in function calling, we have formatting module transforms prompt information into a
format suitable for function calling (XML and YAML).The tools are under the `tools` folder.

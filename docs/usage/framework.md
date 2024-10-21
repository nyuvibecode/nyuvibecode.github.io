# Automation framework

This section introduces our automation framework, and how we can use our framework.

# Backend Module

We support 3 backend configurations: 
* LLM models from OpenAI: We support the following models: gpt-4-1106-preview, gpt-4-0125-preview, and gpt-3.5-turbo-1106. 

* LLM models from Anthropic: We support three models: claude-3-haiku-20240307, claude-3-sonnet-20240229, and claude-3-opus-20240229. 

* Open-Source models deployed through TGI and VLLMs: We support five models: mistralai/Mixtral-8x7B-Instruct-v0.1, deepseek-ai/deepseek-coder-33b-instruct, llama3:70b-instruct-fp16, wizardlm2:8x22b-q8_0, and eta-llama/Meta-Llama-3-70B-Instruct.

When we use OpenAI and Anthropic backends, we operate them using an API key, which functions as an authorization key. It is loaded from secret files `keys.cfg`. The rate limit is determined by the API key. 

When we use Open-Source models deployed through TGI and VLLMs: They provide a URL for the backend to receive responses
from the model. 

Users of our framework can connect to these models by obtaining the URL through these methods or by deploying them on local servers.

For example, when we are running on OpenAI/Anthropic/Open-Source models, we can change these lines in the `base_config.yaml`,
```
# OpenAI Models
backend: "openai"
model: "gpt-4o-2024-05-13"

# Anthropic Models
backend: "anthropic"
model: "claude-3-opus-20240229"

# Open-Source Models
backend: "vllm"
model: "mistralai/Mixtral-8x7B-Instruct-v0.1"
```


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

# Logging System

Our logs contains system prompts, user prompts, model outputs, and debugging information. 

* System Prompts: Each log starts with the System Prompts that introduces the CTF and specifics of the task
* User Prompts: Describes the challenge and instructions for the model to install necessary packages or connect to a container server.
* Model Outputs: Model's output, specifically crafted to respond to the user prompt
* Debugging Information: Debug messages and outputs from external tools


And we can analysis the logs using scripts:

```
python scripts/log_summary.py -m {MODEL_NAME} -l {PATH_TO_LOGS} -t {CHALLENGE_CATEGORY}
```
* `{MODEL_NAME}`: The model we used
* `{PATH_TO_LOGS}`: The path to logs, which is introduced here [here](configuration/logging.md)
* `{CHALLENGE_CATEGORY}`: Optional. If not added, it will analysis all the logs in the log path, if added, we can choose from six categories: crypto, forensics, pwn, reverse, web, misc.

The analysis will show the challenge names, the solved rate of this challenge and any mistakes and reasons for not solving this challenge. This will assist you to evaluate and measure the performance.
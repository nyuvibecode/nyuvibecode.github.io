# Parameters

The following show all the parameters available for LLM CTF Agent

## Parameters can only be configured by command line

* `--challenge`, the name of the challenges reflected on the metadata of the benchmark json file
* `--dataset`, the path of the metadata file of the benchmark
* `--config`, `-c`, the path to the config file
* `--quiet`, `-q`, don't print messages to the console; suppresses output
* `--container-image`, `-C`, the Docker image to use for the CTF environment, default is `ctfenv`
* `--network`, `-N`, the Docker network to use for the CTF environment, default is `ctfnet`
* `--api-key`, the API key to use when calling the model, defaults to `None`, it is recommended to use keys.cfg file to setup your api key, refer to the [installation section](../installation/framework)
* `--api-endpoint`, the API endpoint URL to use when calling the model, defaults to `None`
* `--formatter`, the prompt formatter to use, default is `xml`; options defined by `Formatter.registry.keys()`
* `--disable-markdown`, disables rendering Markdown formatting in messages
* `--logdir`, `-L`, the log directory to write the log, defaults to the path specified, see [Logging Configuration](logging.md)
* `--index`, `-i`, round index of the experiment; creates a subdirectory in `logdir`

## Parameters can only be configured by configuration file

### Prompts

* `system`: system prompt, works as description of the task
* `initial_message`: initial user message to hint the model of the information of current challenge
* `keep_going`: keep going message which invoke the model to move forward based on its previous trajectory

### Demonstration

* `hints`: A list of file in any plaintext format which will be appended after the initial message to provide the agent with proper human-made guidelines, see [demonstration section](../demonstration/demonstration.md)

## Shared parameters can by configuration file and command line

* `--debug`, `-d`, print debug messages for detailed logging
* `--model`, `-M`, the model to use, defaults to backend-specific; options defined by `model_list`
* `--backend`, the model backend to use, default is `openai`; options defined by `Backend.registry.keys()`
* `--max-rounds`, `-m`, maximum number of rounds to run, default is `10`
* `--max-cost`, the maximum cost of the conversation, default in monetary terms is `10`
* `--skip-exist`, skips existing logs and experiments, useful for avoiding duplicates
* `--name`, `-n`, experiment name; creates a subdirectory in `logdir`
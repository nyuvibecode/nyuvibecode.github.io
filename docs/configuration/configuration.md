# Configuration TODO

!!! hint "Persisting environment variables"
    All environment variables can also be added to `keys.cfg` instead.
    See [here](../installation/installation.md) for more information.

This page details all environment variables that are currently in use by LLM-CTF-agent.

* All API keys (for LMs and GitHub) can be set as an environment variable. See [here](../installation/installation.md) for more information.
* `LLM_CTF_CONFIG_ROOT`: Used to resolve relative paths in the [config](config.md)
* `LLM_CTF_ENV_LONG_TIMEOUT` (default: 500): Timeout in seconds used for commands that install instance environment.
* `LLM_CTF_ACTION_TIMEOUT` (default: 25): Timeout in seconds used for commands issued by the agent
* `LLM_CTF_ACTION_NO_OUTPUT_TIMEOUT` (default: equal to `LLM_CTF_ACTION_TIMEOUT`): Timeout in seconds used when no output is produced for the defined duration for commands issued by the agent
* `LLM_CTF_MODEL_MAX_RETRIES` (default: 10): Maximum retries when querying the model

The following three variables can only be set as environment variables, not in the config file

* `LLM_CTF_LOG_TIME`: Add timestamps to log
* `LLM_CTF_LOG_STREAM_LEVEL`: Level of logging that is shown on the command line interface (`TRACE` being a custom level below `DEBUG`)
* `LLM_CTF_LOG_FILE_LEVEL`: Like  `LLM_CTF_LOG_STREAM_LEVEL` but for the log file

!!! warning "Unstable"
    The following variables might still be subject to change

* `LLM_CTF_COMMUNICATE_METHOD`: Determines how SWE-agent communicates with the running process in the docker container: `end-marker` (default, fast) or `processes` (legacy, slow, more tested)
* `LLM_CTF_CLONE_METHOD`: `shallow` (default, only retrieves relevant commit) or `full` (clones repository including full history). When using persistent containers or running over multiple problem statements, we fall back to `full`.
* `LLM_CTF_DOCKER_START_UP_DELAY`: Number of seconds to wait after starting a docker container

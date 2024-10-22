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
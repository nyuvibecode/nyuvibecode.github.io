# Logging Configuration

## Format of logging directory

All logs of NYU CTF Agent will be saved to the following directory

```
{PATH_TO_ROOT_NYU_CTF_AGENT}/logs/{$USER}/{EXPERIMENT}
```

The naming of `{EXPERIMENT}` is organized as following

```
{EXPERIMENT_NAME}_round{INDEX}/{CHALLENGE_NAME}.json
```

* `{EXPERIMENT_NAME}`: the experiment name that can be configured either with `--name`, `-n` in command line arguments or `name` parameter under `experiment` session of configuration file
* `{INDEX}`: the suffix of the experiment, can be configured with `--index`, `-i` in command line arguments
* `{CHALLENGE_NAME}`: the challenge name reflected in the metadata `.json` file

Users can also change the log directory to the desired location on the file system with the command line argument `--logdir`, `-L`.

## Format of log

The log file of NYU CTF Agent contains the following information

* `args`: the arguments used for the experiment
* `messages`: trajectories of the conversation record which contains all the conversation message with the message type, timestamp and the role of the message
* `challenge`: challenge information, some information such as year, event and category may be unavailable when testing on other NYU CTF Bench-like benchmarks
* `solved`: indicate if the challenge is solved by the agent
* `rounds`: the number of rounds of this experiment run
* `cost`: the cost of this experiment in US Dollar unit
* `runtime`: shows the time used to run the experiment
* `debug_log`: debugging information
* `finish_reason`: indicate the finish reason of the experiment

## Dump log

To dump the log in `.json` format to `.html` which is ease to read for human, use the following command in the NYU CTF Agent root folder, package [ansi2html](https://github.com/pycontribs/ansi2html) needs to be installed on the system.

```
python ./llm_ctf/dump_commands.py "{DUMP_LOG}" | ansi2html -l | sed 's/color: #AAAAAA;/color: #FFFFFF;/g' > "{OUTPUT_PATH}"/"{OUTPUT_HTML_NAME}"
```

* `{DUMP_LOG}`: log in `.json` format to dump
* `{OUTPUT PATH}`: is the output path to save the `.html` trajectory on the system, a folder called `html` will be created as the root folder of dumped trajectories
* `{OUTPUT_HTML_NAME}`: is the name of the dumped `.html` trajectory
# Api Key Setup

This section is about how to setup the api key. You should:

1. create a file named `keys.cfg` under the `llm_ctf_automation` folder, the format of this file should be:
```
OPENAI_API_KEY: 'OPENAI_API_KEY'
ANTHROPIC_API_KEY: 'ANTHROPIC_API_KEY'
MODEL_URL: 'model urls'

```

2. the openai api key could also be put in `~/.openai/api_key` and the anthropic api key could also be put in `~/.config/anthropic/api_key`

3. you could also set up an API key as an environment variable
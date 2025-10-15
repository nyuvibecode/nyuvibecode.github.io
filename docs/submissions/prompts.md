# Overview
Below are some recommended formats for prompt submission. These are not a strict requirement, but following the format will contribute to your readability score.

# Formats
## Plaintext/Markdown
In a plaintext file, markdown, Google Doc, or Word Doc. Do not submit a PDF. <!--We have also provided a [script](tmp) to convert HTML to MD.-->
```markdown
[User]

instruction:

Summarize the news article provided below.

# Supermarkets in France
Supermarket customers in France can add airline tickets to their shopping lists thanks to a unique promotion by a budget airline. 

## Shopping List Examples
1. In a supermarket, they sell madeleines.
2. In another supermarket, they sell other French goods.

# Another section
Based at the airport, new airline launched in 2007 and is a low-cost subsidiary of the airline.

[LLM, Gemini, ChatGPT]

New airline has included voucher codes with the branded products ... to pay a booking fee and checked baggage fees.

```
## JSON
```json
{
    "system": "Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.",
    "messages": [
        {
            "role": "user",
            "content": "instruction:\n\nSummarize the news article provided below.\n\ninput:\nSupermarket customers in France can add airline tickets to their shopping lists thanks to a unique promotion by a budget airline. ... Based at the airport, new airline launched in 2007 and is a low-cost subsidiary of the airline."
        },
        {
            "role": "assistant",
            "content": "New airline has included voucher codes with the branded products ... to pay a booking fee and checked baggage fees ."
        }
    ]
}
```

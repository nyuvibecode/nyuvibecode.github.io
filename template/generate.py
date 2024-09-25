import json
import os
from jinja2 import Environment, FileSystemLoader

FILES = ["index.html", "leaderboard.html"] # Add the list of files to render

def main(args):
    env = Environment(loader=FileSystemLoader("./"))

    with open(args.data) as df:
        data = json.load(df)
    os.makedirs(args.out, exist_ok=True)

    for file in FILES:
        print("Generating:", file)
        template = env.get_template(file)
        rendered = template.render(data=data) # TODO add data
        with open(os.path.join(args.out, file), "w") as hf:
            hf.write(rendered)


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser("Leaderboard generator from template")
    parser.add_argument("--data", default="../data/leaderboard.json", help="JSON file containing leaderboard data")
    parser.add_argument("--out", default="../", help="Output directory")
    args = parser.parse_args()

    main(args)

# Setup NYU CTF Bench-like dataset

## Setup

Install the python package:

```
pip install nyuctf
```

The repository is automatically cloned when the `CTFDataset` is first instantiated with the `split` argument.
If needed, you can manually clone it by running:

```
python3 -m nyuctf.download
```

## Usage

The following python snippet shows how to load challenge details using the python module:

```
from nyuctf.dataset import CTFDataset
from nyuctf.challenge import CTFChallenge

# Clones the repository for the first time, which takes a while
ds = CTFDataset(split="test")
chal = CTFChallenge(ds.get("2021f-rev-maze"), ds.basedir)

print(chal.name)
print(chal.flag)
print(chal.files)
```

## Tests

Run tests on the challenges, for docker setup and network connection.
Requires the docker network to be setup.

```
cd python
python -m unittest -v test.test_challenges
```

Optionally filter the tests with the unittest `-k` flag.

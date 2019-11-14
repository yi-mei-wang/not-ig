import os

from flask import Flask


web_dir = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), 'not-ig'
)

app = Flask('NOT-IG', root_path=web_dir)
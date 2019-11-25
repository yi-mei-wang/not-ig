import click

from not_ig.util.seed import run


@click.command()
def seed():
    run()

from setuptools import setup, find_packages

setup(
  name="tetris",
  version="0.1.0",
  packages=find_packages(),
  entry_points={
    'console_scripts': [
      'tetris = tetris.main:main'
    ]
  }
)
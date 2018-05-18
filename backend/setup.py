from setuptools import setup, find_packages


setup(
    name="michelin",
    version='1.0',
    packages=find_packages(),
    install_requires=['logbook', 'ujson', 'flask', 'flask-script', 'flask-sqlalchemy', 'flask-bcrypt',
                      'flask-migrate', 'psycopg2', 'gunicorn', 'requests', 'itsdangerous', 'pendulum']
)
